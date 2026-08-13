;; sBTC token: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token (Clarity literal; see STYLE.md)
;; @contract stBTC Staker (template)
;; @version 1
;;
;; Holds pooled funds and participates in pox-5 on the protocol's behalf. Pulls
;; sBTC from the stBTC reserve, registers an sBTC bond behind our signer-manager,
;; and recalls bonded sBTC back to the reserve. Driven only by registered
;; protocol contracts. All pox-5 and reserve calls run as this contract, so
;; pox-5 sees this staker as tx-sender.
;;
;; One deployed copy per concurrent bond, since pox-5 allows one bond per
;; principal: stbtc-staker-template-v1 deployed as stbtc-staker-1 .. stbtc-staker-N.
;;
;; STX collateral is pulled from the STX reserve at bond time. The node locks
;; this contract's STX for the bond term. After the bond ends and the node
;; unlock fires, return-stx sends the collateral back to the reserve.

(impl-trait .stbtc-staker-trait.stbtc-staker-trait)
(use-trait signer-manager-trait .pox-5.signer-manager-trait)

;; Pull sats sBTC and amount-ustx STX collateral from the reserves, then
;; register an sBTC bond behind signer-manager.
(define-public (bond-sbtc
    (bond-index uint)
    (signer-manager <signer-manager-trait>)
    (sats uint)
    (amount-ustx uint)
    (signer-calldata (optional (buff 500)))
  )
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))

    ;; reserves send funds to their caller, this staker
    (try! (contract-call? .stbtc-reserve request-sbtc-to-stack sats))
    (try! (contract-call? .stx-reserve request-stx-to-stack amount-ustx))

    ;; register the bond as this contract. pox-5 pulls the sBTC from us
    ;; (tx-sender) and the node locks our STX collateral for the bond term
    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" sats)
       (with-staking amount-ustx))
      (try! (contract-call? .pox-5 register-for-bond bond-index signer-manager amount-ustx (err sats) signer-calldata))
    ))
    (print { action: "bond-sbtc", data: { bond-index: bond-index, signer-manager: (contract-of signer-manager), sats: sats, amount-ustx: amount-ustx, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Roll this staker's current bond forward into new-bond-index without unwinding
;; to the reserve and back. pox-5's register-for-bond moves only the net sBTC
;; delta vs the existing bond, so we pull only the increase from the reserve or
;; return only the decrease to it. STX collateral is handled the same way.
;;
;; Only valid in the old bond's L1-unlock window and into a non-overlapping bond.
;; This is the 2-cycle rebalance lever. At each maturity, roll forward to
;; re-commit or roll down toward zero to free sBTC and STX back to the reserves.
(define-public (rollover-bond
    (new-bond-index uint)
    (signer-manager <signer-manager-trait>)
    (new-sats uint)
    (amount-ustx uint)
    (signer-calldata (optional (buff 500)))
  )
  (let (
    (old-sats (contract-call? .pox-5 get-staker-custodied-sbtc current-contract))
    (old-ustx (match (contract-call? .pox-5 get-bond-membership current-contract)
      m (get amount-ustx m)
      u0
    ))
    (sats-up (if (> new-sats old-sats) (- new-sats old-sats) u0))
    (sats-down (if (> old-sats new-sats) (- old-sats new-sats) u0))
  )
    (try! (contract-call? .dao check-is-protocol contract-caller))

    ;; scale-up funding. Pull the STX and sBTC increases from the reserves first
    (if (> amount-ustx old-ustx)
      (begin (try! (contract-call? .stx-reserve request-stx-to-stack (- amount-ustx old-ustx))) true)
      true
    )
    (if (> new-sats old-sats)
      (begin (try! (contract-call? .stbtc-reserve request-sbtc-to-stack sats-up)) true)
      true
    )

    ;; roll into the new bond. pox-5 pulls sats-up if any and re-points custody
    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" sats-up)
       (with-staking amount-ustx))
      (try! (contract-call? .pox-5 register-for-bond new-bond-index signer-manager amount-ustx (err new-sats) signer-calldata))
    ))

    ;; sBTC scale-down: pox-5 returned the freed sBTC delta to this staker; send
    ;; it back to the reserve.
    (if (> sats-down u0)
      (begin (try! (as-contract?
        ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" sats-down))
        (try! (contract-call? .stbtc-reserve return-sbtc-from-stacking sats-down))
      )) true)
      true
    )
    ;; STX collateral is node-locked for the bond term, so a scale-down cannot
    ;; free it inside the rollover (C8). The freed STX is returned separately via
    ;; return-stx after the node unlock fires. (Simnet does not enforce the lock,
    ;; but the mainnet-correct path keeps STX returns out of the rollover.)
    (print { action: "rollover-bond", data: { new-bond-index: new-bond-index, signer-manager: (contract-of signer-manager), old-sats: old-sats, new-sats: new-sats, old-ustx: old-ustx, amount-ustx: amount-ustx, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Return amount-ustx of this staker's unlocked STX collateral to the STX
;; reserve, after the bond term ends and the node unlock fires.
(define-public (return-stx (amount-ustx uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (try! (as-contract?
      ((with-stx amount-ustx))
      (try! (contract-call? .stx-reserve return-stx-from-stacking amount-ustx))
    ))
    (print { action: "return-stx", data: { amount-ustx: amount-ustx, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Recall sats bonded sBTC from pox-5 and return it to the reserve.
(define-public (recall-sbtc
    (signer-manager <signer-manager-trait>)
    (sats uint)
  )
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))

    ;; pox-5 sends the sBTC back to us (tx-sender)
    (try! (as-contract? ((with-pox))
      (try! (contract-call? .pox-5 unstake-sbtc signer-manager sats))
    ))

    ;; return it to the reserve (transfer from this staker to the reserve)
    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" sats))
      (try! (contract-call? .stbtc-reserve return-sbtc-from-stacking sats))
    ))
    (print { action: "recall-sbtc", data: { signer-manager: (contract-of signer-manager), sats: sats, block-height: stacks-block-height } })
    (ok true)
  )
)
