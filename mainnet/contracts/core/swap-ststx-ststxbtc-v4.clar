(define-constant DENOMINATOR_6 u1000000)

(define-constant ERR_INVALID_AMOUNT (err u28001))
(define-constant ERR_INVALID_RATIO (err u28003))
(define-constant ERR_MIN_SHARES (err u28004))
(define-constant ERR_ZERO_OUTPUT (err u28005))
(define-constant ERR_INSUFFICIENT_IDLE (err u28006))


(define-public (swap-ststx-for-ststxbtc (ststx-amount uint) (min-out uint))
  (let ((user tx-sender))
    (asserts! (> ststx-amount u0) ERR_INVALID_AMOUNT)
    (try! (contract-call? .dao check-is-enabled))

    (try! (contract-call? .ststx-token transfer ststx-amount user current-contract none))
    (try! (contract-call? .rewards-stx-v2 process-rewards))
    (try! (contract-call? .rewards-pox5-v1 process-rewards))
    (let ((r (contract-call? .data-stx-v2 get-stx-per-ststx)))
      (asserts! (> r u0) ERR_INVALID_RATIO)
      (let ((value-v (/ (* ststx-amount r) DENOMINATOR_6)))
        (asserts! (> value-v u0) ERR_ZERO_OUTPUT)
        (asserts! (>= value-v min-out) ERR_MIN_SHARES)





        (asserts! (<= value-v (contract-call? .stx-reserve-v2 get-stx-available)) ERR_INSUFFICIENT_IDLE)
        (try! (contract-call? .ststx-token burn-for-protocol ststx-amount current-contract))
        (try! (contract-call? .ststxbtc-token-v2 mint-for-protocol value-v user))

        (try! (contract-call? .stx-reserve-v2 lock-stx-for-ststxbtc value-v))
        (print { action: "swap-ststx-for-ststxbtc", data: { user: user, ststx-in: ststx-amount, value-v: value-v, block-height: stacks-block-height } })
        (ok value-v)))))


(define-public (swap-ststxbtc-for-ststx (ststxbtc-amount uint) (min-out uint))
  (let ((user tx-sender))
    (asserts! (> ststxbtc-amount u0) ERR_INVALID_AMOUNT)
    (try! (contract-call? .dao check-is-enabled))



    (try! (contract-call? .rewards-stx-v2 process-rewards))
    (try! (contract-call? .rewards-pox5-v1 process-rewards))
    (try! (contract-call? .ststxbtc-token-v2 transfer ststxbtc-amount user current-contract none))
    (let ((r-up (contract-call? .data-stx-v2 get-stx-per-ststx-up)))
      (asserts! (> r-up u0) ERR_INVALID_RATIO)
      (let ((shares (/ (* ststxbtc-amount DENOMINATOR_6) r-up)))
        (asserts! (> shares u0) ERR_ZERO_OUTPUT)
        (asserts! (>= shares min-out) ERR_MIN_SHARES)




        (asserts! (>= (contract-call? .stx-reserve-v2 get-stx-for-ststxbtc-idle)
                      (+ ststxbtc-amount (contract-call? .stx-reserve-v2 get-stx-for-withdrawals-ststxbtc)))
                  ERR_INSUFFICIENT_IDLE)
        (try! (contract-call? .ststxbtc-token-v2 burn-for-protocol ststxbtc-amount current-contract))
        (try! (contract-call? .stx-reserve-v2 unlock-stx-for-ststxbtc ststxbtc-amount))
        (try! (contract-call? .ststx-token mint-for-protocol shares user))
        (print { action: "swap-ststxbtc-for-ststx", data: { user: user, ststxbtc-in: ststxbtc-amount, ststx-out: shares, block-height: stacks-block-height } })
        (ok shares)))))
