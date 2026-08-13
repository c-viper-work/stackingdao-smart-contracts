;; sBTC token: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token (Clarity literal; see STYLE.md)
;; @contract Signer Manager v1
;; @version 1
;;
;; StackingDAO's pox-5 signer. Stakers stake and register-for-bond behind it.
;; pox-5 pays pooled sBTC here, which this contract forwards whole to rewards-v7
;; to split across the LSTs at the ratio level.
;;
;; validate-stake! admits only allowlisted stakers. No per-staker accounting.
;; checkpoint-staker is a documented no-op (pox-5 calls it on staker exit;
;; rewards are pooled here, nothing to settle per-staker).
;;
;; D8 - open design note: the deploy topology is ONE staker contract per
;; signer-manager (12 stx-stakers behind 12 consensus signers, 6 stbtc-stakers
;; behind 6 bond signers), but validate-stake! checks a many-entry allowlist
;; (set-allowed-staker), so the one-staker-per-manager assumption is not
;; enforced on-chain. Tightening to "reject any staker after the first" would
;; guarantee it but is a behavior change that rules out a future many-stakers-
;; per-signer pooling variant. Left as an allowlist until the owner confirms the
;; model is permanently one-staker-per-manager; the no-op checkpoint-staker is
;; safe either way because rewards are pooled, not per-staker.
;;
;; Holds no user funds and carries one signing key. Admins gate signer-key
;; registration, the staker allowlist, and the rewards recipient, none of which
;; move user principal. The admin set lives in the shared, DAO-gated
;; signer-admin-v1 module (admins are appointed by the DAO), so this contract
;; carries no local admin map of its own.

(impl-trait .pox-5.signer-manager-trait)
(use-trait signer-manager-trait .pox-5.signer-manager-trait)

;; Constants

(define-constant ERR_UNAUTHORIZED_ADMIN (err u30001))
(define-constant ERR_STAKER_NOT_ALLOWED (err u30002))
(define-constant ERR_RECIPIENT_NOT_SET (err u30003))

;; Variables

;; Stakers allowed behind this signer.
(define-map allowed-stakers principal bool)

;; sBTC reward target. `none` until set-rewards-recipient wires it post-deploy,
;; so claim-rewards is inert (never silently forwards to the deployer).
(define-data-var rewards-recipient (optional principal) none)

;; Getters

;; Admin set lives in the shared signer-admin-v1 module, keyed by this instance.
(define-read-only (is-admin (who principal))
  (contract-call? .signer-admin-v1 is-admin current-contract who)
)

(define-read-only (is-allowed-staker (who principal))
  (default-to false (map-get? allowed-stakers who))
)

(define-read-only (get-rewards-recipient)
  (var-get rewards-recipient)
)

;; Signer trait

;; pox-5 calls this on every join. Only allowlisted stakers may stake here.
;; #[allow(unused_binding)]
(define-public (validate-stake!
    (staker principal)
    (first-index uint)
    (num-indexes uint)
    (amount-ustx uint)
    (amount-sats uint)
    (is-bond bool)
    (signer-calldata (optional (buff 500)))
  )
  (begin
    (asserts! (is-allowed-staker staker) ERR_STAKER_NOT_ALLOWED)
    (ok true)
  )
)

;; Registration

;; Bind this contract's signer key. One-time.
(define-public (register-self
    (signer-manager <signer-manager-trait>)
    (signer-key (buff 33))
    (auth-id uint)
    (signer-sig (buff 65))
  )
  (begin
    (try! (authorize-admin))
    (try! (as-contract?
      ()
      (try! (contract-call? .pox-5 grant-signer-key signer-key current-contract auth-id signer-sig))
      (try! (contract-call? .pox-5 register-signer signer-manager signer-key))
    ))
    (print { action: "register-self", data: { signer-key: signer-key, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Rewards

;; Pull this signer's sBTC from pox-5 and forward it to the recipient.
;; Permissionless, funds always go to the recipient.
(define-public (claim-rewards
    (bond-periods (list 6 uint))
    (reward-cycle uint)
  )
  (let (
    (info (try! (as-contract? ()
      (try! (contract-call? .pox-5 claim-rewards bond-periods reward-cycle))
    )))
    (total (get total-rewards info))
    (recipient (unwrap! (var-get rewards-recipient) ERR_RECIPIENT_NOT_SET))
  )
    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" total))
      (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token
        transfer total tx-sender recipient none
      ))
    ))
    (print { action: "claim-rewards", data: { total: total, recipient: recipient, reward-cycle: reward-cycle, block-height: stacks-block-height } })
    (ok info)
  )
)

;; Admin

(define-private (authorize-admin)
  (ok (asserts! (and (is-eq contract-caller tx-sender) (is-admin tx-sender)) ERR_UNAUTHORIZED_ADMIN))
)

(define-public (set-allowed-staker (staker principal) (allowed bool))
  (begin
    (try! (authorize-admin))
    (map-set allowed-stakers staker allowed)
    (print { action: "set-allowed-staker", data: { staker: staker, allowed: allowed, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-rewards-recipient (recipient principal))
  (begin
    (try! (authorize-admin))
    (var-set rewards-recipient (some recipient))
    (print { action: "set-rewards-recipient", data: { recipient: recipient, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Admin appointment moved to the DAO-gated signer-admin-v1 module:
;; (contract-call? .signer-admin-v1 set-admin <this-contract> who enabled).
