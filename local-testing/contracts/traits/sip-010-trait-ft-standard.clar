;; @contract SIP-010 (FT) trait mirror
;; @version 1
;;
;; Standard SIP-010 fungible-token trait.
;; Source: https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md

(define-trait sip-010-trait
  (
    ;; Transfer from the caller to a new principal
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))

    ;; Human-readable token name
    (get-name () (response (string-ascii 32) uint))

    ;; Ticker symbol, empty if none
    (get-symbol () (response (string-ascii 32) uint))

    ;; Number of decimals. 6 means 1_000_000 represents 1 token.
    (get-decimals () (response uint uint))

    ;; Balance of the passed principal
    (get-balance (principal) (response uint uint))

    ;; Current total supply
    (get-total-supply () (response uint uint))

    ;; Optional URI for token metadata
    (get-token-uri () (response (optional (string-utf8 256)) uint))
  )
)
