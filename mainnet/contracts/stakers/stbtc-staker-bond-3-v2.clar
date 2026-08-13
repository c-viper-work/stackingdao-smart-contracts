(impl-trait .stbtc-staker-trait.stbtc-staker-trait)
(use-trait signer-manager-trait 'SP000000000000000000002Q6VF78.pox-5.signer-manager-trait)

(define-public (bond-sbtc
    (bond-index uint)
    (signer-manager <signer-manager-trait>)
    (sats uint)
    (amount-ustx uint)
    (signer-calldata (optional (buff 500)))
  )
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (try! (contract-call? .stbtc-reserve request-sbtc-to-stack sats))
    (try! (contract-call? .stx-reserve-v2 request-stx-to-stack amount-ustx))

    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" sats)
       (with-staking amount-ustx))
      (try! (contract-call? 'SP000000000000000000002Q6VF78.pox-5 register-for-bond bond-index signer-manager amount-ustx (err sats) signer-calldata))
    ))
    (print { action: "bond-sbtc", data: { bond-index: bond-index, signer-manager: (contract-of signer-manager), sats: sats, amount-ustx: amount-ustx, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (rollover-bond
    (new-bond-index uint)
    (signer-manager <signer-manager-trait>)
    (new-sats uint)
    (amount-ustx uint)
    (signer-calldata (optional (buff 500)))
  )
  (let (
    (old-sats (contract-call? 'SP000000000000000000002Q6VF78.pox-5 get-staker-custodied-sbtc current-contract))
    (old-ustx (match (contract-call? 'SP000000000000000000002Q6VF78.pox-5 get-bond-membership current-contract)
      m (get amount-ustx m)
      u0
    ))
    (sats-up (if (> new-sats old-sats) (- new-sats old-sats) u0))
    (sats-down (if (> old-sats new-sats) (- old-sats new-sats) u0))
  )
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (if (> amount-ustx old-ustx)
      (begin (try! (contract-call? .stx-reserve-v2 request-stx-to-stack (- amount-ustx old-ustx))) true)
      true
    )
    (if (> new-sats old-sats)
      (begin (try! (contract-call? .stbtc-reserve request-sbtc-to-stack sats-up)) true)
      true
    )

    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" sats-up)
       (with-staking amount-ustx))
      (try! (contract-call? 'SP000000000000000000002Q6VF78.pox-5 register-for-bond new-bond-index signer-manager amount-ustx (err new-sats) signer-calldata))
    ))

    (if (> sats-down u0)
      (begin (try! (as-contract?
        ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" sats-down))
        (try! (contract-call? .stbtc-reserve return-sbtc-from-stacking sats-down))
      )) true)
      true
    )
    (print { action: "rollover-bond", data: { new-bond-index: new-bond-index, signer-manager: (contract-of signer-manager), old-sats: old-sats, new-sats: new-sats, old-ustx: old-ustx, amount-ustx: amount-ustx, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (return-stx (amount-ustx uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (try! (as-contract?
      ((with-stx amount-ustx))
      (try! (contract-call? .stx-reserve-v2 return-stx-from-stacking amount-ustx))
    ))
    (print { action: "return-stx", data: { amount-ustx: amount-ustx, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (recall-sbtc
    (signer-manager <signer-manager-trait>)
    (sats uint)
  )
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (try! (as-contract? ((with-pox))
      (try! (contract-call? 'SP000000000000000000002Q6VF78.pox-5 unstake-sbtc signer-manager sats))
    ))

    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" sats))
      (try! (contract-call? .stbtc-reserve return-sbtc-from-stacking sats))
    ))
    (print { action: "recall-sbtc", data: { signer-manager: (contract-of signer-manager), sats: sats, block-height: stacks-block-height } })
    (ok true)
  )
)
