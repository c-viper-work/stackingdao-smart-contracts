;; @contract stBTC Staker Trait
;; @version 1
;;
;; Interface the strategy dispatches against, so it can drive any staker instance
;; (stbtc-staker-template-v1 deployed as stbtc-staker-1 .. stbtc-staker-N) generically.

(use-trait signer-manager-trait .pox-5.signer-manager-trait)

(define-trait stbtc-staker-trait (
  ;; bond-index, signer-manager, sats, amount-ustx, signer-calldata
  (bond-sbtc (uint <signer-manager-trait> uint uint (optional (buff 500))) (response bool uint))
  ;; signer-manager, sats
  (recall-sbtc (<signer-manager-trait> uint) (response bool uint))
  ;; new-bond-index, signer-manager, new-sats, amount-ustx, signer-calldata
  ;; roll the current bond into a later one, net delta only. The 2-cycle rebalance
  (rollover-bond (uint <signer-manager-trait> uint uint (optional (buff 500))) (response bool uint))
  ;; amount-ustx: return unlocked STX collateral to the STX reserve (post-bond)
  (return-stx (uint) (response bool uint))
))
