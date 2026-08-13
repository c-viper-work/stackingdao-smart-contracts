(define-constant ERR_NOT_KEEPER (err u34001))
(define-constant ERR_ALREADY_INITIALIZED (err u34002))

(define-constant RELEASE_WINDOW_BLOCKS (if is-in-mainnet u2100 u10))

(define-data-var release-per-block uint u0)
(define-data-var release-end-block uint u0)
(define-data-var last-release-block uint u0)

(define-data-var keeper (optional principal) none)


(define-read-only (get-keeper) (var-get keeper))

(define-read-only (get-stx-balance)
  (stx-get-balance current-contract)
)

(define-read-only (get-streaming-remaining)
  (let ((end (var-get release-end-block)))
    (if (>= burn-block-height end)
      u0
      (* (- end burn-block-height) (var-get release-per-block))
    )
  )
)

(define-read-only (get-ready-to-release)
  (let (
    (end (var-get release-end-block))
    (last (var-get last-release-block))
    (effective-end (if (< burn-block-height end) burn-block-height end))
  )
    (if (> effective-end last)
      (* (- effective-end last) (var-get release-per-block))
      u0
    )
  )
)


(define-public (add-rewards (amount uint))
  (begin
    (asserts! (is-eq (some contract-caller) (var-get keeper)) ERR_NOT_KEEPER)
    (try! (stx-transfer? amount tx-sender current-contract))
    (print { action: "add-rewards", data: { amount: amount, block-height: stacks-block-height } })
    (process-rewards)
  )
)


(define-public (process-rewards)
  (let (
    (release-amount (get-ready-to-release))
    (effective-end (if (< burn-block-height (var-get release-end-block)) burn-block-height (var-get release-end-block)))
  )
    (if (> release-amount u0)
      (begin
        (try! (as-contract?
          ((with-stx release-amount))
          (try! (stx-transfer? release-amount current-contract .stx-reserve-v2))
        ))
        (var-set last-release-block effective-end)
      )
      true
    )

    (if (is-eq (some contract-caller) (var-get keeper))
      (let (
        (balance (get-stx-balance))
        (queued (get-streaming-remaining))
        (new-to-fold (if (> balance queued) (- balance queued) u0))
      )
        (if (> new-to-fold u0)
          (let (
            (new-total (+ queued new-to-fold))
            (new-end (+ burn-block-height RELEASE_WINDOW_BLOCKS))
            (new-per-block (/ new-total RELEASE_WINDOW_BLOCKS))
          )
            (var-set release-per-block new-per-block)
            (var-set release-end-block new-end)
            (var-set last-release-block burn-block-height)
          )
          true
        )
        (print { action: "process-rewards", data: {
          released: release-amount,
          folded: new-to-fold,
          per-block: (var-get release-per-block),
          end-block: (var-get release-end-block),
          block-height: stacks-block-height
        } })
      )
      (print { action: "process-rewards", data: {
        released: release-amount,
        folded: u0,
        per-block: (var-get release-per-block),
        end-block: (var-get release-end-block),
        block-height: stacks-block-height,
        keeper-only: true
      } })
    )
    (ok release-amount)
  )
)


(define-public (initialize (the-keeper principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (is-none (var-get keeper)) ERR_ALREADY_INITIALIZED)
    (var-set keeper (some the-keeper))
    (print { action: "initialize", data: { keeper: the-keeper, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-keeper (new-keeper principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set keeper (some new-keeper))
    (print { action: "set-keeper", data: { keeper: new-keeper, block-height: stacks-block-height } })
    (ok true)
  )
)
