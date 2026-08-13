;; @contract Consensus Staker Trait
;; @version 1
;;
;; Interface the strategy dispatches against to drive any consensus (STX-only)
;; staker instance (stx-staker-template-v1 deployed as stx-staker-1 .. stx-staker-N) generically.
;;
;; Separate from stbtc-staker-trait because the two staker kinds do different
;; jobs. Bond stakers pair sBTC and STX collateral via register-for-bond.
;; Consensus stakers do STX-only stake. Distinct traits avoid dead stubs.

(use-trait signer-manager-trait .pox-5.signer-manager-trait)

(define-trait consensus-staker-trait (
  ;; signer-manager, ststx-amount, ststxbtc-amount, num-cycles, signer-calldata
  (stake-stx (<signer-manager-trait> uint uint uint (optional (buff 500))) (response bool uint))
  ;; signer-manager, old-signer-manager, cycles-to-extend, ststx-increase, ststxbtc-increase, signer-calldata
  (stake-update-stx (<signer-manager-trait> <signer-manager-trait> uint uint uint (optional (buff 500))) (response bool uint))
  ;; old-signer-manager: schedule unlock at the next cycle boundary
  (unstake-stx (<signer-manager-trait>) (response bool uint))
  ;; ststx-amount, ststxbtc-amount: return unlocked STX to the STX reserve
  (return-stx (uint uint) (response bool uint))
))
