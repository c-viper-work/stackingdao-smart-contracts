;; @contract STX Reserve
;; @version 1
;;
;; Holds all protocol STX not currently deployed into poX-5.
;;
;; Account model (see H-04 invariants):
;;   stx-staking: bonds + STX-only stakes (stSTX + stSTXbtc)
;;   stx-for-ststxbtc: total stSTXbtc principal (idle + staked)
;;   stx-for-ststxbtc-idle: idle portion of stSTXbtc principal
;;   staked stSTXbtc = stx-for-ststxbtc - stx-for-ststxbtc-idle
;;   staked stSTX = stx-staking - staked stSTXbtc
;;   stx-for-withdrawals-ststx: pending stSTX withdrawals (net of fee)
;;   stx-for-withdrawals-ststxbtc: pending stSTXbtc withdrawals (includes fee)

;; Variables

(define-data-var stx-staking uint u0)
(define-data-var stx-for-withdrawals-ststx uint u0)
(define-data-var stx-for-withdrawals-ststxbtc uint u0)
(define-data-var stx-for-ststxbtc uint u0)
(define-data-var stx-for-ststxbtc-idle uint u0)

(define-constant ERR_RESERVED (err u23001))

;; Getters

(define-read-only (get-stx-for-withdrawals)
  (var-get stx-for-withdrawals-ststx)
)

(define-read-only (get-stx-for-withdrawals-ststxbtc)
  (var-get stx-for-withdrawals-ststxbtc)
)

(define-read-only (get-stx-for-ststxbtc)
  (var-get stx-for-ststxbtc)
)

(define-read-only (get-stx-for-ststxbtc-idle)
  (var-get stx-for-ststxbtc-idle)
)

(define-read-only (get-stx-staking)
  (var-get stx-staking)
)

(define-read-only (get-stx-balance)
  (stx-get-balance current-contract)
)

(define-read-only (get-total-stx)
  (+ (stx-get-balance current-contract) (var-get stx-staking))
)

(define-read-only (get-stx-available)
  (let (
    (balance (stx-get-balance current-contract))
    (claimed (+ (var-get stx-for-withdrawals-ststx) (var-get stx-for-ststxbtc-idle)))
  )
    (if (> balance claimed) (- balance claimed) u0)
  )
)

;; Withdrawals - stSTX

(define-public (lock-stx-for-withdrawal (stx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set stx-for-withdrawals-ststx (+ (var-get stx-for-withdrawals-ststx) stx-amount))
    (print { action: "lock-stx-for-withdrawal", data: { stx-amount: stx-amount, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

(define-public (request-stx-for-withdrawal (requested-stx uint) (receiver principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (>= (stx-get-balance current-contract) (+ requested-stx (var-get stx-for-ststxbtc-idle))) ERR_RESERVED)
    (var-set stx-for-withdrawals-ststx (- (var-get stx-for-withdrawals-ststx) requested-stx))
    (try! (as-contract?
      ((with-stx requested-stx))
      (try! (stx-transfer? requested-stx current-contract receiver))
    ))
    (print { action: "request-stx-for-withdrawal", data: { requested-stx: requested-stx, receiver: receiver, block-height: stacks-block-height } })
    (ok requested-stx)
  )
)

(define-public (unlock-stx-from-withdrawal (stx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set stx-for-withdrawals-ststx (- (var-get stx-for-withdrawals-ststx) stx-amount))
    (print { action: "unlock-stx-from-withdrawal", data: { stx-amount: stx-amount, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

;; Withdrawals - stSTXbtc

(define-public (lock-stx-for-withdrawal-ststxbtc (stx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set stx-for-withdrawals-ststxbtc (+ (var-get stx-for-withdrawals-ststxbtc) stx-amount))
    (print { action: "lock-stx-for-withdrawal-ststxbtc", data: { stx-amount: stx-amount, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

(define-public (request-stx-for-withdrawal-ststxbtc (requested-stx uint) (receiver principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (>= (var-get stx-for-ststxbtc-idle) requested-stx) ERR_RESERVED)
    (var-set stx-for-withdrawals-ststxbtc (- (var-get stx-for-withdrawals-ststxbtc) requested-stx))
    (var-set stx-for-ststxbtc (- (var-get stx-for-ststxbtc) requested-stx))
    (var-set stx-for-ststxbtc-idle (- (var-get stx-for-ststxbtc-idle) requested-stx))
    (try! (as-contract?
      ((with-stx requested-stx))
      (try! (stx-transfer? requested-stx current-contract receiver))
    ))
    (print { action: "request-stx-for-withdrawal-ststxbtc", data: { requested-stx: requested-stx, receiver: receiver, block-height: stacks-block-height } })
    (ok requested-stx)
  )
)

;; stSTXbtc earmark

(define-public (lock-stx-for-ststxbtc (stx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set stx-for-ststxbtc (+ (var-get stx-for-ststxbtc) stx-amount))
    (var-set stx-for-ststxbtc-idle (+ (var-get stx-for-ststxbtc-idle) stx-amount))
    (print { action: "lock-stx-for-ststxbtc", data: { stx-amount: stx-amount, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

(define-public (unlock-stx-for-ststxbtc (stx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (let ((idle (var-get stx-for-ststxbtc-idle)))
      (var-set stx-for-ststxbtc (- (var-get stx-for-ststxbtc) stx-amount))
      (var-set stx-for-ststxbtc-idle (- idle (if (> stx-amount idle) idle stx-amount)))
    )
    (print { action: "unlock-stx-for-ststxbtc", data: { stx-amount: stx-amount, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

;; Instant payouts

(define-public (pay-stx-from-idle (stx-amount uint) (receiver principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (>= (stx-get-balance current-contract) (+ stx-amount (+ (var-get stx-for-withdrawals-ststx) (var-get stx-for-ststxbtc-idle)))) ERR_RESERVED)
    (try! (as-contract?
      ((with-stx stx-amount))
      (try! (stx-transfer? stx-amount current-contract receiver))
    ))
    (print { action: "pay-stx-from-idle", data: { stx-amount: stx-amount, receiver: receiver, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

(define-public (pay-stx-from-idle-ststxbtc (stx-amount uint) (receiver principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (>= (var-get stx-for-ststxbtc-idle) (+ stx-amount (var-get stx-for-withdrawals-ststxbtc))) ERR_RESERVED)
    (var-set stx-for-ststxbtc (- (var-get stx-for-ststxbtc) stx-amount))
    (var-set stx-for-ststxbtc-idle (- (var-get stx-for-ststxbtc-idle) stx-amount))
    (try! (as-contract?
      ((with-stx stx-amount))
      (try! (stx-transfer? stx-amount current-contract receiver))
    ))
    (print { action: "pay-stx-from-idle-ststxbtc", data: { stx-amount: stx-amount, receiver: receiver, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

;; Staking (bond collateral) - only uses stSTX idle

(define-public (request-stx-to-stack (requested-stx uint))
  (let ((receiver contract-caller))
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (>= (stx-get-balance current-contract) (+ requested-stx (+ (var-get stx-for-withdrawals-ststx) (var-get stx-for-ststxbtc-idle)))) ERR_RESERVED)
    (var-set stx-staking (+ (var-get stx-staking) requested-stx))
    (try! (as-contract?
      ((with-stx requested-stx))
      (try! (stx-transfer? requested-stx current-contract receiver))
    ))
    (print { action: "request-stx-to-stack", data: { requested-stx: requested-stx, receiver: receiver, block-height: stacks-block-height } })
    (ok requested-stx)
  )
)

;; STX-only PoX-5 staking - explicit stSTX/stSTXbtc split

(define-public (request-stx-for-staking (ststx-amount uint) (ststxbtc-amount uint))
  (let ((receiver contract-caller))
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (try! (contract-call? .dao check-is-enabled))
    ;; stSTX part must fit in idle stSTX minus stSTX pending withdrawals
    (asserts! (or (is-eq ststx-amount u0)
                  (>= (stx-get-balance current-contract) (+ ststx-amount (+ (var-get stx-for-withdrawals-ststx) (var-get stx-for-ststxbtc-idle))))) ERR_RESERVED)
    ;; stSTXbtc part must fit in idle stSTXbtc minus stSTXbtc pending withdrawals
    (asserts! (or (is-eq ststxbtc-amount u0)
                  (>= (var-get stx-for-ststxbtc-idle) (+ ststxbtc-amount (var-get stx-for-withdrawals-ststxbtc)))) ERR_RESERVED)
    (var-set stx-for-ststxbtc-idle (- (var-get stx-for-ststxbtc-idle) ststxbtc-amount))
    (var-set stx-staking (+ (var-get stx-staking) (+ ststx-amount ststxbtc-amount)))
    (try! (as-contract?
      ((with-stx (+ ststx-amount ststxbtc-amount)))
      (try! (stx-transfer? (+ ststx-amount ststxbtc-amount) current-contract receiver))
    ))
    (print { action: "request-stx-for-staking", data: { ststx-amount: ststx-amount, ststxbtc-amount: ststxbtc-amount, receiver: receiver, block-height: stacks-block-height } })
    (ok (+ ststx-amount ststxbtc-amount))
  )
)

;; Return STX from bond staker - goes to stSTX idle only

(define-public (return-stx-from-stacking (stx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (try! (contract-call? .dao check-is-enabled))
    (var-set stx-staking (- (var-get stx-staking) stx-amount))
    (try! (stx-transfer? stx-amount tx-sender current-contract))
    (print { action: "return-stx-from-stacking", data: { stx-amount: stx-amount, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

;; Return STX from STX-only staker - explicit split

(define-public (return-stx-from-staking-split (ststx-amount uint) (ststxbtc-amount uint))
  (let (
    (staked-ststxbtc (- (var-get stx-for-ststxbtc) (var-get stx-for-ststxbtc-idle)))
    (staked-ststx (- (var-get stx-staking) staked-ststxbtc))
  )
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (>= staked-ststxbtc ststxbtc-amount) ERR_RESERVED)
    (asserts! (>= staked-ststx ststx-amount) ERR_RESERVED)
    (var-set stx-for-ststxbtc-idle (+ (var-get stx-for-ststxbtc-idle) ststxbtc-amount))
    (var-set stx-staking (- (var-get stx-staking) (+ ststx-amount ststxbtc-amount)))
    (try! (stx-transfer? (+ ststx-amount ststxbtc-amount) tx-sender current-contract))
    (print { action: "return-stx-from-staking-split", data: { ststx-amount: ststx-amount, ststxbtc-amount: ststxbtc-amount, block-height: stacks-block-height } })
    (ok (+ ststx-amount ststxbtc-amount))
  )
)

;; Admin escape valve

(define-public (get-stx (requested-stx uint) (receiver principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (>= (stx-get-balance current-contract) (+ requested-stx (+ (var-get stx-for-withdrawals-ststx) (var-get stx-for-ststxbtc-idle)))) ERR_RESERVED)
    (try! (as-contract?
      ((with-stx requested-stx))
      (try! (stx-transfer? requested-stx current-contract receiver))
    ))
    (print { action: "get-stx", data: { requested-stx: requested-stx, receiver: receiver, block-height: stacks-block-height } })
    (ok requested-stx)
  )
)
