;; @contract stSTX <-> stSTXbtc swap (round-trip wrapper)
;; @version 3
;;
;; One-click switch between stSTX and stSTXbtc on the PoX-5 architecture.
;; Routes through real STX using the existing cores, atomically in one tx:
;;   stSTX  -> stSTXbtc: core-stx.withdraw-idle  -> core-ststxbtc.deposit
;;   stSTXbtc -> stSTX:  core-ststxbtc.withdraw-idle -> core-stx.deposit
;;
;; Fee-free by design: the round-trip runs inside as-contract? so tx-sender is
;; this wrapper, and the wrapper is in each core's fee-exempt map (DAO-gated
;; set-fee-exempt via proposal). The zero-fee invariant is asserted at runtime
;; (ERR_FEE_NOT_EXEMPT) so a missing/revoked exemption fails loudly instead of
;; silently charging the user withdraw-idle-fee.
;;
;; Custody: the wrapper pulls the user's source LST (tx-sender is genuinely
;; required there - contract-caller cannot stand in for the asset owner), runs
;; the round-trip as-contract, and pays the minted target LST to the user. All
;; within one tx; atomicity means the wrapper never holds funds across txs.
;;
;; Liquidity cap (accepted tradeoff, see upgrade-nexus/new-swap.md): leg 1
;; pays from idle reserve, so swaps larger than idle revert
;; (ERR_INSUFFICIENT_IDLE from the cores / ERR_RESERVED from the reserve).
;;
;; Deploy note: this dev copy references .ststxbtc-token. The deployed copy in
;; sdao-deployment references .ststxbtc-token-v2 (the live token the deployed
;; ststxbtc core mints) - the only difference, same pattern as the ststxbtc
;; core's dev/deployed variant.

;; Constants

(define-constant ERR_INVALID_AMOUNT (err u28001))
(define-constant ERR_FEE_NOT_EXEMPT (err u28002))
(define-constant ERR_INVALID_RATIO (err u28003))

(define-constant DENOMINATOR_6 u1000000)

;; User

;; Switch stSTX to stSTXbtc. min-out floors the minted stSTXbtc (slippage).
(define-public (swap-ststx-for-ststxbtc (ststx-amount uint) (min-out uint))
  (let ((user tx-sender))
    (asserts! (> ststx-amount u0) ERR_INVALID_AMOUNT)
    ;; tx-sender (not contract-caller): pulls the user's own stSTX into custody.
    (try! (contract-call? .ststx-token transfer ststx-amount user current-contract none))
    ;; Crystallize streamed rewards so the ratio is stable intra-tx: the bound
    ;; below is then guaranteed >= the actual STX leg even though withdraw-idle
    ;; re-runs process-rewards internally (a no-op in the same block).
    (try! (contract-call? .rewards-stx-v1 process-rewards))
    (let (
      ;; Degenerate-ratio guard (review F1): ratio-floor 0 means active-backing
      ;; rounds to ~0 while supply is live; fail with a defined error instead of
      ;; a downstream runtime abort (0-STX transfer / division by zero).
      (ratio-floor (contract-call? .data-stx-v1 get-stx-per-ststx))
    )
      (asserts! (> ratio-floor u0) ERR_INVALID_RATIO)
      (let (
      ;; Upper bound on the STX leg and on minted stSTXbtc:
      ;; stx-leg = floor(ststx-amount * ratio-floor / 1e6) <= floor(ststx-amount * ratio-up / 1e6).
      (stx-bound (/ (* ststx-amount (contract-call? .data-stx-v1 get-stx-per-ststx-up)) DENOMINATOR_6))
      (result (try! (as-contract?
        ((with-stx stx-bound) (with-ft .ststx-token "ststx" ststx-amount) (with-ft .ststxbtc-token "ststxbtc" stx-bound))
        (let (
          (w (try! (contract-call? .stacking-dao-core-stx-v1 withdraw-idle ststx-amount)))
        )
          (asserts! (is-eq (get stx-fee w) u0) ERR_FEE_NOT_EXEMPT)
          (let (
            (minted (try! (contract-call? .stacking-dao-core-ststxbtc-v1 deposit (get stx-user w) min-out)))
          )
            ;; tx-sender = this wrapper inside as-contract?; pays the user.
            (try! (contract-call? .ststxbtc-token transfer minted tx-sender user none))
            { stx-leg: (get stx-user w), minted: minted }
          )
        )
      )))
    )
      (print { action: "swap-ststx-for-ststxbtc", data: { user: user, ststx-in: ststx-amount, stx-leg: (get stx-leg result), ststxbtc-out: (get minted result), block-height: stacks-block-height } })
      (ok (get minted result))
    )
    )
  )
)

;; Switch stSTXbtc to stSTX. min-out floors the minted stSTX (slippage).
(define-public (swap-ststxbtc-for-ststx (ststxbtc-amount uint) (min-out uint))
  (let ((user tx-sender))
    (asserts! (> ststxbtc-amount u0) ERR_INVALID_AMOUNT)
    ;; tx-sender (not contract-caller): pulls the user's own stSTXbtc into custody.
    (try! (contract-call? .ststxbtc-token transfer ststxbtc-amount user current-contract none))
    (try! (contract-call? .rewards-stx-v1 process-rewards))
    (let (
      ;; Degenerate-ratio guard (review F1): a zero floor ratio would make the
      ;; bound below a division by zero. Fail with a defined error instead.
      (ratio-floor (contract-call? .data-stx-v1 get-stx-per-ststx))
    )
      (asserts! (> ratio-floor u0) ERR_INVALID_RATIO)
      (let (
      ;; Upper bound on minted stSTX:
      ;; minted = floor(stx-leg * 1e6 / ratio-up) <= floor(ststxbtc-amount * 1e6 / ratio-floor).
      (ststx-bound (/ (* ststxbtc-amount DENOMINATOR_6) ratio-floor))
      (result (try! (as-contract?
        ((with-stx ststxbtc-amount) (with-ft .ststxbtc-token "ststxbtc" ststxbtc-amount) (with-ft .ststx-token "ststx" ststx-bound))
        (let (
          (w (try! (contract-call? .stacking-dao-core-ststxbtc-v1 withdraw-idle ststxbtc-amount)))
        )
          (asserts! (is-eq (get stx-fee w) u0) ERR_FEE_NOT_EXEMPT)
          (let (
            (minted (try! (contract-call? .stacking-dao-core-stx-v1 deposit (get stx-user w) min-out)))
          )
            (try! (contract-call? .ststx-token transfer minted tx-sender user none))
            { stx-leg: (get stx-user w), minted: minted }
          )
        )
      )))
    )
      (print { action: "swap-ststxbtc-for-ststx", data: { user: user, ststxbtc-in: ststxbtc-amount, stx-leg: (get stx-leg result), ststx-out: (get minted result), block-height: stacks-block-height } })
      (ok (get minted result))
    )
    )
  )
)
