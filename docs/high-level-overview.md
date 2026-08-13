# High-level overview

StackingDAO turns idle STX and sBTC into productive, liquid staking positions. A user
deposits an asset, receives a liquid staking token (LST), and the protocol pools the
deposits and stacks them through Stacks **PoX-5** signers to earn Bitcoin (sBTC) rewards.

## The path of a deposit

1. **Deposit (core).** The user calls a core contract — `stacking-dao-core-stx-v2`
   (STX → stSTX), `stacking-dao-core-ststxbtc-v2` (STX → stSTXbtc), or
   `stacking-dao-core-stbtc-v1` (sBTC → stBTC). The core moves the asset into a reserve
   and mints the LST at the current exchange rate.
2. **Hold (reserve).** `stx-reserve-v2` holds all protocol STX; `stbtc-reserve` holds
   the sBTC/bond side. The reserves track what each slice of the asset is earmarked for
   (active backing, in-flight withdrawals, the stSTXbtc side). See
   [reserves-and-exchange-rate.md](reserves-and-exchange-rate.md).
3. **Allocate (strategy).** `strategy-v6`, driven by an off-chain allocation manager,
   pulls idle assets from the reserve and stakes them behind the protocol's signers.
4. **Stake (stakers → signer-managers → PoX-5).** Each signer has a `signer-manager`
   and a dedicated `staker` that commits the assets into PoX-5. The signer signs blocks;
   the position earns sBTC. See [staking-and-signers.md](staking-and-signers.md).
5. **Reward.** Claimed sBTC flows through `rewards-pox5-v1` (commission skim + product
   split), and the STX-destined slice streams back into `stx-reserve-v2` via
   `rewards-stx-v2`, raising the stSTX rate. External signers are paid their share via
   `signer-payout-v1`. See [rewards.md](rewards.md).
6. **Withdraw.** The user either withdraws instantly against idle liquidity (a small
   fee) or schedules a withdrawal, receiving an NFT that redeems for principal + yield
   after the cooldown.

## Two ways to earn

- **Liquid tokens (custodial pooling).** stSTX / stSTXbtc / stBTC are pooled: the
  protocol custodies the assets and issues a transferable, composable LST.
- **Native pool (non-custodial).** `native-pool-v1` lets a user delegate their own STX
  without giving up custody — the STX stays locked in the user's account — and receive
  sBTC rewards. Integrators must call `native-pool-v1.delegate`, not `pox-5.stake`
  directly (the native signer only accepts stakes routed through the pool).

## Swapping between the STX tokens

Because stSTX and stSTXbtc are both backed by the same STX, `swap-ststx-ststxbtc-v4`
lets a holder move between them instantly and fee-free, at the current exchange rate.

## Everything is gated by governance

No protocol function can be called by an arbitrary contract. The `dao` registry decides
which contracts are "protocols," and all administrative changes go through
proposal-scripts executed by the DAO multisig. See [governance.md](governance.md).
