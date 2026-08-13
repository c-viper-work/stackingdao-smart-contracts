;; @contract STX Reserve v2 (derived-earmark)
;; @version 2
;;
;; v2 of stx-reserve: identical functional surface to v1 EXCEPT the stSTXbtc
;; backing earmark is DERIVED instead of stored.
;;
;; Rationale (see upgrade-nexus/11-massive-swap-redesign.md + SWAP-V4-PLAN.md):
;;   A stSTX <-> stSTXbtc swap is a backing RE-LABEL -- burn one token, mint the
;;   other, move the earmark -- no STX moves, ratio preserved at any size. To make
;;   that swap a pure token burn/mint (reserve-independent at runtime, cap-free),
;;   the earmark must stop being a manually-maintained stored value.
;;
;;   v1's stored earmark tracked ACTIVE stSTXbtc supply: it excluded the stSTXbtc
;;   escrowed in-flight for pending scheduled withdrawals (v1 seeded it as
;;   supply minus legacy-core escrow at cutover). We derive that same ACTIVE
;;   amount, correctly netting escrow out of raw supply (auditor F-2):
;;
;;       stx-for-ststxbtc (derived)
;;             == ststxbtc-token.get-total-supply() - stx-for-ststxbtc-escrow
;;
;;   where stx-for-ststxbtc-escrow is stSTXbtc currently transferred to the core
;;   (escrowed, un-burned) for pending scheduled withdrawals. Netting it keeps
;;   "derived == the active earmark" at cutover (so the migration equality assert
;;   holds against v1's stored seed) and through every escrow window.
;;
;;   v2 keeps `stx-for-ststxbtc-idle`, `stx-for-ststxbtc-escrow`, the withdrawal
;;   buckets, staking and balance STORED -- those cannot be derived from supply.
;;   Only the TOTAL earmark is derived.
;;
;; Account model (see H-04 invariants):
;;   stx-staking: bonds + STX-only stakes (stSTX + stSTXbtc)
;;   stx-for-ststxbtc (DERIVED): active stSTXbtc principal = supply - escrow
;;   stx-for-ststxbtc-idle: idle portion (stored)
;;   staked stSTXbtc = derived active - idle
;;   staked stSTX    = stx-staking - staked stSTXbtc
;;   stx-for-ststxbtc-escrow: in-flight stSTXbtc escrowed for pending withdrawals
;;   stx-for-withdrawals-ststx: pending stSTX withdrawals (net of fee)
;;   stx-for-withdrawals-ststxbtc: pending stSTXbtc withdrawals (includes fee)
;;
;; Deploy note: this dev copy references .ststxbtc-token; the deployed copy
;; references .ststxbtc-token-v2 (same dev/deployed variant split as the cores).

;; Variables (stored)

(define-data-var stx-staking uint u0)
(define-data-var stx-for-withdrawals-ststx uint u0)
(define-data-var stx-for-withdrawals-ststxbtc uint u0)
(define-data-var stx-for-ststxbtc-idle uint u0)
(define-data-var stx-for-ststxbtc-escrow uint u0)
;; NOTE: NO stored stx-for-ststxbtc total -- derived from supply - escrow.

(define-constant ERR_RESERVED (err u23001))

;; Getters

(define-read-only (get-stx-for-withdrawals)
  (var-get stx-for-withdrawals-ststx)
)

(define-read-only (get-stx-for-withdrawals-ststxbtc)
  (var-get stx-for-withdrawals-ststxbtc)
)

(define-read-only (get-stx-for-ststxbtc)
  ;; DERIVED ACTIVE earmark: total stSTXbtc supply minus in-flight escrow.
  ;; A swap mint/burn moves the supply term automatically, so the swap needs no
  ;; reserve call; the escrow term is maintained by the withdrawal path (auditor
  ;; F-2) so this equals v1's stored active seed at cutover and through escrow.
  (let ((supply (unwrap-panic (contract-call? .ststxbtc-token get-total-supply))))
    (- supply (var-get stx-for-ststxbtc-escrow)))
)

(define-read-only (get-stx-for-ststxbtc-idle)
  (var-get stx-for-ststxbtc-idle)
)

(define-read-only (get-stx-for-ststxbtc-escrow)
  (var-get stx-for-ststxbtc-escrow)
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

;; Withdrawals - stSTX (unchanged)

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

;; Withdrawals - stSTXbtc (total earmark now derived)

(define-public (lock-stx-for-withdrawal-ststxbtc (stx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set stx-for-withdrawals-ststxbtc (+ (var-get stx-for-withdrawals-ststxbtc) stx-amount))
    ;; F-2: record the in-flight escrow so the derived earmark (supply - escrow)
    ;; stays equal to the ACTIVE stSTXbtc backing while the tokens are escrowed.
    (var-set stx-for-ststxbtc-escrow (+ (var-get stx-for-ststxbtc-escrow) stx-amount))
    (print { action: "lock-stx-for-withdrawal-ststxbtc", data: { stx-amount: stx-amount, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

(define-public (request-stx-for-withdrawal-ststxbtc (requested-stx uint) (receiver principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (>= (var-get stx-for-ststxbtc-idle) requested-stx) ERR_RESERVED)
    (var-set stx-for-withdrawals-ststxbtc (- (var-get stx-for-withdrawals-ststxbtc) requested-stx))
    ;; NOTE: no `stx-for-ststxbtc -= requested` decrement -- the ACTIVE total earmark
    ;; is derived from (supply - escrow); the core burns the token (supply drops)
    ;; in the same tx and we release the matching escrow here.
    (var-set stx-for-ststxbtc-idle (- (var-get stx-for-ststxbtc-idle) requested-stx))
    (var-set stx-for-ststxbtc-escrow (- (var-get stx-for-ststxbtc-escrow) requested-stx))
    (try! (as-contract?
      ((with-stx requested-stx))
      (try! (stx-transfer? requested-stx current-contract receiver))
    ))
    (print { action: "request-stx-for-withdrawal-ststxbtc", data: { requested-stx: requested-stx, receiver: receiver, block-height: stacks-block-height } })
    (ok requested-stx)
  )
)

;; stSTXbtc earmark - idle only (total derived from supply)

(define-public (lock-stx-for-ststxbtc (stx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    ;; v2: only the IDLE sub-counter is bumped. The total earmark is derived from
    ;; stSTXbtc supply, which the caller's mint has already raised.
    (var-set stx-for-ststxbtc-idle (+ (var-get stx-for-ststxbtc-idle) stx-amount))
    (print { action: "lock-stx-for-ststxbtc", data: { stx-amount: stx-amount, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

(define-public (unlock-stx-for-ststxbtc (stx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (let ((idle (var-get stx-for-ststxbtc-idle)))
      ;; v2: total is derived; only decrement idle (capped at idle).
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
    ;; NOTE: no `stx-for-ststxbtc -= amount` -- the total earmark is derived from
    ;; supply, and the core burns the token (lowering supply) in the same tx.
    (var-set stx-for-ststxbtc-idle (- (var-get stx-for-ststxbtc-idle) stx-amount))
    (try! (as-contract?
      ((with-stx stx-amount))
      (try! (stx-transfer? stx-amount current-contract receiver))
    ))
    (print { action: "pay-stx-from-idle-ststxbtc", data: { stx-amount: stx-amount, receiver: receiver, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

;; Staking (bond collateral) - only uses stSTX idle (unchanged)

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

;; STX-only PoX-5 staking - explicit stSTX/stSTXbtc split (unchanged logic)

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

;; Return STX from bond staker - goes to stSTX idle only (unchanged)

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

;; Return STX from STX-only staker - explicit split (total earmark now derived)

(define-public (return-stx-from-staking-split (ststx-amount uint) (ststxbtc-amount uint))
  (let (
    (supply (unwrap-panic (contract-call? .ststxbtc-token get-total-supply)))
    (staked-ststxbtc (- (- supply (var-get stx-for-ststxbtc-escrow)) (var-get stx-for-ststxbtc-idle)))
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

;; Admin escape valve (unchanged)

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

;; Migration seed (F-2): at cutover the operator seeds this with the LEGACY
;; stSTXbtc escrow (the amount escrowed in the frozen legacy btc cores), so the
;; derived active earmark `supply - escrow` equals v1's stored active seed, and
;; the migration equality assert (SWAP-V4-PLAN.md 7.3) holds. Thereafter it is
;; maintained by the withdrawal path. Idempotent (absolute set), protocol-gated.
(define-public (set-ststxbtc-escrow (stx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set stx-for-ststxbtc-escrow stx-amount)
    (print { action: "set-ststxbtc-escrow", data: { stx-amount: stx-amount, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)
