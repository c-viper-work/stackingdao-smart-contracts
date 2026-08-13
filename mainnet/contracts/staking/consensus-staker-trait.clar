(use-trait signer-manager-trait 'SP000000000000000000002Q6VF78.pox-5.signer-manager-trait)

(define-trait consensus-staker-trait (
  (stake-stx (<signer-manager-trait> uint uint uint (optional (buff 500))) (response bool uint))
  (stake-update-stx (<signer-manager-trait> <signer-manager-trait> uint uint uint (optional (buff 500))) (response bool uint))
  (unstake-stx (<signer-manager-trait>) (response bool uint))
  (return-stx (uint uint) (response bool uint))
))
