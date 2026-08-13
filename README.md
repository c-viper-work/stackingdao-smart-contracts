# <img src="logo.svg" alt="" width="32" height="32" valign="middle" /> StackingDAO

StackingDAO is a liquid-staking protocol on Stacks. Users deposit **STX** or **sBTC** and receive a liquid staking token — **stSTX** (STX yield), **stSTXbtc** (Bitcoin yield), or **stBTC** (Bitcoin yield on sBTC) — or delegate natively while keeping custody. The protocol pools the deposits, stacks them through Stacks **PoX-5** signers, claims the sBTC rewards, and streams them back to holders.

This repository is the public, post-PoX-5-cutover reference for the on-chain contracts.

### 🌐 mainnet/
The exact contracts deployed on Stacks mainnet, grouped by domain, with explorer links.

**[View the mainnet deployment →](mainnet/README.md)**

### 🧪 local-testing/
A Clarinet + vitest simnet project with example tests, for integrators and security researchers.

**[Get started with local testing →](local-testing/README.md)**

## Architecture

```
                 Users
     deposit STX / sBTC   |   delegate STX (native)
            ▼             |            ▼
   ┌───────────────────┐  |   ┌────────────────────┐
   │  Cores            │  |   │  native-pool-v1    │
   │  core-stx / -btc  │  |   │  (non-custodial)   │
   └───────────────────┘  |   └────────────────────┘
            │  mint LST                 │
            ▼                           ▼
   ┌───────────────────┐        ┌────────────────────┐
   │  Reserves         │◀──────▶│  data-* (exchange  │
   │  stx-reserve-v2   │        │  rates / earmarks) │
   │  stbtc-reserve    │        └────────────────────┘
   └───────────────────┘
            │  request-stx-for-staking
            ▼
   ┌───────────────────┐   drives   ┌────────────────────┐
   │  strategy-v6      │──────────▶ │  stakers ▶ signer- │──▶ PoX-5
   │  (allocation)     │            │  managers          │
   └───────────────────┘            └────────────────────┘
            ▲                                 │ sBTC rewards
            │  compounded STX / sBTC          ▼
   ┌────────────────────────────────────────────────────┐
   │  Rewards: rewards-stx-v2, rewards-pox5-v1,          │
   │  commission-sbtc-v1, signer-payout-v1, tracking     │
   └────────────────────────────────────────────────────┘

   Governance: dao / dao-multisig / dao-executor gate every protocol action.
```

## Core components

| Contract | Purpose |
|---|---|
| `stacking-dao-core-stx-v2` / `-ststxbtc-v2` / `stacking-dao-core-stbtc-v1` | User entrypoints — deposit and withdraw for each liquid token |
| `stx-reserve-v2`, `stbtc-reserve` | Hold the protocol's STX and sBTC; track per-product earmarks |
| `data-stx-v2`, `data-stbtc-v1` | Exchange rates (derived live from active backing) |
| `swap-ststx-ststxbtc-v4` | Instant, fee-free swap between stSTX and stSTXbtc |
| `native-pool-v1` | Non-custodial native STX delegation |
| `strategy-v6` | Manager-gated allocation engine that drives all staking |
| `signer-manager-*`, `stx-staker-*`, `stbtc-staker-*` | The PoX-5 signer set and the per-signer stakers |
| `rewards-stx-v2`, `rewards-pox5-v1`, `commission-sbtc-v1`, `signer-payout-v1` | Claim and distribute STX + sBTC rewards |
| `dao`, `dao-multisig`, `dao-executor` | Governance — proposal-gated control of every protocol contract |

## Liquid staking tokens

| Token | Deposit | Yield |
|---|---|---|
| **stSTX** | STX | STX staking yield (accrues in the exchange rate) |
| **stSTXbtc** | STX | Bitcoin yield, paid in sBTC |
| **stBTC** | sBTC | Bitcoin yield, paid in sBTC |

## Documentation

| Document | Description |
|---|---|
| [High-level overview](docs/high-level-overview.md) | How the system fits together |
| [Reserves & exchange rate](docs/reserves-and-exchange-rate.md) | The reserve model, earmarks, and how rates are derived |
| [Staking & signers](docs/staking-and-signers.md) | The PoX-5 signer model, stakers, and grants |
| [Rewards](docs/rewards.md) | The STX and sBTC reward streams |
| [Governance](docs/governance.md) | The DAO, multisig, and proposal lifecycle |

## Security

See [SECURITY.md](SECURITY.md) for scope, audits, governance controls, and responsible disclosure.
