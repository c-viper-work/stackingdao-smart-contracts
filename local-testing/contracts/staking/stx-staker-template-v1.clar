;; @contract STX Staker (consensus template)
;; @version 1
;;
;; Holds protocol STX and participates in pox-5 consensus stacking on its behalf.
;; Pulls STX from the STX reserve and stakes it (STX-only, is-bond = false)
;; behind a consensus signer-manager. Driven only by registered protocol
;; contracts. All pox-5 and reserve calls run as this contract, so pox-5 sees
;; this staker as tx-sender.
;;
;; pox-5 keys a stake by principal (one stake, one signer per staker), so one
;; instance backs exactly one consensus signer. Deploy one instance per active
;; consensus signer (stx-staker-template-v1 deployed as stx-staker-1 .. stx-staker-N), each pointed at a different
;; signer-manager. The strategy distributes consensus STX across them, keeping
;; each above the 50k STX signer-set floor.
;;
;; Lifecycle: stake-stx pulls and stakes, unstake-stx schedules unlock at the
;; next cycle boundary, return-stx sends the freed STX back to the reserve after
;; the node unlock fires. Consensus STX is short-locked and re-extended each
;; cycle, which keeps it flexible for the bond and consensus rebalance.

(impl-trait .consensus-staker-trait.consensus-staker-trait)
(use-trait signer-manager-trait .pox-5.signer-manager-trait)

;; H-05: Track total STX locked in PoX-5 so with-staking can authorize the
;; full new total on stake-update, not just the increase. Not zeroed on
;; unstake-stx because the stake remains active until the cycle ends.
(define-data-var staked-amount uint u0)

;; Pull amount-ustx STX from the reserve and stake it behind signer-manager for
;; num-cycles. The node locks this contract's STX for the term.
(define-public (stake-stx
    (signer-manager <signer-manager-trait>)
    (amount-ustx uint)
    (ststxbtc-amount uint)
    (num-cycles uint)
    (signer-calldata (optional (buff 500)))
  )
  (let ((total-amount (+ amount-ustx ststxbtc-amount)))
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (try! (contract-call? .stx-reserve request-stx-for-staking amount-ustx ststxbtc-amount))
    (try! (as-contract?
      ((with-staking total-amount))
      (try! (contract-call? .pox-5 stake signer-manager total-amount num-cycles burn-block-height signer-calldata))
    ))
    (var-set staked-amount total-amount)
    (print { action: "stake-stx", data: { signer-manager: (contract-of signer-manager), amount-ustx: amount-ustx, ststxbtc-amount: ststxbtc-amount, total-amount: total-amount, num-cycles: num-cycles, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Rebalance this staker's stake. Extend the lock, increase the amount by pulling
;; the increase from the reserve, or re-point to a different signer by passing a
;; new signer-manager vs old-signer-manager. This is the per-cycle weight shift
;; across consensus signers.
(define-public (stake-update-stx
    (signer-manager <signer-manager-trait>)
    (old-signer-manager <signer-manager-trait>)
    (cycles-to-extend uint)
    (amount-increase uint)
    (ststxbtc-increase uint)
    (signer-calldata (optional (buff 500)))
  )
  (let (
    (total-increase (+ amount-increase ststxbtc-increase))
    (new-total (+ (var-get staked-amount) total-increase))
  )
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (if (> total-increase u0)
      (try! (contract-call? .stx-reserve request-stx-for-staking amount-increase ststxbtc-increase))
      u0
    )
    (try! (as-contract?
      ((with-staking new-total))
      (try! (contract-call? .pox-5 stake-update signer-manager old-signer-manager cycles-to-extend total-increase signer-calldata))
    ))
    (var-set staked-amount new-total)
    (print { action: "stake-update-stx", data: { signer-manager: (contract-of signer-manager), old-signer-manager: (contract-of old-signer-manager), cycles-to-extend: cycles-to-extend, amount-increase: amount-increase, ststxbtc-increase: ststxbtc-increase, new-total: new-total, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Schedule the unlock of this staker's STX-only stake at the next cycle
;; boundary. Blocked during the prepare phase by pox-5.
(define-public (unstake-stx (old-signer-manager <signer-manager-trait>))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (try! (as-contract? ((with-pox))
      (try! (contract-call? .pox-5 unstake old-signer-manager))
    ))
    (print { action: "unstake-stx", data: { old-signer-manager: (contract-of old-signer-manager), block-height: stacks-block-height } })
    (ok true)
  )
)

;; Return amount-ustx of this staker's unlocked STX to the reserve, after the
;; node unlock has fired.
(define-public (return-stx (ststx-amount uint) (ststxbtc-amount uint))
  (let ((total-amount (+ ststx-amount ststxbtc-amount)))
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set staked-amount u0)
    (try! (as-contract?
      ((with-stx total-amount))
      (try! (contract-call? .stx-reserve return-stx-from-staking-split ststx-amount ststxbtc-amount))
    ))
    (print { action: "return-stx", data: { ststx-amount: ststx-amount, ststxbtc-amount: ststxbtc-amount, total-amount: total-amount, block-height: stacks-block-height } })
    (ok true)
  )
)

