;; @contract stBTC Token
;; @version 1
;;
;; Liquid staking token for sBTC. 1 stBTC is a ratio-bearing claim on a growing
;; amount of sBTC as rewards accrue. Decimals match sBTC at 8, so stBTC maps 1:1
;; to sBTC at the genesis ratio. Mint and burn are gated to protocol contracts.

(impl-trait .sip-010-trait-ft-standard.sip-010-trait)

(define-fungible-token stbtc)

(define-constant ERR_NOT_AUTHORIZED (err u4))

(define-data-var token-uri (optional (string-utf8 256)) none)

;; SIP-010

(define-read-only (get-total-supply) (ok (ft-get-supply stbtc)))
(define-read-only (get-name) (ok "Stacked BTC Token"))
(define-read-only (get-symbol) (ok "stBTC"))
(define-read-only (get-decimals) (ok u8))
(define-read-only (get-balance (account principal)) (ok (ft-get-balance stbtc account)))
(define-read-only (get-token-uri) (ok (var-get token-uri)))

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) ERR_NOT_AUTHORIZED)
    (try! (ft-transfer? stbtc amount sender recipient))

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

;; Mint / Burn

(define-public (mint-for-protocol (amount uint) (recipient principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (try! (ft-mint? stbtc amount recipient))
    (print { action: "mint-for-protocol", data: { recipient: recipient, amount: amount, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (burn-for-protocol (amount uint) (sender principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (try! (ft-burn? stbtc amount sender))
    (print { action: "burn-for-protocol", data: { sender: sender, amount: amount, block-height: stacks-block-height } })
    (ok true)
  )
)

;; SIP convenience burn. A holder can burn their own stBTC. This forfeits their
;; sBTC backing and raises the ratio for remaining holders.
(define-public (burn (amount uint))
  (begin
    (try! (ft-burn? stbtc amount tx-sender))
    (print { action: "burn", data: { sender: tx-sender, amount: amount, block-height: stacks-block-height } })
    (ok true)
  )
)
