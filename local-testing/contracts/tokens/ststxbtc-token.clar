;; @contract stSTXbtc Token
;; @version 1
;;
;; Liquid staking token for STX whose yield is paid in sBTC, not a rising ratio.
;; Minted 1:1 with deposited STX, with sBTC rewards accruing per holder in
;; ststxbtc-tracking-v1. Rewards are balance-weighted, so every mint, burn, and
;; transfer notifies the tracker via refresh-wallet.
;; Decimals match STX at 6. Mint and burn gated to protocol contracts via the DAO.

(impl-trait .sip-010-trait-ft-standard.sip-010-trait)

(define-fungible-token ststxbtc)

(define-constant ERR_NOT_AUTHORIZED (err u4))

(define-data-var token-uri (optional (string-utf8 256)) none)

;; SIP-010

(define-read-only (get-total-supply) (ok (ft-get-supply ststxbtc)))
(define-read-only (get-name) (ok "Stacked STX BTC Token"))
(define-read-only (get-symbol) (ok "stSTXbtc"))
(define-read-only (get-decimals) (ok u6))
(define-read-only (get-balance (account principal)) (ok (ft-get-balance ststxbtc account)))
(define-read-only (get-token-uri) (ok (var-get token-uri)))

;; Transfer and sync the reward tracker for both parties. The tracker crystallizes
;; each holder's rewards-to-date before adopting the new balance, so a transfer
;; moves only future accrual, not accrued rewards.
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) ERR_NOT_AUTHORIZED)
    ;; H03: crystallize accrued rewards before changing balances so the tracker
    ;; distributes based on pre-transfer holdings.
    (try! (contract-call? .rewards-pox5-v1 process-rewards))
    (try! (ft-transfer? ststxbtc amount sender recipient))
    (try! (contract-call? .ststxbtc-tracking-v1 refresh-wallet sender (ft-get-balance ststxbtc sender)))
    (try! (contract-call? .ststxbtc-tracking-v1 refresh-wallet recipient (ft-get-balance ststxbtc recipient)))
    (match memo to-print (print to-print) 0x)
    (print { action: "transfer", data: { sender: tx-sender, recipient: recipient, amount: amount, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Admin

(define-public (set-token-uri (value (string-utf8 256)))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set token-uri (some value))
    (print { action: "set-token-uri", data: { value: value, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Mint and Burn

(define-public (mint-for-protocol (amount uint) (recipient principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    ;; H03: crystallize accrued rewards before minting so the new holder does
    ;; not capture rewards that accrued before their deposit.
    (try! (contract-call? .rewards-pox5-v1 process-rewards))
    (try! (ft-mint? ststxbtc amount recipient))
    (try! (contract-call? .ststxbtc-tracking-v1 refresh-wallet recipient (ft-get-balance ststxbtc recipient)))
    (print { action: "mint-for-protocol", data: { recipient: recipient, amount: amount, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (burn-for-protocol (amount uint) (sender principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    ;; H03: crystallize accrued rewards before burning so exiting holders
    ;; receive everything they earned.
    (try! (contract-call? .rewards-pox5-v1 process-rewards))
    (try! (ft-burn? ststxbtc amount sender))
    (try! (contract-call? .ststxbtc-tracking-v1 refresh-wallet sender (ft-get-balance ststxbtc sender)))
    (print { action: "burn-for-protocol", data: { sender: sender, amount: amount, block-height: stacks-block-height } })
    (ok true)
  )
)
