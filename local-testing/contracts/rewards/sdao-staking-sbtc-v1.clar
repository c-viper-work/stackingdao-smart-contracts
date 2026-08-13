;; sBTC token: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token (Clarity literal; see STYLE.md)
;; @contract sDAO Staking sBTC v1
;; @version 1
;;
;; Stake sDAO to receive sBTC-denominated protocol revenue.
;;
;; Synthetix-style cumulative-reward-per-stake accumulator. Rewards arrive in
;; chunks via add-rewards(amount, end-block). Each chunk sets a per-block release
;; rate that pays out linearly until end-block, then 0 thereafter. Holders'
;; accrued share is computed lazily off the cumm-reward-per-stake.

(define-constant ERR_REWARDS_CALC (err u12001))
(define-constant ERR_INVALID_END_BLOCK (err u12002))
(define-constant ERR_INSUFFICIENT_STAKE (err u12003))
(define-constant ERR_SHUTDOWN (err u12004))

;; Fixed-point scale for the cumulative-reward-per-stake accumulator.
;; Canonical REWARD_SCALE = 1e10, matching ststxbtc-tracking-v1 and
;; native-pool-tracking-v1 (one scale per reward-per-token engine). See the
;; constants table in SECURITY-NOTES.md.
(define-constant REWARD_SCALE u10000000000)

;; Variables

(define-data-var total-staked uint u0)
(define-data-var cumm-reward-per-stake uint u0)
(define-data-var last-reward-increase-block uint u0)
(define-data-var shutdown-stake bool false)
(define-data-var rewards-per-block uint u0)
(define-data-var rewards-end-block uint u0)
;; Rewards that streamed while total-staked was 0. Folded into the next
;; add-rewards schedule so they are never permanently locked (M-01).
(define-data-var unassigned-rewards uint u0)

(define-map stakes
  { staker: principal }
  {
    amount: uint,
    cumm-reward-per-stake: uint,
  }
)

;; Getters

(define-read-only (get-stake-of (staker principal))
  (default-to
    { amount: u0, cumm-reward-per-stake: u0 }
    (map-get? stakes { staker: staker })
  )
)

(define-read-only (get-stake-amount-of (staker principal))
  (get amount (get-stake-of staker))
)

(define-read-only (get-stake-cumm-reward-per-stake-of (staker principal))
  (get cumm-reward-per-stake (get-stake-of staker))
)

(define-read-only (get-total-staked)
  (var-get total-staked)
)

(define-read-only (get-cumm-reward-per-stake)
  (var-get cumm-reward-per-stake)
)

(define-read-only (get-last-reward-increase-block)
  (var-get last-reward-increase-block)
)

(define-read-only (get-rewards-per-block)
  (var-get rewards-per-block)
)

(define-read-only (get-rewards-end-block)
  (var-get rewards-end-block)
)

(define-read-only (get-unassigned-rewards)
  (var-get unassigned-rewards)
)

(define-read-only (get-shutdown-stake)
  (var-get shutdown-stake)
)

(define-public (set-shutdown-stake (shutdown bool))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set shutdown-stake shutdown)
    (print { action: "set-shutdown-stake", data: { shutdown: shutdown, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Stake and Unstake

(define-public (stake (amount uint))
  (let (
    (staker tx-sender)
    (stake-amount (get-stake-amount-of staker))
    (new-stake-amount (+ stake-amount amount))
  )
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (not (var-get shutdown-stake)) ERR_SHUTDOWN)
    (try! (claim-pending-rewards))
    (var-set total-staked (+ (var-get total-staked) amount))
    (unwrap-panic (increase-cumm-reward-per-stake))
    (try! (contract-call? .sdao-token transfer amount staker current-contract none))
    (map-set stakes { staker: staker } { amount: new-stake-amount, cumm-reward-per-stake: (var-get cumm-reward-per-stake) })
    (print { action: "stake", data: { staker: staker, amount: amount, new-stake-amount: new-stake-amount, block-height: stacks-block-height } })
    (ok amount)
  )
)

(define-public (unstake (amount uint))
  (let (
    (staker tx-sender)
    (stake-amount (get-stake-amount-of staker))
  )
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (>= stake-amount amount) ERR_INSUFFICIENT_STAKE)
    (let ((new-stake-amount (- stake-amount amount)))
      (try! (claim-pending-rewards))
      (var-set total-staked (- (var-get total-staked) amount))
      (unwrap-panic (increase-cumm-reward-per-stake))
      (try! (as-contract? ((with-ft .sdao-token "sdao" amount)) (try! (contract-call? .sdao-token transfer amount current-contract staker none))))
      (map-set stakes { staker: staker } { amount: new-stake-amount, cumm-reward-per-stake: (var-get cumm-reward-per-stake) })
      (print { action: "unstake", data: { staker: staker, amount: amount, new-stake-amount: new-stake-amount, block-height: stacks-block-height } })
      (ok amount)
    )
  )
)

;; Rewards: user-facing

(define-read-only (get-pending-rewards (staker principal))
  (let (
    (stake-amount (get-stake-amount-of staker))
    (amount-owed-per-token (- (unwrap-panic (calculate-cumm-reward-per-stake)) (get-stake-cumm-reward-per-stake-of staker)))
    (rewards (/ (* stake-amount amount-owed-per-token) REWARD_SCALE))
  )
    (ok rewards)
  )
)

(define-public (claim-pending-rewards)
  (let (
    (staker tx-sender)
  )
    (try! (contract-call? .dao check-is-enabled))
    (unwrap-panic (increase-cumm-reward-per-stake))
    (let (
      (pending-rewards (unwrap! (get-pending-rewards staker) ERR_REWARDS_CALC))
      (stake-of (get-stake-of staker))
    )
      (if (>= pending-rewards u1)
        (begin
          ;; Send sBTC rewards to staker
          (try! (as-contract?
            ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" pending-rewards))
            (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer pending-rewards current-contract staker none))
          ))
          (map-set stakes { staker: staker } (merge stake-of { cumm-reward-per-stake: (var-get cumm-reward-per-stake) }))
          (print { action: "claim-pending-rewards", data: { staker: staker, pending-rewards: pending-rewards, block-height: stacks-block-height } })
          (ok pending-rewards)
        )
        (ok u0)
      )
    )
  )
)

;; Rewards: accumulator math

;; Internal: advances the accumulator. Private - every call site is internal and
;; already unwrap-panics the result (C11; was public, widening the poke surface).
(define-private (increase-cumm-reward-per-stake)
  (let (
    (new-cumm-reward-per-stake (unwrap-panic (calculate-cumm-reward-per-stake)))
  )
    (asserts! (> burn-block-height (var-get last-reward-increase-block)) (ok u0))
    ;; When no one is staked, streamed rewards would be permanently locked.
    ;; Track them for recovery via add-rewards fold-in (M-01).
    (if (is-eq (var-get total-staked) u0)
      (let (
        (effective-end (if (< burn-block-height (var-get rewards-end-block)) burn-block-height (var-get rewards-end-block)))
        (block-diff (if (> effective-end (var-get last-reward-increase-block)) (- effective-end (var-get last-reward-increase-block)) u0))
      )
        (var-set unassigned-rewards (+ (var-get unassigned-rewards) (* (var-get rewards-per-block) block-diff)))
      )
      false
    )
    (var-set cumm-reward-per-stake new-cumm-reward-per-stake)
    (var-set last-reward-increase-block burn-block-height)
    (ok new-cumm-reward-per-stake)
  )
)

(define-read-only (calculate-cumm-reward-per-stake)
  (let (
    (current-total-staked (var-get total-staked))
    (block-diff
      ;; effective-end = min(burn, end); blocks streamed since last-reward-increase-block,
      ;; clamped to 0. Same shape as rewards-v7's get-ready-to-release.
      (let ((effective-end (if (< burn-block-height (var-get rewards-end-block)) burn-block-height (var-get rewards-end-block))))
        (if (> effective-end (var-get last-reward-increase-block))
          (- effective-end (var-get last-reward-increase-block))
          u0
        )
      )
    )
    (current-cumm-reward-per-stake (var-get cumm-reward-per-stake))
  )
    (if (> current-total-staked u0)
      (let (
        (total-rewards-to-distribute (* (var-get rewards-per-block) block-diff))
        (reward-added-per-token (/ (* total-rewards-to-distribute REWARD_SCALE) current-total-staked))
        (new-cumm-reward-per-stake (+ current-cumm-reward-per-stake reward-added-per-token))
      )
        (ok new-cumm-reward-per-stake)
      )
      (ok current-cumm-reward-per-stake)
    )
  )
)

;; Rewards: add (called by commission-sbtc-v1)

;; Pulls `amount` sBTC from the caller and blends it into the active per-block
;; release. Any unreleased remainder from the previous schedule is summed with
;; the new amount and spread linearly over (end-block - burn-block-height).
;; Caller must be a dao-active protocol contract.
(define-public (add-rewards (amount uint) (end-block uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    ;; Guard the per-block division below. end-block must be strictly future,
    ;; else (- end-block burn-block-height) underflows or divides by zero.
    (asserts! (> end-block burn-block-height) ERR_INVALID_END_BLOCK)
    (let (
      (reward-blocks-left (if (< burn-block-height (var-get rewards-end-block))
        (- (var-get rewards-end-block) burn-block-height)
        u0
      ))
      (rewards-left (* reward-blocks-left (var-get rewards-per-block)))
    )
      (unwrap-panic (increase-cumm-reward-per-stake))

      ;; Fold previously-stranded rewards into the new stream (M-01).
      (let (
        (folded (var-get unassigned-rewards))
        (new-rewards-per-block (/ (+ rewards-left folded amount) (- end-block burn-block-height)))
      )
        ;; Pull sBTC from caller, the current tx-sender.
        (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer amount tx-sender current-contract none))

        (var-set unassigned-rewards u0)
        (var-set rewards-per-block new-rewards-per-block)
        (var-set rewards-end-block end-block)
        (print { action: "add-rewards", data: { amount: amount, rewards-per-block: new-rewards-per-block, end-block: end-block, folded: folded, block-height: stacks-block-height } })
        (ok amount)
      )
    )
  )
)

;; Init

(begin
  (var-set last-reward-increase-block burn-block-height)
)
