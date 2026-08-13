(use-trait signer-manager-trait 'SP000000000000000000002Q6VF78.pox-5.signer-manager-trait)

(define-constant ERR_WRONG_SIGNER_MANAGER (err u36002))
(define-constant ERR_ALREADY_INITIALIZED (err u36003))

(define-data-var native-pool-sm (optional principal) none)

(define-map delegating { staker: principal, sm: principal } bool)

(define-read-only (is-delegating (staker principal) (sm principal))
  (default-to false (map-get? delegating { staker: staker, sm: sm }))
)

(define-public (initialize (sm principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (is-none (var-get native-pool-sm)) ERR_ALREADY_INITIALIZED)
    (var-set native-pool-sm (some sm))
    (print { action: "initialize", data: { sm: sm, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-read-only (current-cycle)
  (contract-call? 'SP000000000000000000002Q6VF78.pox-5 current-pox-reward-cycle)
)

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

    (map-set delegating { staker: user, sm: (contract-of signer-manager) } true)
    (try! (contract-call? 'SP000000000000000000002Q6VF78.pox-5 stake signer-manager amount-ustx num-cycles burn-block-height none))
    (map-set delegating { staker: user, sm: (contract-of signer-manager) } false)

    (print { action: "delegate", data: { user: user, amount-ustx: amount-ustx, num-cycles: num-cycles, block-height: stacks-block-height } })
    (ok amount-ustx)
  )
)

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
    (try! (contract-call? 'SP000000000000000000002Q6VF78.pox-5 stake-update signer-manager old-signer-manager cycles-to-extend amount-increase signer-calldata))
    (map-set delegating { staker: user, sm: (contract-of signer-manager) } false)

    (print { action: "delegate-update", data: { user: user, cycles-to-extend: cycles-to-extend, amount-increase: amount-increase, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (undelegate (old-signer-manager <signer-manager-trait>))
  (let ((user tx-sender))
    (asserts! (is-eq (contract-of old-signer-manager) (unwrap-panic (var-get native-pool-sm))) ERR_WRONG_SIGNER_MANAGER)

    (try! (contract-call? 'SP000000000000000000002Q6VF78.pox-5 unstake old-signer-manager))

    (print { action: "undelegate", data: { user: user, block-height: stacks-block-height } })
    (ok true)
  )
)
