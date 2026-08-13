import { beforeEach, expect, it } from 'vitest';
import { rov, rovOk, txOk } from '@clarigen/test';
import { extractErrors, projectFactory } from '@clarigen/core';
import { sbtc, sbtcBalance, deployer, activate } from './pox-5/pox-5-helpers';
import { SBTC, STX } from './test-helpers';
import { accounts, project } from './clarigen-types';
import { productSuite } from './product-suite';

const c = projectFactory(project, 'simnet');
const core = c.stackingDaoCoreStstxbtcV1;
const coreErrors = extractErrors(core);
const token = c.ststxbtcToken;
const tracking = c.ststxbtcTrackingV1;
const reserve = c.stxReserve;
const coreStx = c.stackingDaoCoreStxV1;
const dataStx = c.dataStxV1;
const dao = c.dao;

const wallet1 = accounts.wallet_1.address;
const wallet2 = accounts.wallet_2.address;

function stxBalance(addr: string): bigint {
  return simnet.getAssetsMap().get('STX')?.get(addr) ?? 0n;
}

// T11: common cases via the shared factory (backfills the scheduled-withdraw +
// scheduled-with-fee cases stSTXbtc lacked). T16: derived expectations.
productSuite('stSTXbtc', core, coreErrors, token, c.ststxbtcWithdrawNftV2, STX, stxBalance);

// Product-specific: stSTXbtc tracker + carve-out

beforeEach(() => {
  activate(core.identifier);
  activate(token.identifier);
});

it('deposit mints stSTXbtc 1:1 and tracks the holder balance', () => {
  txOk(core.deposit(5n * STX, 0n), wallet1);
  expect(rovOk(token.getBalance(wallet1))).toBe(5n * STX);
  expect(rov(reserve.getTotalStx())).toBe(5n * STX);
  expect(rov(tracking.getTotalSupply())).toBe(5n * STX);
  expect(rov(tracking.getHolderInfo(wallet1)).amount).toBe(5n * STX);
});

it('sBTC rewards distribute pro-rata; each holder claims their share (derived)', () => {
  txOk(core.deposit(6n * STX, 0n), wallet1);
  txOk(core.deposit(4n * STX, 0n), wallet2);
  expect(rov(tracking.getTotalSupply())).toBe(10n * STX);

  txOk(tracking.addRewards(SBTC), deployer);

  // 60/40 split derived from supply
  const share1 = (6n * SBTC) / 10n;
  const share2 = (4n * SBTC) / 10n;
  expect(rov(tracking.getPendingRewards(wallet1))).toBe(share1);
  expect(rov(tracking.getPendingRewards(wallet2))).toBe(share2);

  const w1Before = sbtcBalance(wallet1);
  txOk(tracking.claimPendingRewards(), wallet1);
  expect(sbtcBalance(wallet1) - w1Before).toBe(share1);
  expect(rov(tracking.getPendingRewards(wallet1))).toBe(0n);
});

it('rewards already accrued are not moved by a later deposit (snapshot crystallizes)', () => {
  txOk(core.deposit(10n * STX, 0n), wallet1);
  txOk(tracking.addRewards(SBTC), deployer);
  txOk(core.deposit(10n * STX, 0n), wallet2);

  expect(rov(tracking.getPendingRewards(wallet1))).toBe(SBTC);
  expect(rov(tracking.getPendingRewards(wallet2))).toBe(0n);
});

it('stSTXbtc deposits do not pollute the stSTX ratio (carve-out)', () => {
  activate(coreStx.identifier);

  txOk(coreStx.deposit(5n * STX, 0n), wallet1);
  expect(rov(dataStx.getStxPerStstx())).toBe(STX);

  txOk(core.deposit(50n * STX, 0n), wallet2);
  expect(rov(dataStx.getStxPerStstx())).toBe(STX); // unchanged
});
