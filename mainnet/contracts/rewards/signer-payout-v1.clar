(define-constant ERR_NOT_KEEPER (err u34001))
(define-constant ERR_NO_ALLOCATIONS (err u34002))
(define-constant ERR_ALREADY_INITIALIZED (err u34003))

(define-data-var keeper (optional principal) none)


(define-read-only (get-keeper) (var-get keeper))

(define-read-only (get-sbtc-balance)
  (unwrap-panic (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token get-balance current-contract))
)


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
