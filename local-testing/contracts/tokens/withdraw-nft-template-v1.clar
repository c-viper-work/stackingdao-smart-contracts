;; @contract Withdraw NFT (template)
;; @version 1
;;
;; TEMPLATE: one canonical withdrawal-receipt NFT, deployed under three names
;; (stbtc-withdraw-nft, ststx-withdraw-nft-v3, ststxbtc-withdraw-nft-v2). The three
;; products are byte-identical here, so a single source serves all instances;
;; each deployed instance owns its own `withdraw-nft` asset and is called by its
;; deployed contract name.
;;
;; Receipt for an initiated withdrawal. When a user starts a scheduled withdrawal
;; their LST is escrowed and this NFT is minted as a claim, then burned on the
;; final withdrawal.

(impl-trait .sip-09-trait.sip-09-trait)

(define-non-fungible-token withdraw-nft uint)

;; Constants

(define-constant ERR_NOT_AUTHORIZED (err u15001))
(define-constant ERR_GET_OWNER (err u15002))

;; Variables

;; Next id to mint. mint-for-protocol mints the current value then increments.
(define-data-var last-id uint u1)
;; None until set post-deploy via set-token-uri.
(define-data-var token-uri (optional (string-ascii 256)) none)

;; SIP-009

;; SIP-009: the last minted token id (0 before any mint). Cores bind to
;; mint-for-protocol's return value for the id just minted, so this is no longer
;; used to predict the next id (C7).
(define-read-only (get-last-token-id)
  (let ((next (var-get last-id)))
    (ok (if (> next u1) (- next u1) u0))
  )
)

(define-read-only (get-token-uri (token-id uint))
  (if (is-some (nft-get-owner? withdraw-nft token-id))
    (ok (var-get token-uri))
    (ok none)
  )
)

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? withdraw-nft token-id))
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR_NOT_AUTHORIZED)
    (try! (nft-transfer? withdraw-nft token-id sender recipient))
    (print { action: "transfer", data: { token-id: token-id, sender: sender, recipient: recipient, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Admin

(define-public (set-token-uri (value (string-ascii 256)))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (var-set token-uri (some value))
    (print { action: "set-token-uri", data: { value: value, block-height: stacks-block-height } })
    (ok true)
  )
)

;; Mint / Burn

(define-public (mint-for-protocol (recipient principal))
  (let (
    (id (var-get last-id))
  )
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (try! (nft-mint? withdraw-nft id recipient))
    (var-set last-id (+ id u1))
    (print { action: "mint-for-protocol", data: { token-id: id, recipient: recipient, block-height: stacks-block-height } })
    (ok id)
  )
)

(define-public (burn-for-protocol (token-id uint))
  (let (
    (owner (unwrap! (nft-get-owner? withdraw-nft token-id) ERR_GET_OWNER))
  )
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (try! (nft-burn? withdraw-nft token-id owner))
    (print { action: "burn-for-protocol", data: { token-id: token-id, owner: owner, block-height: stacks-block-height } })
    (ok true)
  )
)
