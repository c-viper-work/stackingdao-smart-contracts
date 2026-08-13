;; @contract Rewards STX v2
;; @version 2
;;
;; Identical to rewards-stx-v1 EXCEPT it streams STX into .stx-reserve-v2 instead
;; of .stx-reserve. Part of the derived-earmark v2 stack (SWAP-V4-PLAN.md), so the
;; stSTX reward stream compounds into the same reserve the swapped LSTs are backed
;; by.
;;
;; The stSTX reward seam. rewards-v7 sends the stSTX share of sBTC to a keeper,
;; who swaps it to STX off-chain and deposits the STX here. This contract streams
;; that STX into the stx-reserve-v2 over a release window, raising the stSTX ratio
;; smoothly. Same single-active-stream anti-sandwich pattern as rewards-v7, for
;; native STX.
;;
;; No commission or split here. Commission was already taken on the sBTC in
;; rewards-v7 and the stSTX share carved out post-commission, so all this STX
;; belongs to stSTX holders. To fund, the keeper STX-transfers in.
;; process-rewards folds and crystallizes. Permissionless.
;;
;; H02: add-rewards and the fold step of process-rewards are keeper-gated to
;; prevent permissionless dust funding from extending the reward stream.
;; Crystallization (Step 1) remains permissionless.

(define-constant ERR_NOT_KEEPER (err u34001))
(define-constant ERR_ALREADY_INITIALIZED (err u34002))

;; Mainnet: 2100 burn blocks, one PoX cycle. Tests: short window.
(define-constant RELEASE_WINDOW_BLOCKS (if is-in-mainnet u2100 u10))

(define-data-var release-per-block uint u0)
(define-data-var release-end-block uint u0)
(define-data-var last-release-block uint u0)

;; Keeper: the bot that deposits swapped STX and folds it into the stream.
(define-data-var keeper (optional principal) none)

;; Getters

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

;; Fund: keeper deposits swapped STX

;; Pull `amount` STX from the keeper, then fold it into the stream.
;; H02: keeper-gated to prevent dust-funding attacks.
(define-public (add-rewards (amount uint))
  (begin
    (asserts! (is-eq (some contract-caller) (var-get keeper)) ERR_NOT_KEEPER)
    (try! (stx-transfer? amount tx-sender current-contract))
    (print { action: "add-rewards", data: { amount: amount, block-height: stacks-block-height } })
    (process-rewards)
  )
)

;; Process

;; Permissionless and idempotent. Crystallize accrued STX to the stx-reserve-v2,
;; then fold any newly arrived STX into the stream over a fresh window.
(define-public (process-rewards)
  (let (
    (release-amount (get-ready-to-release))
    (effective-end (if (< burn-block-height (var-get release-end-block)) burn-block-height (var-get release-end-block)))
  )
    ;; Step 1: crystallize first, so step 2 only sees new arrivals.
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

    ;; Step 2: fold any new STX into the stream over a fresh window.
    ;; H02: keeper-gated to prevent permissionless dust-funding stream extension.
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

;; Admin

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
