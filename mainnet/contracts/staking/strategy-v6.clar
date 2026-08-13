(use-trait signer-manager-trait 'SP000000000000000000002Q6VF78.pox-5.signer-manager-trait)
(use-trait staker-trait .stbtc-staker-trait.stbtc-staker-trait)
(use-trait consensus-staker-trait .consensus-staker-trait.consensus-staker-trait)

(define-constant ERR_NOT_MANAGER (err u32001))
(define-constant ERR_ALREADY_INITIALIZED (err u32002))
(define-constant ERR_SIGNER_MANAGER_NOT_APPROVED (err u32003))

(define-data-var manager (optional principal) none)

(define-read-only (get-manager)
  (var-get manager)
)

(define-public (initialize (the-manager principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (is-none (var-get manager)) ERR_ALREADY_INITIALIZED)
    (var-set manager (some the-manager))
    (print { action: "initialize", data: { manager: the-manager, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-manager (new-manager principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set manager (some new-manager))
    (print { action: "set-manager", data: { manager: new-manager, block-height: stacks-block-height } })
    (ok true)
  )
)

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
