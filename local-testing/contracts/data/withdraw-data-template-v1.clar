;; @contract Withdraw Data (template)
;; @version 1
;;
;; TEMPLATE: shared scheduled-withdrawal storage (cooldown + per-NFT record),
;; deployed under three names (one per product). Generic field names: asset-amount
;; (the withdrawal asset: sBTC / STX) and token-amount (the LST burned: stBTC /
;; stSTX / stSTXbtc). stSTXbtc sets both equal (1:1). D7 - the one tractable
;; structural dedup: unlike the cores this references no divergent peers.

;; Minimum cooldown: one PoX-5 reward cycle worth of burn blocks, so deployed
;; STX has time to unwind before the NFT matures. The cooldown controls NFT
;; maturity, not guaranteed reserve liquidity (L-07).

(define-constant ERR_COOLDOWN_TOO_SHORT (err u24001))

;; Variables

(define-data-var withdraw-cooldown-blocks uint (if is-in-mainnet u2100 u10))

;; Maps

(define-map withdrawals-by-nft uint {
  unlock-burn-height: uint,
  asset-amount: uint,
  token-amount: uint,
  withdraw-fee: uint,
})

;; Cooldown

(define-read-only (get-withdraw-cooldown-blocks)
  (var-get withdraw-cooldown-blocks)
)

(define-public (set-withdraw-cooldown-blocks (blocks uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    ;; L-07: enforce minimum so cooldown aligns with PoX-5 liquidity unwind.
    (asserts! (>= blocks (if is-in-mainnet u2100 u10)) ERR_COOLDOWN_TOO_SHORT)
    (var-set withdraw-cooldown-blocks blocks)
    (print { action: "set-withdraw-cooldown-blocks", data: { blocks: blocks, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-read-only (get-withdraw-unlock-burn-height)
  (+ burn-block-height (var-get withdraw-cooldown-blocks))
)

;; Withdrawal NFT storage

(define-read-only (get-withdrawals-by-nft (nft-id uint))
  (default-to
    { unlock-burn-height: u0, asset-amount: u0, token-amount: u0, withdraw-fee: u0 }
    (map-get? withdrawals-by-nft nft-id)
  )
)

(define-public (set-withdrawals-by-nft (nft-id uint) (asset-amount uint) (token-amount uint) (unlock-burn-height uint) (withdraw-fee uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (map-set withdrawals-by-nft nft-id {
      unlock-burn-height: unlock-burn-height,
      asset-amount: asset-amount,
      token-amount: token-amount,
      withdraw-fee: withdraw-fee,
    })
    (print { action: "set-withdrawals-by-nft", data: { nft-id: nft-id, asset-amount: asset-amount, token-amount: token-amount, unlock-burn-height: unlock-burn-height, withdraw-fee: withdraw-fee, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (delete-withdrawals-by-nft (nft-id uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))

    (map-delete withdrawals-by-nft nft-id)
    (print { action: "delete-withdrawals-by-nft", data: { nft-id: nft-id, block-height: stacks-block-height } })
    (ok true)
  )
)
