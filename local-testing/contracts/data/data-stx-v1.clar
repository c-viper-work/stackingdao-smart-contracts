;; @contract Data stSTX (ratio only)
;; @version 1
;;
;; STX-per-stSTX ratio. The cooldown and withdrawal-NFT storage moved to the
;; shared withdraw-data-template (D7). Reads the stx-reserve backing directly
;; (stx-for-ststxbtc earmark, bet 3) - no cross-product token import.
;;
;; C3 audit fix: same as data-stbtc-v1 - subtracts pending scheduled-withdrawal
;; amounts from both the backing and the supply.

(define-constant DENOMINATOR_6 u1000000)

;; Total stSTX escrowed pending scheduled withdrawal finalization.
(define-data-var pending-shares uint u0)

(define-read-only (get-pending-shares)
  (var-get pending-shares)
)

(define-public (add-pending-shares (amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set pending-shares (+ (var-get pending-shares) amount))
    (ok true)
  )
)

(define-public (remove-pending-shares (amount uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set pending-shares (- (var-get pending-shares) amount))
    (ok true)
  )
)

;; STX per stSTX (active ratio: excludes pending withdrawals from both sides)

(define-private (compute-ratio (round-up bool))
  (let (
    (total-stx (contract-call? .stx-reserve get-total-stx))
    (stx-for-ststxbtc (contract-call? .stx-reserve get-stx-for-ststxbtc))
    (stx-for-withdrawals (contract-call? .stx-reserve get-stx-for-withdrawals))
    ;; C3: subtract both the stSTXbtc earmark and the pending-withdrawal reserve
    (claimed (+ stx-for-ststxbtc stx-for-withdrawals))
    (active-backing (if (> total-stx claimed) (- total-stx claimed) u0))
    (ststx-supply (unwrap-panic (contract-call? .ststx-token get-total-supply)))
    ;; C3: subtract escrowed stSTX from the supply
    (active-supply (- ststx-supply (var-get pending-shares)))
    (raw-num (* active-backing DENOMINATOR_6))
  )
    (if (is-eq active-supply u0)
      DENOMINATOR_6
      (if round-up
        (if (is-eq (mod raw-num active-supply) u0)
          (/ raw-num active-supply)
          (+ (/ raw-num active-supply) u1)
        )
        (/ raw-num active-supply)
      )
    )
  )
)

;; Rounds down - use when the ratio is a multiplier (withdraw paths).
(define-read-only (get-stx-per-ststx)
  (compute-ratio false)
)

;; Rounds up - use when the ratio is a denominator (deposit). Prevents
;; overminting shares from a floor-rounded ratio (M-07).
(define-read-only (get-stx-per-ststx-up)
  (compute-ratio true)
)
