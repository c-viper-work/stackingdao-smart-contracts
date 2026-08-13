import { secp256k1 } from '@noble/curves/secp256k1.js';
import { randomBytes } from '@noble/hashes/utils.js';
import { ripemd160 } from '@noble/hashes/legacy.js';
import { getAddressFromPublicKey } from '@stacks/transactions';
import * as dnum from 'dnum';
import fc from 'fast-check';

// Named decimal units. sBTC/stBTC are 8-dec; STX/stSTX/stSTXbtc/sDAO are 6-dec.
// Prefer these over a bare "ONE" constant, which has meant both 1e8 and 1e6 in
// different files (T2).
export const SBTC = 100_000_000n; // 1 sBTC / stBTC
export const STX = 1_000_000n; // 1 STX / stSTX / stSTXbtc / sDAO
export const SDAO = 1_000_000n;

export function randomSecretKey(seed?: Uint8Array) {
  return secp256k1.utils.randomSecretKey(seed);
}

export function randomPublicKey(seed?: Uint8Array) {
  return secp256k1.getPublicKey(randomSecretKey(seed), true);
}

export function randomStacksAddress(
  network: 'mainnet' | 'testnet' = 'testnet',
  seed?: Uint8Array,
) {
  const pk = randomPublicKey(seed);
  return getAddressFromPublicKey(pk, network);
}

export function randomPoxAddress(seed?: Uint8Array) {
  const hash = ripemd160(seed ?? randomBytes(32));
  return {
    version: Uint8Array.from([0x01]),
    hashbytes: hash,
  };
}

export function mineUntil(blockHeight: number | bigint) {
  simnet.mineEmptyBurnBlocks(Number(blockHeight) - simnet.burnBlockHeight);
}

export function stxToUStx(stx: number | bigint): bigint {
  return dnum.mul(stx, 1_000_000n)[0];
}

const seedGen = fc.uint8Array({ maxLength: 48, minLength: 48 });

const allowedValues = [
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // a-z
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A-Z
  ...Array.from({ length: 10 }, (_, i) => String(i)), // 0-9
  '-',
  '_',
];
const contractNameUnits = fc.constantFrom(...allowedValues);

export const randomContractNameGen = fc
  .string({ minLength: 1, maxLength: 40, unit: contractNameUnits })
  // contract names must start with a letter
  .filter((s) => /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(s));

export const randomStacksAddressGen = seedGen.map((seed) =>
  randomStacksAddress('testnet', seed),
);

export const randomPrincipalGen = fc
  .record({
    useContract: fc.boolean(),
    contractName: randomContractNameGen,
    address: randomStacksAddressGen,
  })
  .map(({ useContract, contractName, address }) => {
    if (useContract) {
      return `${address}.${contractName}`;
    }
    return address;
  });
