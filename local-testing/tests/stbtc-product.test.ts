import { expect, it } from 'vitest';
import { rov, txOk } from '@clarigen/test';
import { extractErrors, projectFactory } from '@clarigen/core';
import { sbtc, sbtcBalance, deployer, activate } from './pox-5/pox-5-helpers';
import { SBTC } from './test-helpers';
import { accounts, project } from './clarigen-types';
import { productSuite } from './product-suite';

const c = projectFactory(project, 'simnet');
const core = c.stackingDaoCoreStbtcV1;
const coreErrors = extractErrors(core);
const token = c.stbtcToken;
const reserve = c.stbtcReserve;
const data = c.dataStbtcV1;

const wallet1 = accounts.wallet_1.address;

// T11: common cases (deposit, withdraw-idle, scheduled withdraw, fee) via the
// shared factory. T16: expectations derived from inputs + floor rounding.
productSuite('stBTC', core, coreErrors, token, c.stbtcWithdrawNft, SBTC, sbtcBalance, 1000n);

// Product-specific: stBTC ratio mechanics

it('stBTC ratio rises when the reserve gains sBTC (derived)', () => {
  activate(core.identifier);
  txOk(core.deposit(5n * SBTC, 0n), wallet1);
  txOk(sbtc.transfer({ recipient: reserve.identifier, amount: SBTC, sender: deployer, memo: null }), deployer);
  // 6 sBTC backing 5 stBTC: ratio = floor(6 * denominator / 5)
  expect(rov(data.getSbtcPerStbtc())).toBe((6n * SBTC) / 5n);
});
