;; sBTC token: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token (Clarity literal; see STYLE.md)
;; @contract Rewards v7
;; @version 7
;;
;; The reward seam. The signer forwards all claimed sBTC here. This contract
;; skims commission off the top, then streams the remainder into the stBTC
;; reserve linearly over a release window. Streaming blocks the deposit then
;; init-withdraw ratio sandwich.
;;
;; process-rewards is permissionless and idempotent, in three steps:
;;   Step 1: crystallize the stream accrued since the last call to stbtc-reserve.
;;     Done first so step 2 sees only genuinely new sBTC, not stream remainder.
;;   Step 2: skim commission on new arrivals per data-pools-stbtc-v1. pool-owner
;;     share goes direct to pool-owner-receiver, commission-left to
;;     commission-sbtc-v1, rewards-left stays for step 3.
;;   Step 3: fold rewards-left plus the unreleased stream remainder over a fresh
;;     RELEASE_WINDOW_BLOCKS.
;;
;; A call with nothing to do is a no-op, returns 0.

(define-constant DENOMINATOR_BPS u10000)
;; Over-100% split config.
;; u33001 reserved (gap kept; do not renumber live codes).
(define-constant ERR_BPS_TOO_HIGH (err u33002))
;; stSTX leg routed before the reward recipient was wired. Now raised only by the
;; pool-owner leg at step 2 if the pool-owner-receiver is unset; the stSTX leg
;; falls back to the stBTC reserve (D6).
(define-constant ERR_RECIPIENT_NOT_SET (err u33003))
(define-constant ERR_NOT_KEEPER (err u33004))
(define-constant ERR_ALREADY_INITIALIZED (err u33005))

;; Mainnet: 2100 burn blocks, one PoX cycle. Tests: short window.
(define-constant RELEASE_WINDOW_BLOCKS (if is-in-mainnet u2100 u10))

;; sBTC released to the reserve per burn block during the active stream.
(define-data-var release-per-block uint u0)
;; Burn block at which the active stream ends.
(define-data-var release-end-block uint u0)
;; Last burn block crystallized through. Advances each process-rewards.
(define-data-var last-release-block uint u0)

;; Product split of the crystallized stream, in bps. stBTC gets the remainder.
;; Default 0/0 is 100% stBTC until the DAO configures the split.
(define-data-var ststxbtc-bps uint u0)
(define-data-var ststx-bps uint u0)

;; Where the stSTX share of sBTC is sent for the off-chain CEX swap. The keeper
;; swaps it and deposits the resulting STX into the STX reserve. `none` until
;; set-stx-reward-recipient wires it post-deploy. If unset when a share would
;; route, the share falls back to the stBTC reserve rather than reverting (D6) -
;; reward processing cannot be bricked by an unwired config.
(define-data-var stx-reward-recipient (optional principal) none)

;; Getters

;; H02: the fold step (Step 2/3) is keeper-gated to prevent dust-funding attacks.
;; Crystallization (Step 1) remains permissionless.
(define-data-var keeper (optional principal) none)

(define-read-only (get-keeper) (var-get keeper))

(define-read-only (get-release-end-block) (var-get release-end-block))

;; sBTC currently held by this contract.
(define-read-only (get-sbtc-balance)
  (unwrap-panic (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token get-balance current-contract))
)

;; Amount still queued in the active stream (not yet released).
(define-read-only (get-streaming-remaining)
  (let ((end (var-get release-end-block)))
    (if (>= burn-block-height end)
      u0
      (* (- end burn-block-height) (var-get release-per-block))
    )
  )
)

(define-read-only (get-ststxbtc-bps) (var-get ststxbtc-bps))
(define-read-only (get-ststx-bps) (var-get ststx-bps))
(define-read-only (get-stx-reward-recipient) (var-get stx-reward-recipient))

;; Manual control, always available. The DAO calls this directly to set any
;; split. reward-split-calculator-v1 is an optional automation layer that also
;; calls this. If never run, the bps stay as set here.
(define-public (set-split-bps (new-ststxbtc-bps uint) (new-ststx-bps uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (<= (+ new-ststxbtc-bps new-ststx-bps) DENOMINATOR_BPS) ERR_BPS_TOO_HIGH)
    (var-set ststxbtc-bps new-ststxbtc-bps)
    (var-set ststx-bps new-ststx-bps)
    (print { action: "set-split-bps", data: { ststxbtc-bps: new-ststxbtc-bps, ststx-bps: new-ststx-bps, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-stx-reward-recipient (recipient principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set stx-reward-recipient (some recipient))
    (print { action: "set-stx-reward-recipient", data: { recipient: recipient, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Amount accrued and ready to release on the next process call.
(define-read-only (get-ready-to-release)
  (let (
    (end (var-get release-end-block))
    (last (var-get last-release-block))
    (effective-end (if (< burn-block-height end) burn-block-height end))
  )
    (if (> effective-end last)
      (* (- effective-end last) (var-get release-per-block))
      u0
    )
  )
)

;; Route `share` sBTC from this contract to `dest`. No-op on zero. Used by the
;; stBTC and stSTX legs and the stSTXbtc no-supply fallback (C5).
(define-private (route-sbtc-share (share uint) (dest principal))
  (if (> share u0)
    (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" share))
      (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer share current-contract dest none)))
    (ok true)))

;; Process

(define-public (process-rewards)
  (let (
    (release-amount (get-ready-to-release))
    (effective-end (if (< burn-block-height (var-get release-end-block)) burn-block-height (var-get release-end-block)))
  )
    ;; Step 1: crystallize accrued amount first, so step 2 sees only new arrivals.
    ;; The crystallized chunk is split 3 ways by product:
    ;;   stBTC share to stbtc-reserve, raising the stBTC ratio.
    ;;   stSTXbtc share to ststxbtc-tracking-v1, cumulative per-token sBTC.
    ;;   stSTX share to stx-reward-recipient for the off-chain CEX swap. The
    ;;     keeper deposits the resulting STX into the STX reserve.
    (if (> release-amount u0)
      (let (
        (ststxbtc-share (/ (* release-amount (var-get ststxbtc-bps)) DENOMINATOR_BPS))
        (ststx-share (/ (* release-amount (var-get ststx-bps)) DENOMINATOR_BPS))
        (stbtc-share (- release-amount (+ ststxbtc-share ststx-share)))
        (ststxbtc-supply (contract-call? .ststxbtc-tracking-v1 get-total-supply))
      )
        ;; stBTC leg -> stbtc-reserve
        (try! (route-sbtc-share stbtc-share .stbtc-reserve))
        ;; stSTXbtc leg -> tracker when there is supply, else stbtc-reserve
        ;; (fallback) so nothing is stranded
        (if (> ststxbtc-share u0)
          (if (> ststxbtc-supply u0)
            (begin
              (try! (as-contract?
                ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" ststxbtc-share))
                (try! (contract-call? .ststxbtc-tracking-v1 add-rewards ststxbtc-share))
              ))
              true)
            (try! (route-sbtc-share ststxbtc-share .stbtc-reserve)))
          true)
        ;; stSTX leg -> keeper/treasury for the off-chain swap, or stbtc-reserve
        ;; fallback if the recipient is not yet wired (D6: never brick on unset)
        (try! (route-sbtc-share ststx-share (match (var-get stx-reward-recipient) r r .stbtc-reserve)))
        (var-set last-release-block effective-end)
      )
      true
    )

    ;; Step 2: detect new sBTC and skim commission off the top.
    ;; H02: the fold step is keeper-gated; crystallization above is permissionless.
    (if (is-eq (some contract-caller) (var-get keeper))
    (let (
      (balance-mid (get-sbtc-balance))
      (queued-mid (get-streaming-remaining))
      (new-raw (if (> balance-mid queued-mid) (- balance-mid queued-mid) u0))

      (pool-commission-bps (contract-call? .data-pools-stbtc-v1 get-pool-commission))
      (pool-owner-share-bps (contract-call? .data-pools-stbtc-v1 get-pool-owner-share))
      (pool-owner-receiver (contract-call? .data-pools-stbtc-v1 get-pool-owner-receiver))

      (commission-amount (/ (* new-raw pool-commission-bps) DENOMINATOR_BPS))
      (pool-owner-amount (/ (* commission-amount pool-owner-share-bps) DENOMINATOR_BPS))
      (commission-left (- commission-amount pool-owner-amount))
      (staking-end (+ burn-block-height RELEASE_WINDOW_BLOCKS))
    )
      (if (> pool-owner-amount u0)
        (try! (as-contract?
          ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" pool-owner-amount))
          (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer pool-owner-amount current-contract (unwrap! pool-owner-receiver ERR_RECIPIENT_NOT_SET) none))
        ))
        true
      )
      (if (> commission-left u0)
        (try! (as-contract?
          ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" commission-left))
          (try! (contract-call? .commission-sbtc-v1 add-commission commission-left staking-end))
        ))
        u0
      )

      ;; Step 3: fold the rewards-left into the stream over a fresh window.
      ;; Thread the undistributed balance arithmetically (C4): step 2 moved
      ;; pool-owner-amount + commission-left out, and queued is unchanged across
      ;; step 2 (release-end-block / release-per-block only change here), so the
      ;; post-transfer balance is balance-mid minus those two - no chain re-read.
      (let (
        (balance-post (- (- balance-mid pool-owner-amount) commission-left))
        (queued-post queued-mid)
        (new-to-fold (if (> balance-post queued-post) (- balance-post queued-post) u0))
      )
        (if (> new-to-fold u0)
          (let (
            (new-total (+ queued-post new-to-fold))
            (new-end (+ burn-block-height RELEASE_WINDOW_BLOCKS))
            (new-per-block (/ new-total RELEASE_WINDOW_BLOCKS))
          )
            (var-set release-per-block new-per-block)
            (var-set release-end-block new-end)
            (var-set last-release-block burn-block-height)
          )
          true
        )

        (print { action: "process-rewards", data: {
          released: release-amount,
          new-raw: new-raw,
          pool-owner: pool-owner-amount,
          commission-left: commission-left,
          folded: new-to-fold,
          per-block: (var-get release-per-block),
          end-block: (var-get release-end-block),
          block-height: stacks-block-height
        } })
        true
      )
      )
      true
    )
    (ok release-amount)
  )
)

;; Admin

(define-public (initialize (the-keeper principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (is-none (var-get keeper)) ERR_ALREADY_INITIALIZED)
    (var-set keeper (some the-keeper))
    (print { action: "initialize", data: { keeper: the-keeper, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-keeper (new-keeper principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set keeper (some new-keeper))
    (print { action: "set-keeper", data: { keeper: new-keeper, block-height: stacks-block-height } })
    (ok true)
  )
)
