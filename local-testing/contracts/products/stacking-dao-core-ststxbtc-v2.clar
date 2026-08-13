;; @contract Stacking DAO Core stSTXbtc
;; @version 2
;;
;; Identical to stacking-dao-core-ststxbtc-v1 EXCEPT it points at the
;; derived-earmark .stx-reserve-v2. Part of the v2 stack (SWAP-V4-PLAN.md).
;; The deposit still calls lock-stx-for-ststxbtc, which in reserve-v2 bumps only
;; the IDLE sub-counter (the total earmark is derived from stSTXbtc supply, which
;; this core's mint has already raised). No other logic change.
;;
;; User entry point for stSTXbtc. Deposit STX to mint stSTXbtc 1:1, earn sBTC
;; yield claimed from ststxbtc-tracking-v1, withdraw STX 1:1. The STX shares the
;; reserve with stSTX, and data-stx-v1 carves stSTXbtc out of the stSTX ratio.
;;
;; Three withdrawal paths: deposit, scheduled cooldown via a withdraw NFT
;; (init-withdraw then withdraw), and instant withdraw-idle with a fee.
;; ststxbtc-token's mint and burn refresh the tracker, so this core never does.

(define-constant ERR_SHUTDOWN (err u27001))
(define-constant ERR_WITHDRAW_LOCKED (err u27002))
(define-constant ERR_WITHDRAW_NOT_NFT_OWNER (err u27003))
;; u27004 reserved
(define-constant ERR_GET_OWNER (err u27005))
(define-constant ERR_INSUFFICIENT_IDLE (err u27006))
(define-constant ERR_MIN_SHARES (err u27007))
(define-constant ERR_INVALID_FEE (err u27008))

(define-constant DENOMINATOR_BPS u10000)

(define-data-var shutdown-deposits bool false)
(define-data-var shutdown-init-withdraw bool false)
(define-data-var shutdown-withdraw bool false)
(define-data-var shutdown-withdraw-idle bool false)
(define-data-var withdraw-fee uint u0) ;; bps, 0%
(define-data-var withdraw-idle-fee uint u100) ;; bps, 1%
;; M-10: withdrawal fees are sent to treasury instead of inflating stSTX ratio.
(define-data-var treasury principal tx-sender)
(define-map fee-exempt principal bool)

(define-read-only (get-shutdown-deposits) (var-get shutdown-deposits))
(define-read-only (get-shutdown-init-withdraw) (var-get shutdown-init-withdraw))
(define-read-only (get-shutdown-withdraw) (var-get shutdown-withdraw))
(define-read-only (get-shutdown-withdraw-idle) (var-get shutdown-withdraw-idle))
(define-read-only (get-withdraw-fee) (var-get withdraw-fee))
(define-read-only (get-withdraw-idle-fee) (var-get withdraw-idle-fee))
(define-read-only (get-treasury) (var-get treasury))
(define-read-only (is-fee-exempt (who principal))
  (default-to false (map-get? fee-exempt who))
)

;; User

;; Deposit STX, receive stSTXbtc 1:1. min-shares-out for interface consistency
;; with the ratio-based cores (H01).
(define-public (deposit (stx-amount uint) (min-shares-out uint))
  (begin
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (not (var-get shutdown-deposits)) ERR_SHUTDOWN)
    (asserts! (>= stx-amount min-shares-out) ERR_MIN_SHARES)

    (try! (stx-transfer? stx-amount tx-sender .stx-reserve-v2))
    (try! (contract-call? .ststxbtc-token mint-for-protocol stx-amount tx-sender))
    ;; earmark the STX 1:1 for stSTXbtc so it is never bonded or spent by stSTX (D2/D5)
    (try! (contract-call? .stx-reserve-v2 lock-stx-for-ststxbtc stx-amount))

    (print { action: "deposit", data: { stacker: tx-sender, stx-amount: stx-amount, ststxbtc-amount: stx-amount, block-height: stacks-block-height } })
    (ok stx-amount)
  )
)

;; Start a scheduled withdrawal. Escrows stSTXbtc into this contract, mints a
;; withdraw NFT, and reserves the matching STX. The escrow is excluded in the
;; tracker so escrowed tokens stop earning. 1:1, so STX equals the stSTXbtc.
(define-public (init-withdraw (ststxbtc-amount uint))
  (let (
    (sender tx-sender)
    (unlock-burn-height (contract-call? .ststxbtc-data-v1 get-withdraw-unlock-burn-height))
  )
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (not (var-get shutdown-init-withdraw)) ERR_SHUTDOWN)

    ;; Mint the receipt NFT first and bind to its returned id (C7), instead of
    ;; predicting via get-last-token-id.
    (let ((nft-id (unwrap-panic (contract-call? .ststxbtc-withdraw-nft-v2 mint-for-protocol sender))))
      (try! (contract-call? .ststxbtc-data-v1 set-withdrawals-by-nft nft-id ststxbtc-amount ststxbtc-amount unlock-burn-height (var-get withdraw-fee)))
      ;; H-04: lock into the stSTXbtc-specific withdrawal bucket. This also
      ;; decreases stx-for-ststxbtc-idle (not total, since stSTXbtc is only
      ;; escrowed, not yet burned).
      (try! (contract-call? .stx-reserve-v2 lock-stx-for-withdrawal-ststxbtc ststxbtc-amount))
      (try! (contract-call? .ststxbtc-token transfer ststxbtc-amount sender current-contract none))

      (print { action: "init-withdraw", data: { stacker: sender, nft-id: nft-id, stx-amount: ststxbtc-amount, ststxbtc-amount: ststxbtc-amount, unlock-burn-height: unlock-burn-height, block-height: stacks-block-height } })
      (ok nft-id)
    )
  )
)

;; Finish a scheduled withdrawal after the cooldown. Burns the escrowed stSTXbtc
;; and the NFT, pays STX 1:1 from the reserve less an optional fee.
(define-public (withdraw (nft-id uint))
  (let (
    (receiver tx-sender)
    (entry (contract-call? .ststxbtc-data-v1 get-withdrawals-by-nft nft-id))
    (unlock-burn-height (get unlock-burn-height entry))
    (stx-amount (get asset-amount entry))
    (ststxbtc-amount (get token-amount entry))
    (stx-fee (/ (* (get withdraw-fee entry) stx-amount) DENOMINATOR_BPS))
    (stx-user (- stx-amount stx-fee))
    (nft-owner (unwrap! (unwrap! (contract-call? .ststxbtc-withdraw-nft-v2 get-owner nft-id) ERR_GET_OWNER) ERR_GET_OWNER))
  )
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (not (var-get shutdown-withdraw)) ERR_SHUTDOWN)
    (asserts! (is-eq nft-owner tx-sender) ERR_WITHDRAW_NOT_NFT_OWNER)
    (asserts! (>= burn-block-height unlock-burn-height) ERR_WITHDRAW_LOCKED)

    (try! (contract-call? .ststxbtc-data-v1 delete-withdrawals-by-nft nft-id))

    (if (> stx-fee u0)
      (try! (contract-call? .stx-reserve-v2 request-stx-for-withdrawal-ststxbtc stx-fee (var-get treasury)))
      u0
    )
    (try! (contract-call? .stx-reserve-v2 request-stx-for-withdrawal-ststxbtc stx-user receiver))
    (try! (contract-call? .ststxbtc-token burn-for-protocol ststxbtc-amount current-contract))
    (try! (contract-call? .ststxbtc-withdraw-nft-v2 burn-for-protocol nft-id))

    (print { action: "withdraw", data: { stacker: receiver, nft-id: nft-id, stx-user: stx-user, stx-fee: stx-fee, ststxbtc-amount: ststxbtc-amount, block-height: stacks-block-height } })
    (ok { stx-user: stx-user, stx-fee: stx-fee })
  )
)

;; Instant withdrawal from idle reserve, 1:1 minus fee. The fee is routed to
;; the DAO treasury instead of inflating the stSTX ratio (M-10).
(define-public (withdraw-idle (ststxbtc-amount uint))
  (let (
    (receiver tx-sender)
    (stx-fee (if (is-fee-exempt tx-sender) u0 (/ (* (var-get withdraw-idle-fee) ststxbtc-amount) DENOMINATOR_BPS)))
    (stx-user (- ststxbtc-amount stx-fee))
  )
    (try! (contract-call? .dao check-is-enabled))
    (asserts! (not (var-get shutdown-withdraw-idle)) ERR_SHUTDOWN)

    ;; Burn full stSTXbtc. Pay fee and user from stSTXbtc idle via
    ;; pay-stx-from-idle-ststxbtc which decreases the earmark.
    (try! (contract-call? .ststxbtc-token burn-for-protocol ststxbtc-amount receiver))
    (if (> stx-fee u0)
      (try! (contract-call? .stx-reserve-v2 pay-stx-from-idle-ststxbtc stx-fee (var-get treasury)))
      u0
    )
    (try! (contract-call? .stx-reserve-v2 pay-stx-from-idle-ststxbtc stx-user receiver))

    (print { action: "withdraw-idle", data: { stacker: receiver, stx-user: stx-user, stx-fee: stx-fee, ststxbtc-amount: ststxbtc-amount, block-height: stacks-block-height } })
    (ok { stx-user: stx-user, stx-fee: stx-fee })
  )
)

;; Admin

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

(define-public (set-withdraw-fee (fee uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (< fee DENOMINATOR_BPS) ERR_INVALID_FEE)
    (var-set withdraw-fee fee)
    (print { action: "set-withdraw-fee", data: { fee: fee, block-height: stacks-block-height } })
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

(define-public (set-withdraw-idle-fee (fee uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (< fee DENOMINATOR_BPS) ERR_INVALID_FEE)
    (var-set withdraw-idle-fee fee)
    (print { action: "set-withdraw-idle-fee", data: { fee: fee, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-treasury (new-treasury principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set treasury new-treasury)
    (print { action: "set-treasury", data: { new-treasury: new-treasury, block-height: stacks-block-height } })
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
