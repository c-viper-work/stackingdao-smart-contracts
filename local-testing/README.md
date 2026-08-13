# StackingDAO — Local Testing Environment

A [Clarinet](https://github.com/hirosystems/clarinet) simnet project for exercising the StackingDAO PoX-5 contracts locally, with a small set of example tests to build on.

Unlike [`../mainnet/`](../mainnet/) — which holds the *exact* deployed sources — the contracts here are a **testable set**: the same logic, plus a few test-only helpers (the token contracts expose a `test-mint`) and the predecessor contracts (`sbtc-token`, older tokens/tracking) that the current contracts still reference. They compile and run at **epoch 4.0**, each declared at its real mainnet clarity version — the latest contracts are Clarity 6, and a few still-referenced older tokens are genuinely Clarity 2/3 (you can't retro-upgrade an immutable on-chain contract).

## Prerequisites

- [Clarinet](https://docs.hiro.so/clarinet) (for `clarinet check`)
- Node.js v18+
- Familiarity with [Clarity](references/sip-033-clarity4.md) and [SIP-010](references/sip-010-fungible-token-standard.md) (bundled under `references/`)

## Setup

```bash
cd local-testing
pnpm install          # installs the test toolchain (clarinet-sdk, vitest, clarigen)
```

## Run the tests

```bash
pnpm test                                 # run the whole suite
pnpm test -- tests/ststx-product.test.ts  # a single file
```

`simnet` is provided globally by `vitest-environment-clarinet`; each test registers the contracts it needs as DAO protocols (`dao.set-contract-active`), seeds balances, and calls the entrypoints. See [`tests/product-suite.ts`](tests/product-suite.ts) for the shared deposit/withdraw/ratio pattern the product tests build on.

## Tests included

A small product-level suite — each exercises deposit → mint → ratio → withdraw for one product:

| File | What it covers |
|---|---|
| `tests/ststx-product.test.ts` | **Start here** — stSTX: STX deposit → stSTX, ratio rises as the reserve gains STX, withdraw |
| `tests/ststxbtc-product.test.ts` | stSTXbtc: the sBTC-reward liquid-staking product |
| `tests/stbtc-product.test.ts` | stBTC: sBTC deposit → stBTC |

## Layout

```
local-testing/
├── Clarinet.toml            # contract manifest (paths + clarity_version/epoch per contract)
├── contracts/               # the testable contract set (data/ governance/ products/ rewards/ staking/ tokens/ traits/ vendor/)
├── tests/                   # vitest tests (above)
├── references/              # SIP-010, SIP-033 (Clarity 4)
├── settings/Devnet.toml     # simnet accounts
└── package.json vitest.config.js
```

For the exact deployed sources and their explorer links, see [`../mainnet/`](../mainnet/). For how the protocol works, see [`../docs/`](../docs/).
