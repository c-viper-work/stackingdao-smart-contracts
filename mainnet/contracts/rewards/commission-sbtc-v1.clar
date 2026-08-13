(define-constant ERR_TOO_MUCH (err u29001))

(define-constant DENOMINATOR_BPS u10000)


(define-data-var signer-basispoints uint u10000)


(define-read-only (get-signer-basispoints) (var-get signer-basispoints))

(define-read-only (get-sbtc-balance)
  (unwrap-panic (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token get-balance current-contract))
)


(define-public (add-commission (sbtc-amount uint) (staking-end-block uint))
  (let (
    (signer-amount  (/ (* sbtc-amount (var-get signer-basispoints))  DENOMINATOR_BPS))
    (treasury-amount (- sbtc-amount signer-amount))
  )
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer sbtc-amount tx-sender current-contract none))

    (if (> signer-amount u0)
      (try! (as-contract?
        ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" signer-amount))
        (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer signer-amount current-contract .signer-payout-v1 none))
      ))
      true
    )

    (print { action: "add-commission", data: {
      total: sbtc-amount,
      signer: signer-amount,
      treasury: treasury-amount,
      block-height: stacks-block-height
    } })
    (ok sbtc-amount)
  )
)


(define-public (set-signer-basispoints (bps uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (<= bps DENOMINATOR_BPS) ERR_TOO_MUCH)
    (var-set signer-basispoints bps)
    (print { action: "set-signer-basispoints", data: { bps: bps, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (withdraw-treasury (amount uint) (receiver principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" amount))
      (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer amount current-contract receiver none))
    ))
    (print { action: "withdraw-treasury", data: { amount: amount, receiver: receiver, block-height: stacks-block-height } })
    (ok amount)
  )
)
