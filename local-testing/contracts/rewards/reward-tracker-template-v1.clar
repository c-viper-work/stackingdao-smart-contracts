;; sBTC token: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token (Clarity literal; see STYLE.md)
;; @contract Reward Tracker (template)
;; @version 1
;;
;; TEMPLATE: one canonical reward-per-token engine, deployed under two names
;; (ststxbtc-tracking-v1 and native-pool-tracking-v1). Consumers call by the
;; deployed contract name, so a single source serves both instances.
;;
;; Per-holder sBTC reward distributor. Cumulative reward-per-token: add-rewards
;; bumps a global accumulator by amount/supply, and a holder's claimable is their
;; tracked balance (stSTXbtc balance, or native-pool delegated weight) times the
;; accumulator delta since their last snapshot. The consumer feeds balances in
;; via refresh-wallet, so the tracker stays in sync without owning the balance
;; source. The `excluded` set lets a consumer pin non-earning principals (e.g. a
;; withdrawal escrow) to 0; the native-pool instance simply never sets any.
;;
;; Per-instance config (D9): REWARD_SCALE (1e10) is unit-agnostic, so the engine
;; serves both deployments unchanged, but each consumer MUST feed balances in the
;; unit it intends to weight by:
;;   ststxbtc-tracking-v1: weights by stSTXbtc token balance (6-dec); sets the
;;     withdrawal-escrow principal in `excluded`.
;;   native-pool-tracking-v1: weights by delegated STX amount (6-dec); never
;;     sets `excluded`.
;; Both inputs are 6-dec, so the same scale yields correct pro-rata payouts in
;; each. A post-deploy check should confirm each instance's consumer feeds the
;; intended balance source.

(define-constant ERR_CLAIMS_DISABLED (err u39001))
(define-constant ERR_REWARDS_CALC (err u39002))
(define-constant ERR_ALREADY_EXCLUDED (err u39003))
(define-constant ERR_HAS_BALANCE (err u39004))

;; Fixed-point scale for reward-per-token. Matches sdao-staking-sbtc-v1's
;; REWARD_SCALE; one canonical name across both reward-per-token engines.
(define-constant REWARD_SCALE u10000000000) ;; 1e10

;; Variables

(define-data-var claims-enabled bool true)
(define-data-var cumm-reward-per-token uint u0)
(define-data-var total-supply uint u0)

(define-map holder-info principal { amount: uint, cumm-reward-snapshot: uint })
(define-map saved-rewards principal uint)

;; Principals whose balance does not earn, such as the core's withdrawal escrow.
;; Excluded from total-supply and reward accrual. Set by the DAO. refresh-wallet
;; pins their tracked amount at 0 so they never dilute.
(define-map excluded principal bool)

(define-read-only (is-excluded (who principal))
  (default-to false (map-get? excluded who))
)

(define-public (set-excluded (who principal) (is-ex bool))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    ;; L-03: exclusion is add-only and requires zero tracked balance.
    ;; Prevents phantom supply from excluding a principal with an existing
    ;; balance and prevents un-excluding (which could re-introduce earning).
    (asserts! is-ex ERR_ALREADY_EXCLUDED)
    (asserts! (not (is-excluded who)) ERR_ALREADY_EXCLUDED)
    (asserts! (is-eq (get amount (get-holder-info who)) u0) ERR_HAS_BALANCE)
    (map-set excluded who is-ex)
    (print { action: "set-excluded", data: { who: who, is-ex: is-ex, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Getters

(define-read-only (get-claims-enabled) (var-get claims-enabled))
(define-read-only (get-cumm-reward-per-token) (var-get cumm-reward-per-token))
(define-read-only (get-total-supply) (var-get total-supply))

(define-read-only (get-holder-info (holder principal))
  (default-to { amount: u0, cumm-reward-snapshot: u0 } (map-get? holder-info holder))
)

(define-read-only (get-saved-rewards (holder principal))
  (default-to u0 (map-get? saved-rewards holder))
)

;; Rewards owed to holder: balance * (cumm - their snapshot) / REWARD_SCALE, plus any
;; rewards saved at the last balance change.
(define-read-only (get-pending-rewards (holder principal))
  (let (
    (info (get-holder-info holder))
    (owed-per-token (- (var-get cumm-reward-per-token) (get cumm-reward-snapshot info)))
  )
    (+ (get-saved-rewards holder) (/ (* (get amount info) owed-per-token) REWARD_SCALE))
  )
)

;; Balance tracking, called by the token

;; Set holder's tracked balance to new-balance. Crystallizes their rewards-to-date
;; into saved-rewards first, so a later accumulator change only applies to the new
;; balance, then resets their snapshot. Protocol-gated.
(define-public (refresh-wallet (holder principal) (new-balance uint))
  (let (
    (info (get-holder-info holder))
    (pending (get-pending-rewards holder))
  )
    (try! (contract-call? .dao check-is-protocol contract-caller))

    ;; Excluded holders never earn and never count toward total-supply.
    ;; Pin their tracked amount to 0.
    (if (is-excluded holder)
      (map-set holder-info holder { amount: u0, cumm-reward-snapshot: (var-get cumm-reward-per-token) })
      (begin
        (map-set saved-rewards holder pending)
        (var-set total-supply (+ (- (var-get total-supply) (get amount info)) new-balance))
        (map-set holder-info holder { amount: new-balance, cumm-reward-snapshot: (var-get cumm-reward-per-token) })
      )
    )
    (ok new-balance)
  )
)

;; Rewards

;; Pull amount sBTC from the caller and spread it across current holders by
;; bumping the accumulator. Reverts when there is no supply to distribute to, so
;; the caller must guard.
(define-public (add-rewards (amount uint))
  (let (
    (supply (var-get total-supply))
  )
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (> supply u0) ERR_REWARDS_CALC)

    (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer amount tx-sender current-contract none))
    (var-set cumm-reward-per-token (+ (var-get cumm-reward-per-token) (/ (* amount REWARD_SCALE) supply)))
    (print { action: "add-rewards", data: { amount: amount, supply: supply, block-height: stacks-block-height } })
    (ok amount)
  )
)

;; Claim the caller's accrued sBTC.
(define-public (claim-pending-rewards)
  (let (
    (holder tx-sender)
    (pending (get-pending-rewards tx-sender))
    (info (get-holder-info tx-sender))
  )
    (asserts! (var-get claims-enabled) ERR_CLAIMS_DISABLED)

    (if (> pending u0)
      (begin
        (try! (as-contract?
          ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" pending))
          (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer pending current-contract holder none))
        ))
        (map-delete saved-rewards holder)
        (map-set holder-info holder (merge info { cumm-reward-snapshot: (var-get cumm-reward-per-token) }))
        (print { action: "claim-pending-rewards", data: { holder: holder, pending: pending, block-height: stacks-block-height } })
        (ok pending)
      )
      (ok u0)
    )
  )
)

;; Admin

(define-public (set-claims-enabled (enabled bool))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set claims-enabled enabled)
    (print { action: "set-claims-enabled", data: { enabled: enabled, block-height: stacks-block-height } })
    (ok true)
  )
)
