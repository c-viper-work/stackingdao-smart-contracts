import * as BTC from '@scure/btc-signer';
import {
  Cl,
  encodeStructuredDataBytes,
  getAddressFromPublicKey,
  principalCV,
  serializeCV,
  signWithKey,
} from '@stacks/transactions';
import { hex } from '@scure/base';
import {
  extractErrors,
  projectErrors,
  projectFactory,
  contractFactory,
} from '@clarigen/core';
import { accounts, project } from '../clarigen-types';
import { rov, rovOk, txOk } from '@clarigen/test';
import { sha256 } from '@noble/hashes/sha2.js';
import { secp256k1 } from '@noble/curves/secp256k1.js';
import { expect } from 'vitest';

const contracts = projectFactory(project, 'simnet');
export const pox5 = contracts.pox5;
export const errorCodes = projectErrors(project).pox5;
export const testSigner = contracts.testPox5Signer;
export const testSignerErrors = extractErrors(testSigner);
export const sbtc = contracts.sbtcToken;
export const rewardsPox5V1 = contracts.rewardsPox5V1;
export const dao = contracts.dao;

export const REWARD_CYCLE_LENGTH = 100n;
export const HALF_CYCLE_LENGTH = REWARD_CYCLE_LENGTH / 2n;
export const BASIS_POINTS = 10000n;

export const deployer = accounts.deployer.address;

/** Activate a contract in the dao registry (T15: shared boilerplate). */
export function activate(addr: string) {
  txOk(dao.setContractActive({ address: addr, active: true }), deployer);
}

export function toWitnessOutput(script: Uint8Array) {
  return BTC.OutScript.encode(
    BTC.p2wsh({
      type: 'wsh',
      script,
    }),
  );
}

export function serializeLockupScript({
  stacker,
  unlockBurnHeight,
  unlockBytes,
  earlyUnlockBytes,
}: {
  stacker: string;
  unlockBurnHeight: bigint;
  unlockBytes: Uint8Array;
  earlyUnlockBytes: Uint8Array;
}) {
  const stackerEncoded = serializeCV(principalCV(stacker));
  return BTC.Script.encode([
    hex.decode(stackerEncoded),
    'DROP',
    'IF',
    Number(unlockBurnHeight),
    'CHECKLOCKTIMEVERIFY',
    'DROP',
    unlockBytes,
    'ELSE',
    earlyUnlockBytes,
    unlockBytes,
    'ENDIF',
  ]);
}

export function sbtcBalance(address: string): bigint {
  return rovOk(sbtc.getBalance(address));
}

/** Start height of the next reward cycle. */
export function getStartHeight() {
  const nextCycle = rov(pox5.currentPoxRewardCycle()) + 1n;
  return rov(pox5.rewardCycleToBurnHeight(nextCycle));
}

export function signSignerKeyGrant({
  signerManager,
  authId,
  signerSk,
}: {
  signerManager: string;
  authId: bigint;
  signerSk: Uint8Array;
}) {
  const message = Cl.tuple({
    'signer-manager': Cl.principal(signerManager),
    topic: Cl.stringAscii('grant-authorization'),
    'auth-id': Cl.uint(authId),
  });
  const fullMessage = encodeStructuredDataBytes({
    message,
    domain: Cl.tuple({
      name: Cl.stringAscii(pox5.constants.pOX_5_SIGNER_DOMAIN.name),
      version: Cl.stringAscii(pox5.constants.pOX_5_SIGNER_DOMAIN.version),
      'chain-id': Cl.uint(pox5.constants.pOX_5_SIGNER_DOMAIN.chainId),
    }),
  });
  const data = signWithKey(signerSk, hex.encode(sha256(fullMessage)));
  const signature = hex.decode(data.slice(2) + data.slice(0, 2));
  return signature;
}

export function createSignerKeyGrant({
  signerManager: staker,
  signerSk,
  authId,
}: {
  signerManager: string;
  signerSk: Uint8Array;
  authId: bigint;
}) {
  const signature = signSignerKeyGrant({
    signerManager: staker,
    authId,
    signerSk,
  });
  txOk(
    pox5.grantSignerKey({
      signerKey: secp256k1.getPublicKey(signerSk, true),
      signerSig: signature,
      signerManager: staker,
      authId,
    }),
    accounts.deployer.address,
  );
}

let grantAuthIdCounter = 1000n;

/** Create a signer key grant and return the key pair. */
export function setupSigner(signerManager: string) {
  const signerSk = secp256k1.utils.randomSecretKey();
  const signerKey = secp256k1.getPublicKey(signerSk, true);
  const authId = grantAuthIdCounter++;
  createSignerKeyGrant({
    signerManager,
    signerSk,
    authId,
  });
  return { signerSk, signerKey };
}

/** Testnet STX address for a signer key. */
export function signerAddress(signerKey: Uint8Array) {
  return getAddressFromPublicKey(signerKey, 'testnet');
}

/** Sign a per-transaction signer authorization for the signer-sig path. */
export function signPerTransactionAuth({
  signerSk,
  poxAddr,
  rewardCycle,
  topic,
  period,
  maxAmount,
  authId,
}: {
  signerSk: Uint8Array;
  poxAddr: { version: Uint8Array; hashbytes: Uint8Array };
  rewardCycle: bigint;
  topic: string;
  period: bigint | number;
  maxAmount: bigint | number;
  authId: bigint | number;
}) {
  const message = Cl.tuple({
    'pox-addr': Cl.tuple({
      version: Cl.buffer(poxAddr.version),
      hashbytes: Cl.buffer(poxAddr.hashbytes),
    }),
    'reward-cycle': Cl.uint(rewardCycle),
    topic: Cl.stringAscii(topic),
    period: Cl.uint(period),
    'auth-id': Cl.uint(authId),
    'max-amount': Cl.uint(maxAmount),
  });
  const fullMessage = encodeStructuredDataBytes({
    message,
    domain: Cl.tuple({
      name: Cl.stringAscii(pox5.constants.pOX_5_SIGNER_DOMAIN.name),
      version: Cl.stringAscii(pox5.constants.pOX_5_SIGNER_DOMAIN.version),
      'chain-id': Cl.uint(pox5.constants.pOX_5_SIGNER_DOMAIN.chainId),
    }),
  });
  const data = signWithKey(signerSk, hex.encode(sha256(fullMessage)));
  return hex.decode(data.slice(2) + data.slice(0, 2));
}

/** Register the test signer with a valid key grant. Returns the signer key. */
export function registerSigner(
  { caller }: { caller: string } = { caller: deployer },
) {
  const signerSk = secp256k1.utils.randomSecretKey();
  const signerKey = secp256k1.getPublicKey(signerSk, true);
  const authId = grantAuthIdCounter++;
  const signature = signSignerKeyGrant({
    signerManager: testSigner.identifier,
    authId,
    signerSk,
  });
  txOk(
    testSigner.registerSelf({
      signerKey,
      signerManager: testSigner.identifier,
      authId,
      signerSig: signature,
    }),
    caller,
  );
  return { signerKey, signer: testSigner.identifier };
}

/** Deploy and set up a new signer. */
export function deployTestSigner(name: string) {
  const testSigner2Id = `${accounts.deployer.address}.${name}`;
  const signerSource = simnet.getContractSource(testSigner.identifier)!;
  const testSigner2 = contractFactory(
    project.contracts.testPox5Signer,
    testSigner2Id,
  );
  const signerSk = secp256k1.utils.randomSecretKey();
  const signerKey = secp256k1.getPublicKey(signerSk, true);
  const authId = grantAuthIdCounter++;
  const signature = signSignerKeyGrant({
    signerManager: testSigner2.identifier,
    authId,
    signerSk,
  });
  simnet.deployContract(
    name,
    signerSource,
    {
      clarityVersion: 4,
    },
    accounts.deployer.address,
  );
  txOk(
    testSigner2.registerSelf({
      signerKey: signerKey,
      signerManager: testSigner2.identifier,
      authId,
      signerSig: signature,
    }),
    accounts.deployer.address,
  );

  return testSigner2;
}

export function isSignerInCycle({
  signer,
  cycle,
}: {
  signer: string;
  cycle: bigint;
}): boolean {
  return rov(pox5.getSignerSetItemForCycle({ cycle, signer })) !== null;
}

/** All stakers for the next reward cycle. */
export function getAllStakers(): string[] {
  const nextCycle = rov(pox5.currentPoxRewardCycle()) + 1n;
  return getAllStakersForCycle(nextCycle);
}

/** All stakers for a given reward cycle. */
function getAllStakersForCycle(cycle: bigint): string[] {
  const first = rov(pox5.getSignerSetFirstItemForCycle(cycle));
  let signers: string[] = [];
  let cur: string | null = first;
  if (cur) signers.push(cur);
  while (cur) {
    const item = rov(pox5.getSignerSetNextItemForCycle(cur, cycle));
    if (item) signers.push(item);
    cur = item;
  }
  return signers;
}

export function expectAllSignersHaveKeys() {
  const stakers = getAllStakers();
  for (const staker of stakers) {
    const signerKey = rov(pox5.getSignerInfo(staker));
    expect(signerKey).not.toBeNull();
  }
}

export function initPox5() {
  const INITIAL_BOND_ADMIN = 'SP000000000000000000002Q6VF78';

  txOk(
    pox5.setBurnchainParameters({
      firstBurnHeight: 0n,
      prepareCycleLength: 10n,
      rewardCycleLength: REWARD_CYCLE_LENGTH,
      beginPox5RewardCycle: 1n,
    }),
    deployer,
  );
  txOk(pox5.setBondAdmin(deployer), INITIAL_BOND_ADMIN);
}

/**
 * Ensure rewards keeper is initialized (idempotent — safe across test files
 * that share simnet state). H02: rewards contracts require a keeper for folding.
 */
export function ensureRewardsKeepers() {
  const r7 = contracts.rewardsPox5V1;
  const rStx = contracts.rewardsStxV1;
  if (rov(r7.getKeeper()) === null) {
    txOk(r7.initialize(deployer), deployer);
  }
  if (rov(rStx.getKeeper()) === null) {
    txOk(rStx.initialize(deployer), deployer);
  }
}

/**
 * Fund rewards through the real entrypoint: transfer sBTC into rewards-pox5-v1 and
 * process. Ensures the keeper is initialized so folding works (H02).
 */
export function fundRewards(amount: bigint) {
  ensureRewardsKeepers();
  txOk(
    sbtc.transfer({ recipient: rewardsPox5V1.identifier, amount, sender: deployer, memo: null }),
    deployer,
  );
  txOk(rewardsPox5V1.processRewards(), deployer);
}
