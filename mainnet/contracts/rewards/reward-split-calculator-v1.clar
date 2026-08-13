(define-constant ERR_NOT_AUTHORIZED (err u38001))
(define-constant ERR_NO_TVL (err u38002))
(define-constant ERR_INVALID_PARAMS (err u38003))



(define-constant DENOMINATOR_BPS 10000)



(define-data-var r-target uint u1000)
(define-data-var alpha-max-bps uint u5000)
(define-data-var gamma-bps uint u10000)
(define-data-var lambda-bps uint u3000)
(define-data-var ema-delta int 0)



(define-read-only (get-r-target) (var-get r-target))
(define-read-only (get-alpha-max-bps) (var-get alpha-max-bps))
(define-read-only (get-gamma-bps) (var-get gamma-bps))
(define-read-only (get-lambda-bps) (var-get lambda-bps))
(define-read-only (get-ema-delta) (var-get ema-delta))



(define-public (set-params (rt uint) (alpha uint) (gamma uint) (lambda uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))




    (asserts! (and (> rt u0) (<= alpha (to-uint DENOMINATOR_BPS)) (<= gamma u30000) (<= lambda (to-uint DENOMINATOR_BPS))) ERR_INVALID_PARAMS)
    (var-set r-target rt)
    (var-set alpha-max-bps alpha)
    (var-set gamma-bps gamma)
    (var-set lambda-bps lambda)
    (print { action: "set-params", data: { r-target: rt, alpha-max-bps: alpha, gamma-bps: gamma, lambda-bps: lambda, block-height: stacks-block-height } })
    (ok true)
  )
)


(define-public (reset-ema)
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set ema-delta 0)
    (print { action: "reset-ema", data: { block-height: stacks-block-height } })
    (ok true)
  )
)




(define-private (clip-int (lo int) (hi int) (v int))
  (if (> v hi) hi (if (< v lo) lo v))
)



(define-read-only (preview (r-current uint) (t-stbtc uint) (t-ststxbtc uint) (t-ststx uint))
  (let (
    (rt (var-get r-target))


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



(define-public (compute-and-apply
    (r-current uint)
    (t-stbtc uint)
    (t-ststxbtc uint)
    (t-ststx uint)
  )
  (begin


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
