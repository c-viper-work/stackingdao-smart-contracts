import { expect, it } from 'vitest';
import { rov, txOk } from '@clarigen/test';
import { extractErrors, projectFactory } from '@clarigen/core';
import { deployer, activate } from './pox-5/pox-5-helpers';
import { STX } from './test-helpers';
import { accounts, project } from './clarigen-types';
import { productSuite } from './product-suite';

const c = projectFactory(project, 'simnet');
const core = c.stackingDaoCoreStxV1;
const coreErrors = extractErrors(core);
const token = c.ststxToken;
const reserve = c.stxReserve;
const data = c.dataStxV1;

const wallet1 = accounts.wallet_1.address;

function stxBalance(addr: string): bigint {
  return simnet.getAssetsMap().get('STX')?.get(addr) ?? 0n;
}

// T11: common cases via the shared factory. T16: derived expectations.
productSuite('stSTX', core, coreErrors, token, c.ststxWithdrawNftV3, STX, stxBalance, 1000n);

// Product-specific: stSTX ratio mechanics

it('stSTX ratio rises when the reserve gains STX (derived)', () => {
  activate(core.identifier);
  txOk(core.deposit(5n * STX, 0n), wallet1);
  simnet.transferSTX(Number(STX), reserve.identifier, deployer);
  // 6 STX backing 5 stSTX: ratio = floor(6 * denominator / 5)
  expect(rov(data.getStxPerStstx())).toBe((6n * STX) / 5n);
});
