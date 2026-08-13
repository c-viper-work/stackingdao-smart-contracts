;; sBTC token: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token (Clarity literal; see STYLE.md)
;; @contract Native Pool Signer Manager
;; @version 1
;;
;; The signer-manager native-pool users stake behind.
;; validate-stake! admits only principals registered by native-pool-v1, so the
;; signer's entire sBTC reward belongs to native-pool users and no one can stake
;; behind it except through native-pool-v1.delegate.
;;
;; C07 audit: rewards use PoX-5's native per-staker claiming. claim-rewards pulls
;; aggregate sBTC from PoX-5 to this contract (permissionless). Each staker then
;; calls claim-staker-rewards to settle their share via PoX-5's own accounting
;; (claim-staker-rewards-for-signer) and receive their sBTC. No local distribution
;; state, no double-claim tracking -- PoX-5 handles all of that.

(impl-trait .pox-5.signer-manager-trait)
(use-trait signer-manager-trait .pox-5.signer-manager-trait)

(define-constant ERR_UNAUTHORIZED_ADMIN (err u37001))
(define-constant ERR_STAKER_NOT_ALLOWED (err u37002))
(define-constant ERR_NO_CLAIMABLE_REWARDS (err u37003))

;; Admin set lives in the shared signer-admin-v1 module, keyed by this instance.
(define-read-only (is-admin (who principal))
  (contract-call? .signer-admin-v1 is-admin current-contract who)
)

;; signer-manager-trait

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
    (asserts! (contract-call? .native-pool-v1 is-delegating staker current-contract) ERR_STAKER_NOT_ALLOWED)
    (ok true)
  )
)

;; Registration

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

;; Pull this signer's aggregate sBTC rewards from pox-5 to this contract.
;; Permissionless -- anyone can trigger the pull. Individual stakers then claim
;; their share via claim-staker-rewards. Handles multiple distribution cycles per
;; PoX reward cycle (C07 fix).
(define-public (claim-rewards
    (bond-periods (list 6 uint))
    (reward-cycle uint)
  )
  (let (
    (info (try! (as-contract? ()
      (try! (contract-call? .pox-5 claim-rewards bond-periods reward-cycle))
    )))
  )
    (print { action: "claim-rewards", data: { total-rewards: (get total-rewards info), reward-cycle: reward-cycle, block-height: stacks-block-height } })
    (ok info)
  )
)

;; Per-staker: settle rewards via PoX-5's own accounting and transfer sBTC to
;; the staker. PoX-5 tracks how much each staker earned and zeroes their
;; unclaimed balance, so double-claiming is impossible.
(define-public (claim-staker-rewards
    (reward-cycle uint)
    (bond-index (optional uint))
  )
  (let (
    (staker tx-sender)
    (rewards-info (unwrap-panic (contract-call? .pox-5 claim-staker-rewards-for-signer staker reward-cycle bond-index)))
    (earned (get earned rewards-info))
  )
    (asserts! (> earned u0) ERR_NO_CLAIMABLE_REWARDS)
    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" earned))
      (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer earned tx-sender staker none))
    ))
    (print { action: "claim-staker-rewards", data: { staker: staker, reward-cycle: reward-cycle, earned: earned, block-height: stacks-block-height } })
    (ok earned)
  )
)

;; Admin

(define-private (authorize-admin)
  (ok (asserts! (and (is-eq contract-caller tx-sender) (is-admin tx-sender)) ERR_UNAUTHORIZED_ADMIN))
)
