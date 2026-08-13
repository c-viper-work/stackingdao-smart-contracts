# Staking & signers

StackingDAO stakes its pooled assets through Stacks **PoX-5** signers. Onboarded signers
are external partners (plus StackingDAO's own); each is represented on-chain by a
**signer-manager** and stakes through a dedicated **staker** contract.

Contracts: `strategy-v6`, the `signer-manager-*` set, `native-pool-signer-manager`,
`signer-admin-v1`, the `stx-staker-*-v2` / `stbtc-staker-bond-*-v2` set, and the
`consensus-staker-trait` / `stbtc-staker-trait` traits.

## Topology

- **7 consensus signers** for STX staking — 6 external partners (Blockdaemon, Foundry,
  HashKey, InfStones, Juicy Stake, Xverse) + StackingDAO's own. Each has a
  `signer-manager-<name>-v1` and an `stx-staker-<name>-v2`.
- **6 bond signers** for the sBTC/bond side — `signer-manager-bond-1..6-v1` with
  `stbtc-staker-bond-1..6-v2`.
- **1 native-pool signer** — `native-pool-signer-manager`, behind `native-pool-v1`.

## How a stake is placed

The allocation engine runs off-chain and calls **`strategy-v6`**, which validates that
`contract-caller` is the configured manager and that every signer-manager passed is on a
DAO-curated allowlist, then dispatches to the staker. The staker pulls the asset from the
reserve (`stx-reserve-v2` / `stbtc-reserve`) and commits it into PoX-5 behind its
signer-manager. Nothing else can stake behind StackingDAO's signers.

## The one-time signer grant (no per-cycle signatures)

This is the key simplification of the PoX-5 model. A partner signer performs a **single**
`register-self` on their signer-manager, which records a SIP-018 **signer-key grant** in
PoX-5 binding their signing key to that signer-manager. From then on, StackingDAO can
stake through the signer **every cycle with no further action from the partner** — the
signer-manager only checks that the grant exists, and there is no per-cycle signature.

Signer-admin rights are held via **`signer-admin-v1`** (appointments are DAO-gated); the
partner provides only the grant.

## The native pool wrapper is mandatory

`native-pool-v1.delegate` is the **only** way to stake through the native signer. Its
signer-manager's `validate-stake!` asserts `native-pool-v1.is-delegating(staker, …)`, a
flag set only inside `delegate`. A raw `pox-5.stake` through the native signer reverts.
The wrapper also enforces the DAO kill switch and the single canonical native signer, and
records positions for reward attribution. So integrators call `native-pool-v1.delegate`,
never `pox-5.stake`.

## Claiming native rewards

Native-pool stakers claim their own sBTC rewards on-chain via
`native-pool-signer-manager.claim-staker-rewards(reward-cycle, bond-index)` — a
self-service claim that pays the caller their earned sBTC directly.
