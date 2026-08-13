(use-trait signer-manager-trait 'SP000000000000000000002Q6VF78.pox-5.signer-manager-trait)

(define-trait stbtc-staker-trait (
  (bond-sbtc (uint <signer-manager-trait> uint uint (optional (buff 500))) (response bool uint))
  (recall-sbtc (<signer-manager-trait> uint) (response bool uint))
  (rollover-bond (uint <signer-manager-trait> uint uint (optional (buff 500))) (response bool uint))
  (return-stx (uint) (response bool uint))
))
