;; @contract swap-ststx-ststxbtc-v4 -- reserve-independent, cap-free re-label
;; @version 4
;;
;; One-click stSTX <-> stSTXbtc switch on the PoX-5 architecture, built for
;; MASSIVE atomically-FREE size (Zest collateral liquidations), and -- the whole
;; point -- **independent of the reserve**.
;;
;; Mechanism: a swap is a backing RE-LABEL. Both tokens are claims on ONE reserve;
;; swapping value V moves V of derived backing from the stSTX side to the stSTXbtc
;; side (or back), no STX moves, ratio preserved at any size. Because stx-reserve-v2
;; DERIVES the stSTXbtc earmark from stSTXbtc total supply, this contract only has
;; to burn the source token and mint the target token -- the earmark moves
;; implicitly. It makes ZERO contract-call to any reserve function.
;;
;;   stSTX   -> stSTXbtc:  burn V/r stSTX  +  mint V stSTXbtc      (r = STX-per-stSTX)
;;   stSTXbtc-> stSTX:     burn V stSTXbtc +  mint V/r stSTX      (V = 1:1 STX value)
;;
;; No custody: the burn is taken from the caller directly (same pattern as the
;; cores' withdraw-idle) and the mint goes straight to the caller -- the wrapper
;; never holds source or STX. No as-contract?, no fee leg, no idle dependence.
;;
;; The only deps: the two tokens (mint/burn), .data-stx-v2 (ratio read) and
;; .rewards-stx-v2 (crystallize, so the ratio is stable intra-tx).
;;
;; Supersedes the v3 idle-capped round-trip for large sizes. v3 stays as the
;; retail small-size switch.
;;
;; Spec: sdao-deployment/SWAP-V4-PLAN.md and upgrade-nexus/11-massive-swap-redesign.md.
;; Deploy note: dev copy references .ststxbtc-token / .rewards-stx-v2 / .data-stx-v2;
;; deploy copies reference .ststxbtc-token-v2 (and the live rewards/data v2).

;; Constants (CC = 28, reused from v3)

(define-constant ERR_INVALID_AMOUNT (err u28001))
(define-constant ERR_INVALID_RATIO (err u28003))
;; Min-out floor (swap-v3 passed this through to the core deposit's ERR_MIN_SHARES;
;; v4 mints directly so it needs its own).
(define-constant ERR_MIN_SHARES (err u28004))

(define-constant DENOMINATOR_6 u1000000)

;; User

;; Switch stSTX -> stSTXbtc. min-out floors the minted stSTXbtc (slippage).
;; value-v = floor(ststx-amount * r / 1e6), the STX value of the burned stSTX.
(define-public (swap-ststx-for-ststxbtc (ststx-amount uint) (min-out uint))
  (let ((user tx-sender))
    (asserts! (> ststx-amount u0) ERR_INVALID_AMOUNT)
    ;; Crystallize streamed rewards so the ratio used below is the post-crystallize
    ;; ratio (same as the cores do) and is stable intra-tx.
    (try! (contract-call? .rewards-stx-v2 process-rewards))
    (let (
      (r-floor (contract-call? .data-stx-v2 get-stx-per-ststx))
    )
      ;; F1 guard on the FLOOR read: ceil can be 1 when floor is 0, so an up-ratio
      ;; guard would miss the degenerate state and we'd mint stSTXbtc against ~0
      ;; backing. Dedicated error, both directions.
      (asserts! (> r-floor u0) ERR_INVALID_RATIO)
      (let (
        (value-v (/ (* ststx-amount r-floor) DENOMINATOR_6))
      )
        (asserts! (>= value-v min-out) ERR_MIN_SHARES)
        ;; Pure re-label -- no reserve call anywhere:
        (try! (contract-call? .ststx-token burn-for-protocol ststx-amount user))
        (try! (contract-call? .ststxbtc-token mint-for-protocol value-v user))
        (print { action: "swap-ststx-for-ststxbtc", data: { user: user, ststx-in: ststx-amount, value-v: value-v, block-height: stacks-block-height } })
        (ok value-v)
      )
    )
  )
)

;; Switch stSTXbtc -> stSTX. min-out floors the minted stSTX (slippage).
;; shares = floor(ststxbtc-amount * 1e6 / r-up), mirroring the deposit mint
;; convention (divide by the ceil ratio so we never over-mint).
(define-public (swap-ststxbtc-for-ststx (ststxbtc-amount uint) (min-out uint))
  (let ((user tx-sender))
    (asserts! (> ststxbtc-amount u0) ERR_INVALID_AMOUNT)
    (try! (contract-call? .rewards-stx-v2 process-rewards))
    (let (
      (r-floor (contract-call? .data-stx-v2 get-stx-per-ststx))
    )
      (asserts! (> r-floor u0) ERR_INVALID_RATIO)
      (let (
        (r-up (contract-call? .data-stx-v2 get-stx-per-ststx-up))
        (shares (/ (* ststxbtc-amount DENOMINATOR_6) r-up))
      )
        (asserts! (>= shares min-out) ERR_MIN_SHARES)
        (try! (contract-call? .ststxbtc-token burn-for-protocol ststxbtc-amount user))
        (try! (contract-call? .ststx-token mint-for-protocol shares user))
        (print { action: "swap-ststxbtc-for-ststx", data: { user: user, ststxbtc-in: ststxbtc-amount, ststx-out: shares, block-height: stacks-block-height } })
        (ok shares)
      )
    )
  )
)
