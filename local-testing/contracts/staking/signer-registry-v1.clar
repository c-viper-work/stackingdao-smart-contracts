;; @contract Signer Registry v1
;; @version 1
;;
;; On-chain mapping of a signer slot to its (signer-manager, staker, bond-index)
;; triple (D3). Replaces off-chain tribal knowledge of which signer-manager and
;; staker back each slot: the keeper reads this to drive strategy dispatch, and
;; an auditor can verify the deployed topology matches the design. One entry per
;; slot; bond-index is none for STX-only consensus slots, some for bond slots.
;; DAO-gated registration.

;; DAO-gated registration.

;; Maps

(define-map slots
  { index: uint }
  {
    signer-manager: principal,
    staker: principal,
    bond-index: (optional uint),
  }
)

;; Getters

(define-read-only (get-slot (index uint))
  (map-get? slots { index: index })
)

;; Register / update a slot's wiring. DAO-gated.
(define-public (register-slot (index uint) (signer-manager principal) (staker principal) (bond-index (optional uint)))
  (begin
    (try! (contract-call? .dao check-is-protocol contract-caller))
    (map-set slots { index: index } { signer-manager: signer-manager, staker: staker, bond-index: bond-index })
    (print { action: "register-slot", data: { index: index, signer-manager: signer-manager, staker: staker, bond-index: bond-index, block-height: stacks-block-height } })
    (ok true)
  )
)
