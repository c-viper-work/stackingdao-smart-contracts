;; sBTC token: SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token (Clarity literal; see STYLE.md)
;; @contract Commission sBTC v1
;; @version 1
;;
;; Secondary commission splitter in the rewards-v7 pipeline. Receives the
;; commission-left slice and routes it three ways:
;;   signer-basispoints to signer-payout-v1 via plain sBTC transfer. The keeper
;;     later calls signer-payout-v1.distribute with per-signer allocations.
;;   staking-basispoints to sdao-staking-sbtc-v1.add-rewards, linear release over
;;     (staking-end-block - now) burn blocks.
;;   the residual stays here as a treasury reserve, DAO-withdrawable.
;;
;; Defaults: signer-basispoints = 10000 sends all commission-left to signers,
;; staking-basispoints = 0 until the DAO enables sDAO.
;;
;; Asset flow: rewards-v7 wraps its call in as-contract? so tx-sender is
;; rewards-v7 when this contract pulls sbtc-amount. This contract then wraps each
;; outgoing leg in its own as-contract? so each downstream pull sees this
;; contract as tx-sender.

(define-constant ERR_TOO_MUCH (err u29001))

(define-constant DENOMINATOR_BPS u10000)

;; Variables

(define-data-var signer-basispoints uint u10000) ;; 100% of commission-left to signers
(define-data-var staking-basispoints uint u0)    ;; 0% to sDAO by default

;; Getters

(define-read-only (get-signer-basispoints) (var-get signer-basispoints))
(define-read-only (get-staking-basispoints) (var-get staking-basispoints))

(define-read-only (get-sbtc-balance)
  (unwrap-panic (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token get-balance current-contract))
)

;; add-commission

;; Pulls sbtc-amount sBTC from the caller and splits it three ways.
;; `staking-end-block` is the linear-release end for the sDAO staking share.
;; rewards-v7 passes burn-block-height + RELEASE_WINDOW_BLOCKS so the sDAO stream
;; aligns with the stBTC ratio stream.
(define-public (add-commission (sbtc-amount uint) (staking-end-block uint))
  (let (
    (signer-amount  (/ (* sbtc-amount (var-get signer-basispoints))  DENOMINATOR_BPS))
    (staking-amount-target (/ (* sbtc-amount (var-get staking-basispoints)) DENOMINATOR_BPS))
    ;; Guard: with no sDAO staked, route the staking slice to treasury residual
    ;; instead of forwarding it. The accumulator in sdao-staking-sbtc-v1 does not
    ;; advance when total-staked is zero, so add-rewards would strand the sBTC.
    (sdao-total (contract-call? .sdao-staking-sbtc-v1 get-total-staked))
    (staking-amount (if (> sdao-total u0) staking-amount-target u0))
    (treasury-amount (- sbtc-amount (+ signer-amount staking-amount)))
  )
    (try! (contract-call? .dao check-is-protocol contract-caller))

    ;; Pull commission-left from caller, the current tx-sender.
    (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer sbtc-amount tx-sender current-contract none))

    ;; Forward signer slice to signer-payout-v1
    (if (> signer-amount u0)
      (try! (as-contract?
        ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" signer-amount))
        (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer signer-amount current-contract .signer-payout-v1 none))
      ))
      true
    )

    ;; Forward staking slice to sdao-staking-sbtc-v1.add-rewards as a stream.
    ;; staking-amount is already 0 if the no-stakers guard fired, so this is a
    ;; no-op then and the slice stays here as treasury.
    (if (> staking-amount u0)
      (try! (as-contract?
        ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" staking-amount))
        (try! (contract-call? .sdao-staking-sbtc-v1 add-rewards staking-amount staking-end-block))
      ))
      u0
    )

    ;; treasury-amount stays in this contract.

    (print { action: "add-commission", data: {
      total: sbtc-amount,
      signer: signer-amount,
      staking-target: staking-amount-target,
      staking-forwarded: staking-amount,
      treasury: treasury-amount,
      sdao-total-staked: sdao-total,
      block-height: stacks-block-height
    } })
    (ok sbtc-amount)
  )
)

;; Admin

(define-public (set-signer-basispoints (bps uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (<= (+ bps (var-get staking-basispoints)) DENOMINATOR_BPS) ERR_TOO_MUCH)
    (var-set signer-basispoints bps)
    (print { action: "set-signer-basispoints", data: { bps: bps, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (set-staking-basispoints (bps uint))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (asserts! (<= (+ (var-get signer-basispoints) bps) DENOMINATOR_BPS) ERR_TOO_MUCH)
    (var-set staking-basispoints bps)
    (print { action: "set-staking-basispoints", data: { bps: bps, block-height: stacks-block-height } })
    (ok true)
  )
)

(define-public (withdraw-treasury (amount uint) (receiver principal))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (try! (as-contract?
      ((with-ft 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token "sbtc-token" amount))
      (try! (contract-call? 'SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token transfer amount current-contract receiver none))
    ))
    (print { action: "withdraw-treasury", data: { amount: amount, receiver: receiver, block-height: stacks-block-height } })
    (ok amount)
  )
)
