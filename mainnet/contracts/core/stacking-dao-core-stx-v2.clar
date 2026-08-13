(define-constant ERR_SHUTDOWN (err u26001))
(define-constant ERR_WITHDRAW_LOCKED (err u26002))
(define-constant ERR_WITHDRAW_NOT_NFT_OWNER (err u26003))
(define-constant ERR_GET_OWNER (err u26005))
(define-constant ERR_INSUFFICIENT_IDLE (err u26006))
(define-constant ERR_MIN_SHARES (err u26007))
(define-constant ERR_INVALID_FEE (err u26008))

(define-constant DEAD_SHARES u1000)

(define-constant DENOMINATOR_6 u1000000)
(define-constant DENOMINATOR_BPS u10000)






(define-data-var shutdown-deposits bool true)
(define-data-var shutdown-init-withdraw bool true)
(define-data-var shutdown-withdraw bool false)
(define-data-var shutdown-withdraw-idle bool false)
(define-data-var withdraw-fee uint u0)
(define-data-var withdraw-idle-fee uint u100)
(define-map fee-exempt principal bool)


(define-read-only (get-shutdown-deposits) (var-get shutdown-deposits))
(define-read-only (get-shutdown-init-withdraw) (var-get shutdown-init-withdraw))
(define-read-only (get-shutdown-withdraw) (var-get shutdown-withdraw))
(define-read-only (get-shutdown-withdraw-idle) (var-get shutdown-withdraw-idle))
(define-read-only (get-withdraw-fee) (var-get withdraw-fee))
(define-read-only (get-withdraw-idle-fee) (var-get withdraw-idle-fee))
(define-read-only (is-fee-exempt (who principal))
  (default-to false (map-get? fee-exempt who))
)


(define-public (deposit (stx-amount uint) (min-shares-out uint))
  (begin
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (not (var-get shutdown-deposits)) ERR_SHUTDOWN)
    (try! (contract-call? .rewards-stx-v2 process-rewards))

    (let (
      (current-supply (unwrap-panic (contract-call? .ststx-token get-total-supply)))
      (is-first (is-eq current-supply u0))
      (ststx-amount
        (if is-first
          (- stx-amount DEAD_SHARES)
          (/ (* stx-amount DENOMINATOR_6)
             (contract-call? .data-stx-v2 get-stx-per-ststx-up))))
    )
      (asserts! (>= ststx-amount min-shares-out) ERR_MIN_SHARES)

      (if is-first
        (try! (contract-call? .ststx-token mint-for-protocol DEAD_SHARES current-contract))
        true)

      (try! (stx-transfer? stx-amount tx-sender .stx-reserve-v2))
      (try! (contract-call? .ststx-token mint-for-protocol ststx-amount tx-sender))

      (print { action: "deposit", data: { stacker: tx-sender, stx-amount: stx-amount, ststx-amount: ststx-amount, block-height: stacks-block-height } })
      (ok ststx-amount)
    )
  )
)

(define-public (init-withdraw (ststx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (not (var-get shutdown-init-withdraw)) ERR_SHUTDOWN)
    (try! (contract-call? .rewards-stx-v2 process-rewards))

    (let (
      (sender tx-sender)
      (ratio (contract-call? .data-stx-v2 get-stx-per-ststx))
      (stx-amount (/ (* ststx-amount ratio) DENOMINATOR_6))
      (stx-fee (/ (* (var-get withdraw-fee) stx-amount) DENOMINATOR_BPS))
      (stx-user (- stx-amount stx-fee))
      (unlock-burn-height (contract-call? .withdraw-data-stx-v2 get-withdraw-unlock-burn-height))
    )
      (let ((nft-id (unwrap-panic (contract-call? .ststx-withdraw-nft-v4 mint-for-protocol sender))))
        (try! (contract-call? .withdraw-data-stx-v2 set-withdrawals-by-nft nft-id stx-amount ststx-amount unlock-burn-height (var-get withdraw-fee)))

        (try! (contract-call? .stx-reserve-v2 lock-stx-for-withdrawal stx-user))
        (try! (contract-call? .ststx-token transfer ststx-amount sender current-contract none))

        (print { action: "init-withdraw", data: { stacker: sender, nft-id: nft-id, stx-amount: stx-amount, stx-user: stx-user, stx-fee: stx-fee, ststx-amount: ststx-amount, unlock-burn-height: unlock-burn-height, block-height: stacks-block-height } })
        (ok nft-id)
      )
    )
  )
)

(define-public (withdraw (nft-id uint))
  (let (
    (receiver tx-sender)
    (withdrawal-entry (contract-call? .withdraw-data-stx-v2 get-withdrawals-by-nft nft-id))
    (unlock-burn-height (get unlock-burn-height withdrawal-entry))
    (stx-amount (get asset-amount withdrawal-entry))
    (ststx-amount (get token-amount withdrawal-entry))
    (stx-fee (/ (* (get withdraw-fee withdrawal-entry) stx-amount) DENOMINATOR_BPS))
    (stx-user (- stx-amount stx-fee))
    (nft-owner (unwrap! (unwrap! (contract-call? .ststx-withdraw-nft-v4 get-owner nft-id) ERR_GET_OWNER) ERR_GET_OWNER))
  )
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (not (var-get shutdown-withdraw)) ERR_SHUTDOWN)
    (asserts! (is-eq nft-owner tx-sender) ERR_WITHDRAW_NOT_NFT_OWNER)
    (asserts! (>= burn-block-height unlock-burn-height) ERR_WITHDRAW_LOCKED)

    (try! (contract-call? .withdraw-data-stx-v2 delete-withdrawals-by-nft nft-id))

    (try! (contract-call? .stx-reserve-v2 request-stx-for-withdrawal stx-user receiver))
    (try! (contract-call? .ststx-token burn-for-protocol ststx-amount current-contract))
    (try! (contract-call? .ststx-withdraw-nft-v4 burn-for-protocol nft-id))

    (print { action: "withdraw", data: { stacker: receiver, nft-id: nft-id, stx-amount: stx-amount, stx-user: stx-user, stx-fee: stx-fee, ststx-amount: ststx-amount, block-height: stacks-block-height } })
    (ok { stx-user: stx-user, stx-fee: stx-fee })
  )
)

(define-public (withdraw-idle (ststx-amount uint))
  (begin
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (not (var-get shutdown-withdraw-idle)) ERR_SHUTDOWN)
    (try! (contract-call? .rewards-stx-v2 process-rewards))

    (let (
      (receiver tx-sender)
      (ratio (contract-call? .data-stx-v2 get-stx-per-ststx))
      (stx-amount (/ (* ststx-amount ratio) DENOMINATOR_6))
      (stx-fee (if (is-fee-exempt tx-sender) u0 (/ (* (var-get withdraw-idle-fee) stx-amount) DENOMINATOR_BPS)))
      (stx-user (- stx-amount stx-fee))
      (available (contract-call? .stx-reserve-v2 get-stx-available))
    )
      (asserts! (>= available stx-user) ERR_INSUFFICIENT_IDLE)

      (try! (contract-call? .ststx-token burn-for-protocol ststx-amount receiver))
      (try! (contract-call? .stx-reserve-v2 pay-stx-from-idle stx-user receiver))

      (print { action: "withdraw-idle", data: { stacker: receiver, stx-amount: stx-amount, stx-user: stx-user, stx-fee: stx-fee, ststx-amount: ststx-amount, block-height: stacks-block-height } })
      (ok { stx-user: stx-user, stx-fee: stx-fee })
    )
  )
)


(define-public (set-shutdown-deposits (shutdown bool))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set shutdown-deposits shutdown)
    (print { action: "set-shutdown-deposits", data: { shutdown: shutdown, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-shutdown-init-withdraw (shutdown bool))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set shutdown-init-withdraw shutdown)
    (print { action: "set-shutdown-init-withdraw", data: { shutdown: shutdown, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-shutdown-withdraw (shutdown bool))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set shutdown-withdraw shutdown)
    (print { action: "set-shutdown-withdraw", data: { shutdown: shutdown, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-shutdown-withdraw-idle (shutdown bool))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set shutdown-withdraw-idle shutdown)
    (print { action: "set-shutdown-withdraw-idle", data: { shutdown: shutdown, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-withdraw-fee (fee uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (< fee DENOMINATOR_BPS) ERR_INVALID_FEE)
    (var-set withdraw-fee fee)
    (print { action: "set-withdraw-fee", data: { fee: fee, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-withdraw-idle-fee (fee uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (< fee DENOMINATOR_BPS) ERR_INVALID_FEE)
    (var-set withdraw-idle-fee fee)
    (print { action: "set-withdraw-idle-fee", data: { fee: fee, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-fee-exempt (who principal) (exempt bool))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (map-set fee-exempt who exempt)
    (ok true)
  )
)
