# StackingDAO — Mainnet Deployment

Production deployment of the StackingDAO liquid-staking protocol on Stacks mainnet.

All contracts are deployed from the StackingDAO deployer `SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG`. Each contract name links to its exact deployed source in this repository; the Explorer column links to the on-chain contract on the Hiro explorer.

## Governance & access control

| Contract | Purpose | Explorer |
|---|---|---|
| [`dao`](contracts/dao/dao.clar) | Protocol registry + access gate (check-is-protocol / check-is-admin) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.dao?chain=mainnet) |
| [`dao-traits`](contracts/dao/dao-traits.clar) | Trait definitions (proposal-script, upgradable) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.dao-traits?chain=mainnet) |
| [`dao-executor`](contracts/dao/dao-executor.clar) | Sole DAO admin; executes approved proposal-scripts | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.dao-executor?chain=mainnet) |
| [`dao-multisig`](contracts/dao/dao-multisig.clar) | Governance multisig (propose / approve / execute) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.dao-multisig?chain=mainnet) |
| [`signer-admin-v1`](contracts/dao/signer-admin-v1.clar) | Shared admin registry for every signer-manager | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-admin-v1?chain=mainnet) |

## Liquid staking tokens

| Contract | Purpose | Explorer |
|---|---|---|
| [`ststx-token`](contracts/tokens/ststx-token.clar) | stSTX — STX liquid staking token | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststx-token?chain=mainnet) |
| [`ststxbtc-token-v2`](contracts/tokens/ststxbtc-token-v2.clar) | stSTXbtc — STX staked toward the sBTC/bond side | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststxbtc-token-v2?chain=mainnet) |
| [`stbtc-token`](contracts/tokens/stbtc-token.clar) | stBTC — sBTC liquid staking token | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stbtc-token?chain=mainnet) |

## Reserves

| Contract | Purpose | Explorer |
|---|---|---|
| [`stx-reserve-v2`](contracts/reserves/stx-reserve-v2.clar) | The live STX reserve (holds all protocol STX; derives the stSTXbtc earmark) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stx-reserve-v2?chain=mainnet) |
| [`stbtc-reserve`](contracts/reserves/stbtc-reserve.clar) | The sBTC / bond reserve | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stbtc-reserve?chain=mainnet) |

## Exchange rate & data

| Contract | Purpose | Explorer |
|---|---|---|
| [`data-stx-v2`](contracts/data/data-stx-v2.clar) | stSTX exchange rate (STX per stSTX) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.data-stx-v2?chain=mainnet) |
| [`data-stbtc-v1`](contracts/data/data-stbtc-v1.clar) | stBTC exchange rate (sBTC per stBTC) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.data-stbtc-v1?chain=mainnet) |
| [`ststxbtc-data-v2`](contracts/data/ststxbtc-data-v2.clar) | stSTXbtc withdrawal cooldown + NFT data | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststxbtc-data-v2?chain=mainnet) |
| [`data-pools-stbtc-v1`](contracts/data/data-pools-stbtc-v1.clar) | Per-pool commission configuration | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.data-pools-stbtc-v1?chain=mainnet) |

## User entrypoints

| Contract | Purpose | Explorer |
|---|---|---|
| [`stacking-dao-core-stx-v2`](contracts/core/stacking-dao-core-stx-v2.clar) | stSTX core — deposit STX, withdraw | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stacking-dao-core-stx-v2?chain=mainnet) |
| [`stacking-dao-core-ststxbtc-v2`](contracts/core/stacking-dao-core-ststxbtc-v2.clar) | stSTXbtc core — deposit STX, withdraw | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stacking-dao-core-ststxbtc-v2?chain=mainnet) |
| [`stacking-dao-core-stbtc-v1`](contracts/core/stacking-dao-core-stbtc-v1.clar) | stBTC core — deposit sBTC, withdraw | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stacking-dao-core-stbtc-v1?chain=mainnet) |
| [`swap-ststx-ststxbtc-v4`](contracts/core/swap-ststx-ststxbtc-v4.clar) | Instant fee-free swap between stSTX and stSTXbtc | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.swap-ststx-ststxbtc-v4?chain=mainnet) |
| [`native-pool-v1`](contracts/core/native-pool-v1.clar) | Non-custodial native STX delegation | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.native-pool-v1?chain=mainnet) |

## Staking engine & signers

| Contract | Purpose | Explorer |
|---|---|---|
| [`strategy-v6`](contracts/staking/strategy-v6.clar) | Manager-gated allocation dispatcher (drives all staking) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.strategy-v6?chain=mainnet) |
| [`consensus-staker-trait`](contracts/staking/consensus-staker-trait.clar) | Trait for consensus (STX) stakers | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.consensus-staker-trait?chain=mainnet) |
| [`stbtc-staker-trait`](contracts/staking/stbtc-staker-trait.clar) | Trait for bond (sBTC) stakers | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stbtc-staker-trait?chain=mainnet) |
| [`native-pool-signer-manager`](contracts/staking/native-pool-signer-manager.clar) | Signer-manager for the native pool | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.native-pool-signer-manager?chain=mainnet) |
| [`signer-manager-blockdaemon-v1`](contracts/staking/signer-manager-blockdaemon-v1.clar) | Consensus signer-manager — Blockdaemon | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-blockdaemon-v1?chain=mainnet) |
| [`signer-manager-foundry-v1`](contracts/staking/signer-manager-foundry-v1.clar) | Consensus signer-manager — Foundry | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-foundry-v1?chain=mainnet) |
| [`signer-manager-hashkey-v1`](contracts/staking/signer-manager-hashkey-v1.clar) | Consensus signer-manager — HashKey | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-hashkey-v1?chain=mainnet) |
| [`signer-manager-infstones-v1`](contracts/staking/signer-manager-infstones-v1.clar) | Consensus signer-manager — InfStones | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-infstones-v1?chain=mainnet) |
| [`signer-manager-juicy-stake-v1`](contracts/staking/signer-manager-juicy-stake-v1.clar) | Consensus signer-manager — Juicy Stake | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-juicy-stake-v1?chain=mainnet) |
| [`signer-manager-xverse-v1`](contracts/staking/signer-manager-xverse-v1.clar) | Consensus signer-manager — Xverse | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-xverse-v1?chain=mainnet) |
| [`signer-manager-stacking-dao-v1`](contracts/staking/signer-manager-stacking-dao-v1.clar) | Consensus signer-manager — StackingDAO | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-stacking-dao-v1?chain=mainnet) |
| [`signer-manager-bond-1-v1`](contracts/staking/signer-manager-bond-1-v1.clar) | Bond signer-manager 1 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-bond-1-v1?chain=mainnet) |
| [`signer-manager-bond-2-v1`](contracts/staking/signer-manager-bond-2-v1.clar) | Bond signer-manager 2 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-bond-2-v1?chain=mainnet) |
| [`signer-manager-bond-3-v1`](contracts/staking/signer-manager-bond-3-v1.clar) | Bond signer-manager 3 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-bond-3-v1?chain=mainnet) |
| [`signer-manager-bond-4-v1`](contracts/staking/signer-manager-bond-4-v1.clar) | Bond signer-manager 4 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-bond-4-v1?chain=mainnet) |
| [`signer-manager-bond-5-v1`](contracts/staking/signer-manager-bond-5-v1.clar) | Bond signer-manager 5 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-bond-5-v1?chain=mainnet) |
| [`signer-manager-bond-6-v1`](contracts/staking/signer-manager-bond-6-v1.clar) | Bond signer-manager 6 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-manager-bond-6-v1?chain=mainnet) |

## Stakers

| Contract | Purpose | Explorer |
|---|---|---|
| [`stx-staker-blockdaemon-v2`](contracts/stakers/stx-staker-blockdaemon-v2.clar) | Consensus staker — Blockdaemon | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stx-staker-blockdaemon-v2?chain=mainnet) |
| [`stx-staker-foundry-v2`](contracts/stakers/stx-staker-foundry-v2.clar) | Consensus staker — Foundry | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stx-staker-foundry-v2?chain=mainnet) |
| [`stx-staker-hashkey-v2`](contracts/stakers/stx-staker-hashkey-v2.clar) | Consensus staker — HashKey | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stx-staker-hashkey-v2?chain=mainnet) |
| [`stx-staker-infstones-v2`](contracts/stakers/stx-staker-infstones-v2.clar) | Consensus staker — InfStones | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stx-staker-infstones-v2?chain=mainnet) |
| [`stx-staker-juicy-stake-v2`](contracts/stakers/stx-staker-juicy-stake-v2.clar) | Consensus staker — Juicy Stake | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stx-staker-juicy-stake-v2?chain=mainnet) |
| [`stx-staker-xverse-v2`](contracts/stakers/stx-staker-xverse-v2.clar) | Consensus staker — Xverse | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stx-staker-xverse-v2?chain=mainnet) |
| [`stx-staker-stacking-dao-v2`](contracts/stakers/stx-staker-stacking-dao-v2.clar) | Consensus staker — StackingDAO | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stx-staker-stacking-dao-v2?chain=mainnet) |
| [`stbtc-staker-bond-1-v2`](contracts/stakers/stbtc-staker-bond-1-v2.clar) | Bond staker 1 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stbtc-staker-bond-1-v2?chain=mainnet) |
| [`stbtc-staker-bond-2-v2`](contracts/stakers/stbtc-staker-bond-2-v2.clar) | Bond staker 2 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stbtc-staker-bond-2-v2?chain=mainnet) |
| [`stbtc-staker-bond-3-v2`](contracts/stakers/stbtc-staker-bond-3-v2.clar) | Bond staker 3 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stbtc-staker-bond-3-v2?chain=mainnet) |
| [`stbtc-staker-bond-4-v2`](contracts/stakers/stbtc-staker-bond-4-v2.clar) | Bond staker 4 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stbtc-staker-bond-4-v2?chain=mainnet) |
| [`stbtc-staker-bond-5-v2`](contracts/stakers/stbtc-staker-bond-5-v2.clar) | Bond staker 5 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stbtc-staker-bond-5-v2?chain=mainnet) |
| [`stbtc-staker-bond-6-v2`](contracts/stakers/stbtc-staker-bond-6-v2.clar) | Bond staker 6 | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stbtc-staker-bond-6-v2?chain=mainnet) |

## Rewards

| Contract | Purpose | Explorer |
|---|---|---|
| [`rewards-stx-v2`](contracts/rewards/rewards-stx-v2.clar) | STX reward stream into the reserve (raises the stSTX rate) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.rewards-stx-v2?chain=mainnet) |
| [`rewards-pox5-v1`](contracts/rewards/rewards-pox5-v1.clar) | sBTC reward seam (commission skim + product split) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.rewards-pox5-v1?chain=mainnet) |
| [`commission-sbtc-v1`](contracts/rewards/commission-sbtc-v1.clar) | Commission splitter | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.commission-sbtc-v1?chain=mainnet) |
| [`signer-payout-v1`](contracts/rewards/signer-payout-v1.clar) | Pays external signers their sBTC share | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.signer-payout-v1?chain=mainnet) |
| [`reward-split-calculator-v1`](contracts/rewards/reward-split-calculator-v1.clar) | Dynamic sBTC split calculator | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.reward-split-calculator-v1?chain=mainnet) |
| [`ststxbtc-tracking-data-v2`](contracts/rewards/ststxbtc-tracking-data-v2.clar) | Per-holder sBTC reward tracker (data) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststxbtc-tracking-data-v2?chain=mainnet) |
| [`ststxbtc-tracking-v2`](contracts/rewards/ststxbtc-tracking-v2.clar) | Per-holder sBTC reward tracker (wrapper / claims) | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststxbtc-tracking-v2?chain=mainnet) |

## Withdrawal receipts

| Contract | Purpose | Explorer |
|---|---|---|
| [`ststx-withdraw-nft-v4`](contracts/withdrawals/ststx-withdraw-nft-v4.clar) | stSTX withdrawal receipt NFT | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststx-withdraw-nft-v4?chain=mainnet) |
| [`withdraw-data-stx-v2`](contracts/withdrawals/withdraw-data-stx-v2.clar) | stSTX withdrawal record store | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.withdraw-data-stx-v2?chain=mainnet) |
| [`ststxbtc-withdraw-nft-v3`](contracts/withdrawals/ststxbtc-withdraw-nft-v3.clar) | stSTXbtc withdrawal receipt NFT | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststxbtc-withdraw-nft-v3?chain=mainnet) |
| [`stbtc-withdraw-nft`](contracts/withdrawals/stbtc-withdraw-nft.clar) | stBTC withdrawal receipt NFT | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stbtc-withdraw-nft?chain=mainnet) |
| [`withdraw-data-stbtc`](contracts/withdrawals/withdraw-data-stbtc.clar) | stBTC withdrawal record store | [view](https://explorer.hiro.so/txid/SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.withdraw-data-stbtc?chain=mainnet) |

## Deployment details

- **Network:** Stacks mainnet
- **Deployer:** `SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG`
- **Contracts:** 61 (this set)
- **External dependency (not StackingDAO):** the sBTC token `SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token`

> Sources here are fetched byte-for-byte from mainnet, so they match the deployed bytecode exactly. The v4 contracts are comment-free (a deploy-time convention); the pre-existing `dao` and token contracts retain the comments they were deployed with. For the intent behind each contract, see [../docs/](../docs/).
