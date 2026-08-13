# Rewards

PoX-5 signers earn **sBTC**. StackingDAO splits reward handling into an sBTC stream and a
STX stream, each **streamed over a release window** (anti-MEV) rather than applied in a
single block.

Contracts: `rewards-pox5-v1`, `rewards-stx-v2`, `commission-sbtc-v1`, `signer-payout-v1`,
`reward-split-calculator-v1`, `ststxbtc-tracking-v2` / `ststxbtc-tracking-data-v2`.

## The sBTC stream (`rewards-pox5-v1`)

Claimed sBTC is forwarded here. `process-rewards` (permissionless, idempotent):

- skims **commission** off the top into `commission-sbtc-v1`, which routes to
  `signer-payout-v1` (external signers' pro-rata share) and the treasury;
- streams the remainder as a **product split** across the stBTC reserve, the stSTXbtc
  yield tracker, and the stSTX share (swapped to STX off-chain), over the release window.

The split can be set directly or driven dynamically by `reward-split-calculator-v1`.
`signer-payout-v1.distribute` pays each external signer their sBTC slice in one batched call.

## The STX stream (`rewards-stx-v2`)

The stSTX-destined slice is swapped to STX off-chain, deposited via `add-rewards`, and
`process-rewards` streams it into `stx-reserve-v2` — smoothly raising the stSTX exchange
rate. No commission or split happens here (already taken on the sBTC side).

## stSTXbtc yield tracking

stSTXbtc is minted 1:1 with STX and does **not** appreciate in its exchange rate; instead
its Bitcoin yield is tracked per holder by `ststxbtc-tracking-data-v2` (+ the
`ststxbtc-tracking-v2` wrapper), which holders claim as sBTC.

## Native-pool rewards

Native-pool stakers claim their own sBTC on-chain via
`native-pool-signer-manager.claim-staker-rewards` — see
[staking-and-signers.md](staking-and-signers.md). This is a self-service claim: the caller
receives their earned sBTC directly, with no keeper in the path.
