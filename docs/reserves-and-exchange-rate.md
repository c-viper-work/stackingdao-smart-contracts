# Reserves & exchange rate

**Read this before integrating or reading TVL.** The reserve tracks *what each slice of
STX is for*, and the exchange-rate getters return **bare uints** (not `(response ...)`).

Contracts: `stx-reserve-v2` (STX), `stbtc-reserve` (sBTC), `data-stx-v2` (stSTX rate),
`data-stbtc-v1` (stBTC rate).

## The STX reserve holds STX for several purposes

`stx-reserve-v2` keeps one physical STX balance but tracks how it is allocated:

| Bucket | Meaning |
|--------|---------|
| `stx-staking` | STX currently staked out in PoX-5 (not in the contract's balance) |
| `stx-for-withdrawals-ststx` | STX locked to satisfy pending **stSTX** withdrawals |
| `stx-for-withdrawals-ststxbtc` | STX locked to satisfy pending **stSTXbtc** withdrawals |
| `stx-for-ststxbtc-idle` | the **liquid** subset of STX backing stSTXbtc |

Key read-onlys: `get-total-stx` = `balance + stx-staking` (**bare uint**);
`get-stx-balance`; `get-stx-available` = `balance − (stx-for-withdrawals-ststx +
stx-for-ststxbtc-idle)` — the STX free to stake or pay out.

### The stSTXbtc earmark is *derived*

The STX backing stSTXbtc is not stored as a single number; it is **derived** from the
stSTXbtc token supply:

```
get-stx-for-ststxbtc = ststxbtc-token-v2.total-supply − escrowed-ststxbtc
```

where `escrowed-ststxbtc` is summed over a governance-mutable escrow registry
(`set-escrow-cores`). Because the earmark tracks supply, minting or burning stSTXbtc
moves the earmark 1:1 automatically — which is exactly what lets
`swap-ststx-ststxbtc-v4` re-label between stSTX and stSTXbtc fee-free (it moves only the
liquid `idle` counter; the earmark follows the supply change).

## The stSTX exchange rate

`data-stx-v2.get-stx-per-ststx()` — no arguments, **bare uint** — is:

```
active-backing = get-total-stx − get-stx-for-ststxbtc − get-stx-for-withdrawals
active-supply  = ststx-token.total-supply − data-stx-v2.get-pending-shares
rate           = active-backing × 1e6 / active-supply     (u1e6 if active-supply == 0)
```

The rate counts **only** the STX backing *active* stSTX: it excludes the STX backing
stSTXbtc, the STX reserved for withdrawals, and any shares that are mid-withdrawal.
`get-stx-per-ststx-up` is the same, rounded up (used when minting, so the protocol never
mints more than it should).

stBTC works the same way over sBTC: `data-stbtc-v1.get-sbtc-per-stbtc`.

## TVL

Read `stx-reserve-v2.get-total-stx` (bare uint) for the STX side and
`stbtc-reserve.get-total-sbtc` for the sBTC side. Splits on the STX side:
`stSTX-backing = get-total-stx − get-stx-for-ststxbtc − get-stx-for-withdrawals`;
`stSTXbtc-backing = get-stx-for-ststxbtc`.

## Integration gotchas

- **Bare uint, not `(response uint)`.** Drop the unwrap that older reserve/data getters needed.
- **Mutators are protocol-gated.** Every `lock-…`, `request-…`, `pay-…`, `return-…`
  function checks `dao.check-is-protocol(contract-caller)` — only registered protocol
  contracts (the cores, strategy, swap, rewards) can move the buckets.
