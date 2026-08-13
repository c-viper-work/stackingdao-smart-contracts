# Governance

Every state-changing protocol action is gated by the DAO. No arbitrary contract can move
the reserves, mint tokens, or stake — only contracts the DAO has explicitly registered.

Contracts: `dao`, `dao-multisig`, `dao-executor`, `dao-traits`, `signer-admin-v1`.

## The registry and the gate

`dao` is the protocol registry and access gate:

- **`check-is-protocol(contract-caller)`** — the check every mutator runs. A contract may
  call a protocol-gated function only if the DAO has `set-contract-active`d it. This is how
  the cores, strategy, swap, and rewards contracts are authorised to touch the reserves and
  tokens, and how everything else is kept out.
- **`check-is-admin(who)`** — the admin check. The only admin is `dao-executor`.

## Proposals

Administrative changes are made through **proposal-scripts**: small, single-purpose
contracts implementing `dao-traits.proposal-script`, each performing a specific, reviewable
change (register a contract, set a parameter, wire a keeper, …).

`dao-multisig` runs the lifecycle:

1. **propose** a proposal-script,
2. **approve** it up to the signing threshold,
3. **execute** it — `dao-multisig` calls `dao-executor`, which runs the script as the DAO
   admin.

Non-urgent proposals are subject to a **timelock** before they can execute; an urgency flag
can bypass it for time-sensitive operations. Because `dao-executor` is the caller during
execution, a proposal can perform admin-gated changes that a raw EOA cannot.

## Post-deployment posture

After the PoX-5 contracts were deployed and wired, the deployer key was **deregistered as a
protocol** and **removed from the governance multisig**. It therefore holds no ongoing
privilege over the live contracts; all further changes require a multisig-approved proposal.

## Signers

Signer-admin rights are held via **`signer-admin-v1`**, keyed per signer-manager, with
appointments made through DAO proposals. Allowlisting a staker behind a signer-manager is a
signer-admin action (not a DAO-registry action); see
[staking-and-signers.md](staking-and-signers.md).
