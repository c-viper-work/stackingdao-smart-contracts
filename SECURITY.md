# StackingDAO Security Overview

## Scope

This document covers the on-chain StackingDAO liquid-staking contracts deployed on Stacks mainnet from `SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG`. The exact deployed sources are in [`mainnet/`](mainnet/); a runnable simnet copy with tests is in [`local-testing/`](local-testing/).

## Language-level assurance

The contracts are written in **Clarity**, a decidable, non-Turing-complete language that is interpreted (not compiled) and published on-chain as source. There is no reentrancy through unknown code paths, no unbounded loops, and every state transition is explicit. Deployed sources are comment-free and pure ASCII by convention, so what is on chain is exactly what is reviewed here.

## Governance controls

Every state-changing protocol action is gated by the DAO:

- **`dao`** is the protocol registry and access gate. Contracts must be `set-contract-active` to call protocol-gated functions (`check-is-protocol`); admins are checked via `check-is-admin`.
- **`dao-executor`** is the sole admin. It only acts by executing an approved **proposal-script** — a purpose-built contract that performs a specific, reviewable change.
- **`dao-multisig`** manages the proposal lifecycle: propose → approve to threshold → execute, with a timelock on non-urgent proposals.

After the PoX-5 deployment completed, the deployer key was **deregistered as a protocol and removed from the governance multisig**, so it holds no ongoing privilege over the live contracts.

The signer set is controlled through **`signer-admin-v1`**; onboarded signers provide a one-time signer-key grant and nothing per cycle (see [docs/staking-and-signers.md](docs/staking-and-signers.md)).

## Audits

StackingDAO's contracts have been reviewed by independent security auditors. The current audit reports are published on the StackingDAO documentation site:

- **https://docs.stackingdao.com** (see the *Audits* section)

## Responsible disclosure

If you discover a vulnerability, please disclose it privately and give the team a reasonable window to respond before any public disclosure.

- Documentation & contact: **https://docs.stackingdao.com**
- X: **@StackingDAO**

Please do not exploit an issue beyond what is necessary to demonstrate it, and do not access, modify, or exfiltrate other users' funds or data.

## External dependencies

The protocol integrates the canonical **sBTC** token (`SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token`), which is outside StackingDAO's control and has its own security model.
