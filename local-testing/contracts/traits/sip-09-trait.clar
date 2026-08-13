;; @contract SIP-009 (NFT) trait mirror
;; @version 1
;;
;; Standard SIP-009 non-fungible-token trait.
;; Source: https://github.com/stacksgov/sips/blob/main/sips/sip-009/sip-009-nft-standard.md

(define-trait sip-09-trait
  (
    ;; Last token ID, limited to uint range
    (get-last-token-id () (response uint uint))

    ;; URI for token metadata
    (get-token-uri (uint) (response (optional (string-ascii 256)) uint))

    ;; Owner of a given token ID
    (get-owner (uint) (response (optional principal) uint))

    ;; Transfer from the sender to a new principal
    (transfer (uint principal principal) (response bool uint))
  )
)
