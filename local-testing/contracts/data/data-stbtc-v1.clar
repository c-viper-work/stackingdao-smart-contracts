;; @contract Data stBTC (ratio only)
;; @version 1
;;
;; sBTC-per-stBTC ratio. The cooldown and withdrawal-NFT storage moved to the
;; shared withdraw-data-template (D7).
;;
;; C3 audit fix: the ratio subtracts pending scheduled-withdrawal amounts from
;; both the backing (sBTC reserved for withdrawals) and the supply (escrowed
;; stBTC not yet burned). This prevents new deposits during a pending-withdrawal
;; cooldown from minting at a diluted ratio and capturing the ratio jump when
;; the withdrawal finalizes.

(define-constant DENOMINATOR_8 u100000000)

;; Total stBTC escrowed in core contracts pending scheduled withdrawal finalization.
;; Set by the core on init-withdraw (+) and withdraw (-).
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

;; sBTC per stBTC (active ratio: excludes pending withdrawals from both sides)

(define-private (compute-ratio (round-up bool))
  (let (
    (total-sbtc (contract-call? .stbtc-reserve get-total-sbtc))
    (reserved (contract-call? .stbtc-reserve get-sbtc-for-withdrawals))
    ;; C3: subtract reserved sBTC from the backing (it belongs to withdrawers,
    ;; not active holders)
    (active-backing (if (> total-sbtc reserved) (- total-sbtc reserved) u0))
    (stbtc-supply (unwrap-panic (contract-call? .stbtc-token get-total-supply)))
    ;; C3: subtract escrowed stBTC from the supply (it's pending burn)
    (active-supply (- stbtc-supply (var-get pending-shares)))
    (raw-num (* active-backing DENOMINATOR_8))
  )
    (if (is-eq active-supply u0)
      DENOMINATOR_8
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
(define-read-only (get-sbtc-per-stbtc)
  (compute-ratio false)
)

;; Rounds up - use when the ratio is a denominator (deposit). Prevents
;; overminting shares from a floor-rounded ratio (M-07).
(define-read-only (get-sbtc-per-stbtc-up)
  (compute-ratio true)
)
