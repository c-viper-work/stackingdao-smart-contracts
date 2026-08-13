# StackingDAO — Documentation

Architecture reference for the StackingDAO liquid-staking contracts. For the exact
deployed sources see [`../mainnet/`](../mainnet/); for a runnable simnet copy see
[`../local-testing/`](../local-testing/).

| Document | Description |
|---|---|
| [High-level overview](high-level-overview.md) | The products, the contract groups, and how a deposit becomes staked yield |
| [Reserves & exchange rate](reserves-and-exchange-rate.md) | The reserve model, the stSTX/stSTXbtc earmark split, and how exchange rates are derived |
| [Staking & signers](staking-and-signers.md) | `strategy-v6`, signer-managers, stakers, and the one-time signer grant |
| [Rewards](rewards.md) | The STX and sBTC reward streams and native-pool claims |
| [Governance](governance.md) | The DAO registry, multisig, and proposal lifecycle |

## The three liquid tokens (and the native pool)

- **stSTX** — deposit STX, earn STX staking yield. The yield accrues in the exchange rate (each stSTX redeems for more STX over time).
- **stSTXbtc** — deposit STX, earn Bitcoin yield paid in **sBTC**. Minted 1:1 with STX; the yield is distributed, not compounded into the rate.
- **stBTC** — deposit **sBTC**, earn Bitcoin yield. The yield accrues in the stBTC/sBTC rate.
- **native pool** — delegate your own STX non-custodially (you keep the STX in your account) and receive sBTC rewards.

## Contract groups

`mainnet/contracts/` is organised by role: `dao/` (governance), `tokens/` (the LSTs), `reserves/`, `data/` (exchange rates), `core/` (user entrypoints + swap + native pool), `staking/` (strategy, signer-managers, traits), `stakers/`, `rewards/`, and `withdrawals/` (receipt NFTs + records).
