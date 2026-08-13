;; @contract Strategy v6
;; @version 6
;;
;; On-chain dispatch for the off-chain allocation engine. The manager computes
;; how much each staker should bond or recall, then drives it through here.
;; Validate the manager, dispatch to the staker. Must be a registered protocol
;; contract.
;;
;; perform-* operations check contract-caller == manager. set-manager is
;; DAO-gated, so the manager cannot rotate itself.
;;
;; Bond/stake authorization matrix (D11) - three overlapping allowlists, each
;; owned by a different layer:
;;   1. dao.check-is-protocol contract-caller - the strategy itself must be
;;      dao-active to be initialized and have its manager rotated.
;;   2. approved-signer-managers (here, DAO-curated) - every perform-* validates
;;      the passed <signer-manager-trait> via contract-of against this set, so a
;;      compromised manager cannot redirect a bond/stake behind an attacker's
;;      signer to steal rewards.
;;   3. signer-manager-v1 allowed-stakers (admin-gated per instance) - the
;;      signer's validate-stake! admits only allowlisted staker principals.
;; The <staker-trait> arg needs no separate allowlist: a staker can only move
;; reserve funds if it is dao-active, which the reserves already enforce.

(use-trait signer-manager-trait .pox-5.signer-manager-trait)
(use-trait staker-trait .stbtc-staker-trait.stbtc-staker-trait)
(use-trait consensus-staker-trait .consensus-staker-trait.consensus-staker-trait)

(define-constant ERR_NOT_MANAGER (err u32001))
(define-constant ERR_ALREADY_INITIALIZED (err u32002))
(define-constant ERR_SIGNER_MANAGER_NOT_APPROVED (err u32003))

;; Keeper allowed to drive allocation. `none` until initialize() wires the real
;; manager, so the contract is inert (never silently live-pointed at deployer).
;; Rotated thereafter by the DAO via set-manager.
(define-data-var manager (optional principal) none)

(define-read-only (get-manager)
  (var-get manager)
)

;; One-time wiring. DAO-gated, fails if already initialized.
(define-public (initialize (the-manager principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (is-none (var-get manager)) ERR_ALREADY_INITIALIZED)
    (var-set manager (some the-manager))
    (print { action: "initialize", data: { manager: the-manager, block-height: stacks-block-height } })
    (ok true)
  )
)

;; DAO-gated. Only a protocol-active contract can rotate the manager.
(define-public (set-manager (new-manager principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set manager (some new-manager))
    (print { action: "set-manager", data: { manager: new-manager, block-height: stacks-block-height } })
    (ok true)
  )
)

;; On-chain allowlist of signer-managers the manager may route through. Even a
;; compromised manager key cannot redirect a bond/stake behind an attacker's
;; signer-manager to steal rewards: every perform-* validates the passed
;; <signer-manager-trait> against this DAO-curated set. (The <staker-trait>
;; needs no allowlist: a staker can only move reserve funds if it is dao-active,
;; which the reserves already enforce.)
(define-map approved-signer-managers principal bool)

(define-read-only (is-approved-signer-manager (who principal))
  (default-to false (map-get? approved-signer-managers who))
)

(define-public (set-approved-signer-manager (signer-manager principal) (approved bool))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (map-set approved-signer-managers signer-manager approved)
    (print { action: "set-approved-signer-manager", data: { signer-manager: signer-manager, approved: approved, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Allocate. Have staker pull sats from the reserve and bond it.
(define-public (perform-bond
    (staker <staker-trait>)
    (bond-index uint)
    (signer-manager <signer-manager-trait>)
    (sats uint)
    (amount-ustx uint)
    (signer-calldata (optional (buff 500)))
  )
  (begin
    (asserts! (is-eq (some contract-caller) (var-get manager)) ERR_NOT_MANAGER)
    (asserts! (is-approved-signer-manager (contract-of signer-manager)) ERR_SIGNER_MANAGER_NOT_APPROVED)
    (print { action: "perform-bond", data: { staker: (contract-of staker), signer-manager: (contract-of signer-manager), bond-index: bond-index, sats: sats, amount-ustx: amount-ustx, block-height: stacks-block-height } })
    (contract-call? staker bond-sbtc bond-index signer-manager sats amount-ustx signer-calldata)
  )
)

;; Recall. Have staker pull sats of bonded sBTC back to the reserve.
(define-public (perform-recall
    (staker <staker-trait>)
    (signer-manager <signer-manager-trait>)
    (sats uint)
  )
  (begin
    (asserts! (is-eq (some contract-caller) (var-get manager)) ERR_NOT_MANAGER)
    (asserts! (is-approved-signer-manager (contract-of signer-manager)) ERR_SIGNER_MANAGER_NOT_APPROVED)
    (print { action: "perform-recall", data: { staker: (contract-of staker), signer-manager: (contract-of signer-manager), sats: sats, block-height: stacks-block-height } })
    (contract-call? staker recall-sbtc signer-manager sats)
  )
)

;; Roll a bond staker from its current bond into new-bond-index at maturity.
;; Net delta only. The per-2-cycle rebalance.
(define-public (perform-rollover
    (staker <staker-trait>)
    (new-bond-index uint)
    (signer-manager <signer-manager-trait>)
    (new-sats uint)
    (amount-ustx uint)
    (signer-calldata (optional (buff 500)))
  )
  (begin
    (asserts! (is-eq (some contract-caller) (var-get manager)) ERR_NOT_MANAGER)
    (asserts! (is-approved-signer-manager (contract-of signer-manager)) ERR_SIGNER_MANAGER_NOT_APPROVED)
    (print { action: "perform-rollover", data: { staker: (contract-of staker), signer-manager: (contract-of signer-manager), new-bond-index: new-bond-index, new-sats: new-sats, amount-ustx: amount-ustx, block-height: stacks-block-height } })
    (contract-call? staker rollover-bond new-bond-index signer-manager new-sats amount-ustx signer-calldata)
  )
)

;; Return. Have a bond staker send amount-ustx of unlocked STX collateral back
;; to the STX reserve after the bond term ends and the node unlock fires.
(define-public (perform-return-stx
    (staker <staker-trait>)
    (amount-ustx uint)
  )
  (begin
    (asserts! (is-eq (some contract-caller) (var-get manager)) ERR_NOT_MANAGER)
    (print { action: "perform-return-stx", data: { staker: (contract-of staker), amount-ustx: amount-ustx, block-height: stacks-block-height } })
    (contract-call? staker return-stx amount-ustx)
  )
)

;; Consensus (STX-only stake) dispatch

;; Allocate consensus. Have staker pull amount-ustx from the STX reserve and
;; stake it (STX-only) behind signer-manager for num-cycles.
(define-public (perform-stake
    (staker <consensus-staker-trait>)
    (signer-manager <signer-manager-trait>)
    (amount-ustx uint)
    (ststxbtc-amount uint)
    (num-cycles uint)
    (signer-calldata (optional (buff 500)))
  )
  (begin
    (asserts! (is-eq (some contract-caller) (var-get manager)) ERR_NOT_MANAGER)
    (asserts! (is-approved-signer-manager (contract-of signer-manager)) ERR_SIGNER_MANAGER_NOT_APPROVED)
    (print { action: "perform-stake", data: { staker: (contract-of staker), signer-manager: (contract-of signer-manager), amount-ustx: amount-ustx, ststxbtc-amount: ststxbtc-amount, num-cycles: num-cycles, block-height: stacks-block-height } })
    (contract-call? staker stake-stx signer-manager amount-ustx ststxbtc-amount num-cycles signer-calldata)
  )
)

(define-public (perform-stake-update
    (staker <consensus-staker-trait>)
    (signer-manager <signer-manager-trait>)
    (old-signer-manager <signer-manager-trait>)
    (cycles-to-extend uint)
    (amount-increase uint)
    (ststxbtc-increase uint)
    (signer-calldata (optional (buff 500)))
  )
  (begin
    (asserts! (is-eq (some contract-caller) (var-get manager)) ERR_NOT_MANAGER)
    (asserts! (is-approved-signer-manager (contract-of signer-manager)) ERR_SIGNER_MANAGER_NOT_APPROVED)
    (asserts! (is-approved-signer-manager (contract-of old-signer-manager)) ERR_SIGNER_MANAGER_NOT_APPROVED)
    (print { action: "perform-stake-update", data: { staker: (contract-of staker), signer-manager: (contract-of signer-manager), old-signer-manager: (contract-of old-signer-manager), cycles-to-extend: cycles-to-extend, amount-increase: amount-increase, ststxbtc-increase: ststxbtc-increase, block-height: stacks-block-height } })
    (contract-call? staker stake-update-stx signer-manager old-signer-manager cycles-to-extend amount-increase ststxbtc-increase signer-calldata)
  )
)

;; Deallocate consensus. Schedule the unlock of staker's STX-only stake.
(define-public (perform-unstake
    (staker <consensus-staker-trait>)
    (old-signer-manager <signer-manager-trait>)
  )
  (begin
    (asserts! (is-eq (some contract-caller) (var-get manager)) ERR_NOT_MANAGER)
    (asserts! (is-approved-signer-manager (contract-of old-signer-manager)) ERR_SIGNER_MANAGER_NOT_APPROVED)
    (print { action: "perform-unstake", data: { staker: (contract-of staker), old-signer-manager: (contract-of old-signer-manager), block-height: stacks-block-height } })
    (contract-call? staker unstake-stx old-signer-manager)
  )
)

;; Return unlocked consensus STX from `staker` back to the STX reserve.
(define-public (perform-return-consensus-stx
    (staker <consensus-staker-trait>)
    (ststx-amount uint)
    (ststxbtc-amount uint)
  )
  (begin
    (asserts! (is-eq (some contract-caller) (var-get manager)) ERR_NOT_MANAGER)
    (print { action: "perform-return-consensus-stx", data: { staker: (contract-of staker), ststx-amount: ststx-amount, ststxbtc-amount: ststxbtc-amount, block-height: stacks-block-height } })
    (contract-call? staker return-stx ststx-amount ststxbtc-amount)
  )
)
