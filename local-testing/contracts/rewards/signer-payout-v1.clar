;; sBTC token: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token (Clarity literal; see STYLE.md)
;; @contract Signer Payout v1
;; @version 1
;;
;; Holds the signer slice as sBTC and pays each external signer their pro-rata
;; share in a single batched call.
;;
;; Flow per cycle:
;;   1. commission-sbtc-v1 or rewards-v7 deposits the signer slice via a plain
;;      sBTC transfer into this contract.
;;   2. The keeper computes each signer's pro-rata share off-chain and calls
;;      distribute(allocations).
;;   3. The contract pushes each signer's sBTC. Atomic: any individual transfer
;;      failure reverts the whole batch.
;;
;; Math is off-chain because each signer's share depends on their cycle stake
;; share, queried from the Stacks API. On-chain dispatch keeps payout atomic.

(define-constant ERR_NOT_KEEPER (err u34001))
(define-constant ERR_NO_ALLOCATIONS (err u34002))
(define-constant ERR_ALREADY_INITIALIZED (err u34003))

;; Authorized to call distribute. `none` until initialize() wires the real
;; keeper, so the contract is inert (never silently live-pointed at deployer).
;; Rotated thereafter by the DAO via set-keeper.
(define-data-var keeper (optional principal) none)

;; Getters

(define-read-only (get-keeper) (var-get keeper))

(define-read-only (get-sbtc-balance)
  (unwrap-panic (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token get-balance current-contract))
)

;; Admin

;; One-time wiring. DAO-gated, fails if already initialized.
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

;; DAO-gated. Recover any sBTC residual from rounding drift, partial distributes
;; or accidental sends.
(define-public (withdraw-residual (amount uint) (receiver principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" amount))
      (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer amount current-contract receiver none))
    ))
    (print { action: "withdraw-residual", data: { amount: amount, receiver: receiver, block-height: stacks-block-height } })
    (ok amount)
  )
)

;; Distribute

(define-public (distribute (allocations (list 20 { signer: principal, sbtc-amount: uint })))
  (begin
    (asserts! (is-eq (some contract-caller) (var-get keeper)) ERR_NOT_KEEPER)
    (asserts! (> (len allocations) u0) ERR_NO_ALLOCATIONS)

    (let (
      (results (map send-allocation allocations))
      (errors (filter is-err-response results))
      (first-error (element-at? errors u0))
    )
      (match first-error
        failed-response failed-response
        (begin
          (print { action: "distribute", data: { count: (len allocations), block-height: stacks-block-height } })
          (ok true)
        )
      )
    )
  )
)

(define-private (send-allocation (alloc { signer: principal, sbtc-amount: uint }))
  (let (
    (signer (get signer alloc))
    (amount (get sbtc-amount alloc))
  )
    (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" amount))
      (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer amount current-contract signer none))
    )
  )
)

(define-private (is-err-response (result (response bool uint)))
  (match result success false error true)
)
