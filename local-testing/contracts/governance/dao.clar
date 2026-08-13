;; @contract DAO
;; @version 1
;;
;; Access control and contract registry. The init block registers only the
;; deployer. In-scope StackingDAO contracts are registered via set-contract-
;; active in test setup.

;; Constants

(define-constant ERR_NOT_ADMIN (err u20001))
(define-constant ERR_CONTRACTS_DISABLED (err u20002))
(define-constant ERR_INACTIVE_CONTRACT (err u20003))
(define-constant ERR_LAST_ADMIN (err u20004))

;; Variables

(define-data-var contracts-enabled bool true)
(define-data-var admin-count uint u1)

;; Maps

(define-map contracts
  { address: principal }
  { active: bool }
)

(define-map admins
  { address: principal }
  { active: bool }
)

;; Getters

(define-read-only (get-contracts-enabled)
  (var-get contracts-enabled)
)

(define-read-only (get-contract-active (address principal))
  (get active
    (default-to { active: false } (map-get? contracts { address: address }))
  )
)

(define-read-only (get-admin (address principal))
  (get active
    (default-to { active: false } (map-get? admins { address: address }))
  )
)

(define-read-only (get-admin-count)
  (var-get admin-count)
)

;; Checks

(define-public (check-is-enabled)
  (begin
    (asserts! (var-get contracts-enabled) ERR_CONTRACTS_DISABLED)
    (ok true)
  )
)

(define-public (check-is-protocol (contract principal))
  (begin
    (asserts! (get-contract-active contract) ERR_INACTIVE_CONTRACT)
    (ok true)
  )
)

(define-public (check-is-admin (contract principal))
  (begin
    (asserts! (get-admin contract) ERR_NOT_ADMIN)
    (ok true)
  )
)

;; Set

(define-public (set-contracts-enabled (enabled bool))
  (begin
    (try! (check-is-admin contract-caller))
    (var-set contracts-enabled enabled)
    (print { action: "set-contracts-enabled", data: { enabled: enabled, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-contract-active (address principal) (active bool))
  (begin
    (try! (check-is-admin contract-caller))
    (map-set contracts { address: address } { active: active })
    (print { action: "set-contract-active", data: { address: address, active: active, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-admin (address principal) (active bool))
  (begin
    (try! (check-is-admin contract-caller))
    (let ((currently-active (get-admin address)))
      ;; Track admin-count, preventing removal of the last admin (L-02).
      (if (and active (not currently-active))
        (var-set admin-count (+ (var-get admin-count) u1))
        (if (and (not active) currently-active)
          (begin
            (asserts! (> (var-get admin-count) u1) ERR_LAST_ADMIN)
            (var-set admin-count (- (var-get admin-count) u1))
          )
          false
        )
      )
    )
    (map-set admins { address: address } { active: active })
    (print { action: "set-admin", data: { address: address, active: active, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Init

(begin
  (map-set admins { address: tx-sender } { active: true })
  (map-set contracts { address: tx-sender } { active: true })
)
