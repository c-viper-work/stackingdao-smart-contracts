// T11 + T16: shared product-suite factory + derived expectations.
//
// The three product cores are structurally identical (Clarity forces the
// triplication), so their common test cases — deposit 1:1, withdraw-idle minus
// fee, scheduled withdraw with cooldown, scheduled withdraw with fee — are
// extracted here and run against each product. Expected values are computed
// from inputs + the floor rounding rule, not hand-picked magic numbers.

import { expect, it } from 'vitest';
import { rov, rovOk, txOk, txErr } from '@clarigen/test';
import { deployer, activate } from './pox-5/pox-5-helpers';
import { accounts } from './clarigen-types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const wallet1 = accounts.wallet_1.address;
const BPS = 10000n;
const IDLE_FEE_BPS = 100n; // 1% default

/** floor(a * bps / BPS) — the Clarity rounding rule for all fee/split math. */
function take(amount: bigint, bps: bigint): bigint {
  return (amount * bps) / BPS;
}

export function productSuite(
  name: string,
  core: any,
  coreErrors: any,
  token: any,
  nft: any,
  unit: bigint,
  balanceFn: (addr: string) => bigint,
  deadShares: bigint = 0n,
) {
  const depositAmt = 5n * unit;
  const minted = depositAmt - deadShares; // H01: first deposit minus dead shares

  it(`${name}: deposit mints 1:1 at genesis`, () => {
    activate(core.identifier);
    txOk(core.deposit(depositAmt, 0n), wallet1);
    expect(rovOk(token.getBalance(wallet1))).toBe(minted);
  });

  it(`${name}: withdraw-idle pays amount minus 1% fee (derived)`, () => {
    activate(core.identifier);
    txOk(core.deposit(depositAmt, 0n), wallet1);
    const withdrawAmount = 2n * unit;
    const expectedUser = withdrawAmount - take(withdrawAmount, IDLE_FEE_BPS);
    const before = balanceFn(wallet1);
    txOk(core.withdrawIdle(withdrawAmount), wallet1);
    expect(balanceFn(wallet1)).toBe(before + expectedUser);
    expect(rovOk(token.getBalance(wallet1))).toBe(minted - withdrawAmount);
  });

  it(`${name}: scheduled withdraw: escrow, cooldown lock, then pay in full`, () => {
    activate(core.identifier);
    txOk(core.deposit(depositAmt, 0n), wallet1);
    const nftId = txOk(core.initWithdraw(2n * unit), wallet1).value;
    expect(rovOk(token.getBalance(wallet1))).toBe(minted - 2n * unit);
    expect(rovOk(nft.getOwner(nftId))).toBe(wallet1);
    // locked before the cooldown
    expect(txErr(core.withdraw(nftId), wallet1).value).toBe(coreErrors.ERR_WITHDRAW_LOCKED);
    simnet.mineEmptyBurnBlocks(11);
    const before = balanceFn(wallet1);
    txOk(core.withdraw(nftId), wallet1);
    // default scheduled fee = 0, full amount returned
    expect(balanceFn(wallet1)).toBe(before + 2n * unit);
    expect(rovOk(nft.getOwner(nftId))).toBe(null); // burned
  });

  it(`${name}: scheduled withdraw with 1% fee: user paid net (derived)`, () => {
    activate(core.identifier);
    txOk(core.setWithdrawFee(IDLE_FEE_BPS), deployer);
    txOk(core.deposit(depositAmt, 0n), wallet1);
    const nftId = txOk(core.initWithdraw(2n * unit), wallet1).value;
    simnet.mineEmptyBurnBlocks(11);
    const withdrawAmount = 2n * unit;
    const expectedUser = withdrawAmount - take(withdrawAmount, IDLE_FEE_BPS);
    const before = balanceFn(wallet1);
    txOk(core.withdraw(nftId), wallet1);
    expect(balanceFn(wallet1)).toBe(before + expectedUser);
  });
}
