(define-constant ERR_POOL_OWNER_SHARE (err u21001))
(define-constant ERR_MAX_COMMISSION (err u21002))

(define-constant MAX_COMMISSION u4000)
(define-constant DENOMINATOR_BPS u10000)


(define-data-var pool-commission uint u1000)

(define-data-var pool-owner-receiver (optional principal) none)

(define-data-var pool-owner-share uint u7500)


(define-read-only (get-pool-commission) (var-get pool-commission))
(define-read-only (get-pool-owner-receiver) (var-get pool-owner-receiver))
(define-read-only (get-pool-owner-share) (var-get pool-owner-share))


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
