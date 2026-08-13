;; sBTC token: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token (Clarity literal; see STYLE.md)
;; @contract Native Pool v1
;; @version 1
;;
;; Non-custodial STX staking with sBTC payout, no LST and no protocol fee. The
;; user keeps custody. They delegate, which calls pox-5 stake with the user as
;; tx-sender so the node locks the user's own STX. This contract never holds STX.
;;
;; SECURITY (C1 audit): delegate and undelegate validate the passed signer-manager
;; trait against a stored address set at init. The caller CANNOT redirect their
;; stake behind a different signer.
;;
;; C07 audit: reward distribution was removed from this contract. Rewards are
;; claimed per-staker through native-pool-signer-manager, which uses PoX-5's own
;; claim-staker-rewards-for-signer. No local distribution state.

(use-trait signer-manager-trait .pox-5.signer-manager-trait)

(define-constant ERR_WRONG_SIGNER_MANAGER (err u36002))
(define-constant ERR_ALREADY_INITIALIZED (err u36003))

;; The native-pool signer-manager this contract stakes behind. Set once at init.
(define-data-var native-pool-sm (optional principal) none)

;; Transient flag set only during the pox-5::stake call inside delegate.
;; Proves validate-stake! that the stake originated from this contract,
;; not a direct pox-5 call by a previously-registered user (M-08).
(define-map delegating { staker: principal, sm: principal } bool)

(define-read-only (is-delegating (staker principal) (sm principal))
  (default-to false (map-get? delegating { staker: staker, sm: sm }))
)

;; One-time wiring: set the native-pool signer-manager address. DAO-gated.
(define-public (initialize (sm principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (is-none (var-get native-pool-sm)) ERR_ALREADY_INITIALIZED)
    (var-set native-pool-sm (some sm))
    (print { action: "initialize", data: { sm: sm, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Read-only: the current pox-5 reward cycle (returns bare uint).
(define-read-only (current-cycle)
  (contract-call? .pox-5 current-pox-reward-cycle)
)

;; Delegate amount-ustx of the caller's own STX behind the native-pool
;; signer-manager for num-cycles.
(define-public (delegate
    (signer-manager <signer-manager-trait>)
    (amount-ustx uint)
    (num-cycles uint)
  )
  (let (
    (user tx-sender)
  )
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (is-eq (contract-of signer-manager) (unwrap-panic (var-get native-pool-sm))) ERR_WRONG_SIGNER_MANAGER)

    ;; Set transient flag so validate-stake! can verify origin (M-08).
    (map-set delegating { staker: user, sm: (contract-of signer-manager) } true)
    ;; Stake the user's own STX.
    (try! (contract-call? .pox-5 stake signer-manager amount-ustx num-cycles burn-block-height none))
    (map-set delegating { staker: user, sm: (contract-of signer-manager) } false)

    (print { action: "delegate", data: { user: user, amount-ustx: amount-ustx, num-cycles: num-cycles, block-height: stacks-block-height } })
    (ok amount-ustx)
  )
)

;; Extend or increase an existing delegation behind the native-pool
;; signer-manager. Same checks and delegating flag as delegate (M-08 review).
(define-public (delegate-update
    (signer-manager <signer-manager-trait>)
    (old-signer-manager <signer-manager-trait>)
    (cycles-to-extend uint)
    (amount-increase uint)
    (signer-calldata (optional (buff 500)))
  )
  (let (
    (user tx-sender)
  )
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (is-eq (contract-of signer-manager) (unwrap-panic (var-get native-pool-sm))) ERR_WRONG_SIGNER_MANAGER)

    (map-set delegating { staker: user, sm: (contract-of signer-manager) } true)
    (try! (contract-call? .pox-5 stake-update signer-manager old-signer-manager cycles-to-extend amount-increase signer-calldata))
    (map-set delegating { staker: user, sm: (contract-of signer-manager) } false)

    (print { action: "delegate-update", data: { user: user, cycles-to-extend: cycles-to-extend, amount-increase: amount-increase, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Undelegate: schedule unlock via pox-5.
;; L-04: DAO check and registered map removed. The user is the non-custodial
;; staker and can call pox-5::unstake directly regardless. The signer-manager
;; validation is kept so the unstake targets the correct signer.
(define-public (undelegate (old-signer-manager <signer-manager-trait>))
  (let ((user tx-sender))
    (asserts! (is-eq (contract-of old-signer-manager) (unwrap-panic (var-get native-pool-sm))) ERR_WRONG_SIGNER_MANAGER)

    (try! (contract-call? .pox-5 unstake old-signer-manager))

    (print { action: "undelegate", data: { user: user, block-height: stacks-block-height } })
    (ok true)
  )
)
