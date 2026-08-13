;; @contract Data Pools stBTC v1
;; @version 1
;;
;; Per-pool commission configuration for the rewards-v7 split. rewards-v7 is a
;; single pool, so the bps are plain vars rather than per-principal maps.
;;
;; Two layers of split, in two contracts:
;;   This contract holds the top-level skim: `pool-commission`, total fee bps on
;;     the incoming reward, and `pool-owner-share`, bps of that fee going direct
;;     to a treasury principal.
;;   The remainder, commission-left, is routed to commission-sbtc-v1, which has
;;     its own bps for the secondary split between signers and sDAO stakers.
;;
;; Defaults: 10% total, 75% of that to treasury = 7.5% effective. DAO can
;; rebalance any time.

(define-constant ERR_POOL_OWNER_SHARE (err u21001))
(define-constant ERR_MAX_COMMISSION (err u21002))

(define-constant MAX_COMMISSION u4000) ;; 40% in bps
(define-constant DENOMINATOR_BPS u10000)

;; Variables

;; Total commission bps applied to every incoming reward batch.
(define-data-var pool-commission uint u1000) ;; 10% default

;; Principal receiving the pool-owner slice. `none` until set-pool-owner-receiver
;; wires the treasury principal post-deploy; rewards-v7 reverts if a pool-owner
;; slice would be routed before it is set (never silently sent to the deployer).
(define-data-var pool-owner-receiver (optional principal) none)

;; Bps of the commission going to pool-owner-receiver. Remainder is
;; commission-left, routed to commission-sbtc-v1 for the secondary split.
(define-data-var pool-owner-share uint u7500) ;; 75% default

;; Getters

(define-read-only (get-pool-commission) (var-get pool-commission))
(define-read-only (get-pool-owner-receiver) (var-get pool-owner-receiver))
(define-read-only (get-pool-owner-share) (var-get pool-owner-share))

;; Setters (DAO-gated)

(define-public (set-pool-commission (commission uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (<= commission MAX_COMMISSION) ERR_MAX_COMMISSION)
    (var-set pool-commission commission)
    (print { action: "set-pool-commission", data: { commission: commission, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-pool-owner-receiver (receiver principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set pool-owner-receiver (some receiver))
    (print { action: "set-pool-owner-receiver", data: { receiver: receiver, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-pool-owner-share (share uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (<= share DENOMINATOR_BPS) ERR_POOL_OWNER_SHARE)
    (var-set pool-owner-share share)
    (print { action: "set-pool-owner-share", data: { share: share, block-height: stacks-block-height } })
    (ok true)
  )
)
