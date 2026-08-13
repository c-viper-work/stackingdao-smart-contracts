;; @contract Reward Split Calculator v1 (market-maker)
;; @version 1
;;
;; Computes the rewards-v7 product-split bps dynamically to incentivize the
;; scarce side of the STX/sBTC pairing rather than splitting flat by TVL.
;; Optional layer on top. rewards-v7 applies whatever bps are set.
;;
;; Formula, signed int, all in bps where 10000 = 1.0:
;;   delta      = (r_current - r_target) / r_target            ;; bond collateral imbalance
;;   ema_delta  = lambda*delta + (1-lambda)*ema_prev           ;; smoothed over cycles
;;   boost      = clip(gamma * ema_delta, -alpha_max, alpha_max)
;;   b_stBTC    = 1 + boost ;  b_STX-side = 1 - boost           ;; boost>0 favors stBTC
;;   share_i    = b_i * T_i / sum_j(b_j * T_j)                 ;; T_i = product TVL in sBTC
;;
;; The keeper supplies r_current and the three sBTC-valued TVLs, computed
;; off-chain. This contract applies smoothing, boost and weighting, then pushes
;; the bps to rewards-v7. DAO-gated. With alpha-max = 0 it reduces to flat
;; TVL-weighting.

(define-constant ERR_NOT_AUTHORIZED (err u38001))
(define-constant ERR_NO_TVL (err u38002))
(define-constant ERR_INVALID_PARAMS (err u38003))

;; int (not u10000): preview() works in signed (int) math throughout, so the
;; denominator stays int here even though DENOMINATOR_BPS is uint elsewhere.
(define-constant DENOMINATOR_BPS 10000)

;; Params (DAO-set)

(define-data-var r-target uint u1000) ;; target uSTX-per-sat bond collateral ratio
(define-data-var alpha-max-bps uint u5000) ;; max |boost| = 0.5
(define-data-var gamma-bps uint u10000) ;; sensitivity gain (can exceed 1.0 to amplify)
(define-data-var lambda-bps uint u3000) ;; EMA weight on the newest delta = 0.3
(define-data-var ema-delta int 0) ;; smoothed imbalance, carried across cycles

;; Getters

(define-read-only (get-r-target) (var-get r-target))
(define-read-only (get-alpha-max-bps) (var-get alpha-max-bps))
(define-read-only (get-gamma-bps) (var-get gamma-bps))
(define-read-only (get-lambda-bps) (var-get lambda-bps))
(define-read-only (get-ema-delta) (var-get ema-delta))

;; Params setters (DAO-gated)

(define-public (set-params (rt uint) (alpha uint) (gamma uint) (lambda uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    ;; C3: gamma is a gain (can exceed 1.0 to amplify the EMA signal), not a
    ;; fraction like alpha/lambda. Bound it at 3.0 (30000) to prevent int128
    ;; overflow in raw-boost = gamma * ema / BPS with realistic EMA values.
    ;; The real overflow vector is unbounded r-current, bounded separately.
    (asserts! (and (> rt u0) (<= alpha (to-uint DENOMINATOR_BPS)) (<= gamma u30000) (<= lambda (to-uint DENOMINATOR_BPS))) ERR_INVALID_PARAMS)
    (var-set r-target rt)
    (var-set alpha-max-bps alpha)
    (var-set gamma-bps gamma)
    (var-set lambda-bps lambda)
    (print { action: "set-params", data: { r-target: rt, alpha-max-bps: alpha, gamma-bps: gamma, lambda-bps: lambda, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Reset the EMA so a stale signal does not linger after a long pause.
(define-public (reset-ema)
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set ema-delta 0)
    (print { action: "reset-ema", data: { block-height: stacks-block-height } })
    (ok true)
  )
)

;; Pure view: compute bps for given inputs, no state change

;; Clamp a signed value into [lo, hi].
(define-private (clip-int (lo int) (hi int) (v int))
  (if (> v hi) hi (if (< v lo) lo v))
)

;; Returns the boost and resulting (ststxbtc-bps, ststx-bps) for the supplied
;; inputs and the current ema. Does not advance it. For off-chain preview.
(define-read-only (preview (r-current uint) (t-stbtc uint) (t-ststxbtc uint) (t-ststx uint))
  (let (
    (rt (var-get r-target))
    ;; M-02: clamp r-current at 100x r-target so preview and compute-and-apply
    ;; produce identical results for the same inputs.
    (r-clamped (if (> r-current (* rt u100)) (* rt u100) r-current))
    (delta (/ (* (- (to-int r-clamped) (to-int rt)) DENOMINATOR_BPS) (to-int rt)))
    (lam (to-int (var-get lambda-bps)))
    (ema (/ (+ (* lam delta) (* (- DENOMINATOR_BPS lam) (var-get ema-delta))) DENOMINATOR_BPS))
    (raw-boost (/ (* (to-int (var-get gamma-bps)) ema) DENOMINATOR_BPS))
    (amax (to-int (var-get alpha-max-bps)))
    (boost (clip-int (- 0 amax) amax raw-boost))
    (b-stbtc (to-uint (+ DENOMINATOR_BPS boost)))
    (b-side (to-uint (- DENOMINATOR_BPS boost)))
    (w-stbtc (* b-stbtc t-stbtc))
    (w-ststxbtc (* b-side t-ststxbtc))
    (w-ststx (* b-side t-ststx))
    (w-sum (+ w-stbtc (+ w-ststxbtc w-ststx)))
    (total-tvl (+ t-stbtc (+ t-ststxbtc t-ststx)))
  )
    {
      next-ema: ema,
      boost: boost,
      ;; D5: this w-sum > 0 guard is LOAD-BEARING. When boost saturates at
      ;; alpha-max and all TVL sits on the STX side, every weighted value is
      ;; zero while TVL is positive. Without this guard the division by zero
      ;; would abort. Do not consolidate it with the TVL check.
      ;; L-01: when w-sum == 0 but total-tvl > 0, fall back to unboosted
      ;; TVL-proportional split instead of implying 100% to stBTC.
      ststxbtc-bps: (if (> w-sum u0)
        (/ (* w-ststxbtc (to-uint DENOMINATOR_BPS)) w-sum)
        (if (> total-tvl u0) (/ (* t-ststxbtc (to-uint DENOMINATOR_BPS)) total-tvl) u0)
      ),
      ststx-bps: (if (> w-sum u0)
        (/ (* w-ststx (to-uint DENOMINATOR_BPS)) w-sum)
        (if (> total-tvl u0) (/ (* t-ststx (to-uint DENOMINATOR_BPS)) total-tvl) u0)
      ),
    }
  )
)

;; Compute and apply: advances the EMA, sets rewards-v7 bps

(define-public (compute-and-apply
    (r-current uint)
    (t-stbtc uint)
    (t-ststxbtc uint)
    (t-ststx uint)
  )
  (begin
    ;; Auth + TVL checks before the compute so an unauthorized or no-TVL call
    ;; rejects without running preview (C10).
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (> (+ t-stbtc (+ t-ststxbtc t-ststx)) u0) ERR_NO_TVL)
    (let (
      (result (preview r-current t-stbtc t-ststxbtc t-ststx))
    )
      (var-set ema-delta (get next-ema result))
      (try! (contract-call? .rewards-pox5-v1 set-split-bps (get ststxbtc-bps result) (get ststx-bps result)))

      (print { action: "compute-and-apply", data: {
        r-current: r-current, boost: (get boost result),
        ststxbtc-bps: (get ststxbtc-bps result), ststx-bps: (get ststx-bps result),
        block-height: stacks-block-height
      } })
      (ok result)
    )
  )
)
