import type {
  TypedAbiArg,
  TypedAbiFunction,
  TypedAbiMap,
  TypedAbiVariable,
  Response,
} from "@clarigen/core";

export const contracts = {
  commissionSbtcV1: {
    functions: {
      addCommission: {
        name: "add-commission",
        access: "public",
        args: [
          { name: "sbtc-amount", type: "uint128" },
          { name: "staking-end-block", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          sbtcAmount: TypedAbiArg<number | bigint, "sbtcAmount">,
          stakingEndBlock: TypedAbiArg<number | bigint, "stakingEndBlock">,
        ],
        Response<bigint, bigint>
      >,
      setSignerBasispoints: {
        name: "set-signer-basispoints",
        access: "public",
        args: [{ name: "bps", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [bps: TypedAbiArg<number | bigint, "bps">],
        Response<boolean, bigint>
      >,
      setStakingBasispoints: {
        name: "set-staking-basispoints",
        access: "public",
        args: [{ name: "bps", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [bps: TypedAbiArg<number | bigint, "bps">],
        Response<boolean, bigint>
      >,
      withdrawTreasury: {
        name: "withdraw-treasury",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      getSbtcBalance: {
        name: "get-sbtc-balance",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getSignerBasispoints: {
        name: "get-signer-basispoints",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStakingBasispoints: {
        name: "get-staking-basispoints",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      DENOMINATOR_BPS: {
        name: "DENOMINATOR_BPS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_TOO_MUCH: {
        name: "ERR_TOO_MUCH",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      signerBasispoints: {
        name: "signer-basispoints",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      stakingBasispoints: {
        name: "staking-basispoints",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      DENOMINATOR_BPS: 10_000n,
      ERR_TOO_MUCH: {
        isOk: false,
        value: 29_001n,
      },
      signerBasispoints: 10_000n,
      stakingBasispoints: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "commission-sbtc-v1",
  },
  consensusStakerTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "consensus-staker-trait",
  },
  dao: {
    functions: {
      checkIsAdmin: {
        name: "check-is-admin",
        access: "public",
        args: [{ name: "contract", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [contract: TypedAbiArg<string, "contract">],
        Response<boolean, bigint>
      >,
      checkIsEnabled: {
        name: "check-is-enabled",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      checkIsProtocol: {
        name: "check-is-protocol",
        access: "public",
        args: [{ name: "contract", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [contract: TypedAbiArg<string, "contract">],
        Response<boolean, bigint>
      >,
      setAdmin: {
        name: "set-admin",
        access: "public",
        args: [
          { name: "address", type: "principal" },
          { name: "active", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          address: TypedAbiArg<string, "address">,
          active: TypedAbiArg<boolean, "active">,
        ],
        Response<boolean, bigint>
      >,
      setContractActive: {
        name: "set-contract-active",
        access: "public",
        args: [
          { name: "address", type: "principal" },
          { name: "active", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          address: TypedAbiArg<string, "address">,
          active: TypedAbiArg<boolean, "active">,
        ],
        Response<boolean, bigint>
      >,
      setContractsEnabled: {
        name: "set-contracts-enabled",
        access: "public",
        args: [{ name: "enabled", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [enabled: TypedAbiArg<boolean, "enabled">],
        Response<boolean, bigint>
      >,
      getAdmin: {
        name: "get-admin",
        access: "read_only",
        args: [{ name: "address", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[address: TypedAbiArg<string, "address">], boolean>,
      getAdminCount: {
        name: "get-admin-count",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getContractActive: {
        name: "get-contract-active",
        access: "read_only",
        args: [{ name: "address", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[address: TypedAbiArg<string, "address">], boolean>,
      getContractsEnabled: {
        name: "get-contracts-enabled",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
    },
    maps: {
      admins: {
        name: "admins",
        key: { tuple: [{ name: "address", type: "principal" }] },
        value: { tuple: [{ name: "active", type: "bool" }] },
      } as TypedAbiMap<
        {
          address: string;
        },
        {
          active: boolean;
        }
      >,
      contracts: {
        name: "contracts",
        key: { tuple: [{ name: "address", type: "principal" }] },
        value: { tuple: [{ name: "active", type: "bool" }] },
      } as TypedAbiMap<
        {
          address: string;
        },
        {
          active: boolean;
        }
      >,
    },
    variables: {
      ERR_CONTRACTS_DISABLED: {
        name: "ERR_CONTRACTS_DISABLED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INACTIVE_CONTRACT: {
        name: "ERR_INACTIVE_CONTRACT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_LAST_ADMIN: {
        name: "ERR_LAST_ADMIN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_ADMIN: {
        name: "ERR_NOT_ADMIN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      adminCount: {
        name: "admin-count",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      contractsEnabled: {
        name: "contracts-enabled",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
    },
    constants: {
      ERR_CONTRACTS_DISABLED: {
        isOk: false,
        value: 20_002n,
      },
      ERR_INACTIVE_CONTRACT: {
        isOk: false,
        value: 20_003n,
      },
      ERR_LAST_ADMIN: {
        isOk: false,
        value: 20_004n,
      },
      ERR_NOT_ADMIN: {
        isOk: false,
        value: 20_001n,
      },
      adminCount: 1n,
      contractsEnabled: true,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "dao",
  },
  dataPoolsStbtcV1: {
    functions: {
      setPoolCommission: {
        name: "set-pool-commission",
        access: "public",
        args: [{ name: "commission", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [commission: TypedAbiArg<number | bigint, "commission">],
        Response<boolean, bigint>
      >,
      setPoolOwnerReceiver: {
        name: "set-pool-owner-receiver",
        access: "public",
        args: [{ name: "receiver", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [receiver: TypedAbiArg<string, "receiver">],
        Response<boolean, bigint>
      >,
      setPoolOwnerShare: {
        name: "set-pool-owner-share",
        access: "public",
        args: [{ name: "share", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [share: TypedAbiArg<number | bigint, "share">],
        Response<boolean, bigint>
      >,
      getPoolCommission: {
        name: "get-pool-commission",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getPoolOwnerReceiver: {
        name: "get-pool-owner-receiver",
        access: "read_only",
        args: [],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<[], string | null>,
      getPoolOwnerShare: {
        name: "get-pool-owner-share",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      DENOMINATOR_BPS: {
        name: "DENOMINATOR_BPS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_MAX_COMMISSION: {
        name: "ERR_MAX_COMMISSION",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_POOL_OWNER_SHARE: {
        name: "ERR_POOL_OWNER_SHARE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      MAX_COMMISSION: {
        name: "MAX_COMMISSION",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      poolCommission: {
        name: "pool-commission",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      poolOwnerReceiver: {
        name: "pool-owner-receiver",
        type: {
          optional: "principal",
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
      poolOwnerShare: {
        name: "pool-owner-share",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      DENOMINATOR_BPS: 10_000n,
      ERR_MAX_COMMISSION: {
        isOk: false,
        value: 21_002n,
      },
      ERR_POOL_OWNER_SHARE: {
        isOk: false,
        value: 21_001n,
      },
      MAX_COMMISSION: 4_000n,
      poolCommission: 1_000n,
      poolOwnerReceiver: null,
      poolOwnerShare: 7_500n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "data-pools-stbtc-v1",
  },
  dataStbtcV1: {
    functions: {
      computeRatio: {
        name: "compute-ratio",
        access: "private",
        args: [{ name: "round-up", type: "bool" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[roundUp: TypedAbiArg<boolean, "roundUp">], bigint>,
      addPendingShares: {
        name: "add-pending-shares",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<boolean, bigint>
      >,
      removePendingShares: {
        name: "remove-pending-shares",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<boolean, bigint>
      >,
      getPendingShares: {
        name: "get-pending-shares",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getSbtcPerStbtc: {
        name: "get-sbtc-per-stbtc",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getSbtcPerStbtcUp: {
        name: "get-sbtc-per-stbtc-up",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      dENOMINATOR_8: {
        name: "DENOMINATOR_8",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      pendingShares: {
        name: "pending-shares",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      dENOMINATOR_8: 100_000_000n,
      pendingShares: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "data-stbtc-v1",
  },
  dataStxV1: {
    functions: {
      computeRatio: {
        name: "compute-ratio",
        access: "private",
        args: [{ name: "round-up", type: "bool" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[roundUp: TypedAbiArg<boolean, "roundUp">], bigint>,
      addPendingShares: {
        name: "add-pending-shares",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<boolean, bigint>
      >,
      removePendingShares: {
        name: "remove-pending-shares",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<boolean, bigint>
      >,
      getPendingShares: {
        name: "get-pending-shares",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxPerStstx: {
        name: "get-stx-per-ststx",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxPerStstxUp: {
        name: "get-stx-per-ststx-up",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      dENOMINATOR_6: {
        name: "DENOMINATOR_6",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      pendingShares: {
        name: "pending-shares",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      dENOMINATOR_6: 1_000_000n,
      pendingShares: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "data-stx-v1",
  },
  dataStxV2: {
    functions: {
      computeRatio: {
        name: "compute-ratio",
        access: "private",
        args: [{ name: "round-up", type: "bool" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[roundUp: TypedAbiArg<boolean, "roundUp">], bigint>,
      addPendingShares: {
        name: "add-pending-shares",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<boolean, bigint>
      >,
      removePendingShares: {
        name: "remove-pending-shares",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<boolean, bigint>
      >,
      getPendingShares: {
        name: "get-pending-shares",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxPerStstx: {
        name: "get-stx-per-ststx",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxPerStstxUp: {
        name: "get-stx-per-ststx-up",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      dENOMINATOR_6: {
        name: "DENOMINATOR_6",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      pendingShares: {
        name: "pending-shares",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      dENOMINATOR_6: 1_000_000n,
      pendingShares: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "data-stx-v2",
  },
  nativePoolSignerManager: {
    functions: {
      authorizeAdmin: {
        name: "authorize-admin",
        access: "private",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      claimRewards: {
        name: "claim-rewards",
        access: "public",
        args: [
          {
            name: "bond-periods",
            type: { list: { type: "uint128", length: 6 } },
          },
          { name: "reward-cycle", type: "uint128" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  {
                    name: "bond-rewards",
                    type: {
                      list: {
                        type: {
                          tuple: [
                            { name: "bond-index", type: "uint128" },
                            { name: "earned", type: "uint128" },
                            { name: "rewards-per-token", type: "uint128" },
                          ],
                        },
                        length: 6,
                      },
                    },
                  },
                  { name: "bond-totals", type: "uint128" },
                  {
                    name: "stx-rewards",
                    type: {
                      tuple: [
                        { name: "earned", type: "uint128" },
                        { name: "rewards-per-token", type: "uint128" },
                      ],
                    },
                  },
                  { name: "total-rewards", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          bondPeriods: TypedAbiArg<number | bigint[], "bondPeriods">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
        ],
        Response<
          {
            bondRewards: {
              bondIndex: bigint;
              earned: bigint;
              rewardsPerToken: bigint;
            }[];
            bondTotals: bigint;
            stxRewards: {
              earned: bigint;
              rewardsPerToken: bigint;
            };
            totalRewards: bigint;
          },
          bigint
        >
      >,
      claimStakerRewards: {
        name: "claim-staker-rewards",
        access: "public",
        args: [
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        Response<bigint, bigint>
      >,
      registerSelf: {
        name: "register-self",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "signer-key", type: { buffer: { length: 33 } } },
          { name: "auth-id", type: "uint128" },
          { name: "signer-sig", type: { buffer: { length: 65 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          signerKey: TypedAbiArg<Uint8Array, "signerKey">,
          authId: TypedAbiArg<number | bigint, "authId">,
          signerSig: TypedAbiArg<Uint8Array, "signerSig">,
        ],
        Response<boolean, bigint>
      >,
      validateStake_x: {
        name: "validate-stake!",
        access: "public",
        args: [
          { name: "staker", type: "principal" },
          { name: "first-index", type: "uint128" },
          { name: "num-indexes", type: "uint128" },
          { name: "amount-ustx", type: "uint128" },
          { name: "amount-sats", type: "uint128" },
          { name: "is-bond", type: "bool" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          firstIndex: TypedAbiArg<number | bigint, "firstIndex">,
          numIndexes: TypedAbiArg<number | bigint, "numIndexes">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          amountSats: TypedAbiArg<number | bigint, "amountSats">,
          isBond: TypedAbiArg<boolean, "isBond">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      isAdmin: {
        name: "is-admin",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {},
    variables: {
      ERR_NO_CLAIMABLE_REWARDS: {
        name: "ERR_NO_CLAIMABLE_REWARDS",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_STAKER_NOT_ALLOWED: {
        name: "ERR_STAKER_NOT_ALLOWED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_UNAUTHORIZED_ADMIN: {
        name: "ERR_UNAUTHORIZED_ADMIN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
    },
    constants: {
      ERR_NO_CLAIMABLE_REWARDS: {
        isOk: false,
        value: 37_003n,
      },
      ERR_STAKER_NOT_ALLOWED: {
        isOk: false,
        value: 37_002n,
      },
      ERR_UNAUTHORIZED_ADMIN: {
        isOk: false,
        value: 37_001n,
      },
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "native-pool-signer-manager",
  },
  nativePoolV1: {
    functions: {
      delegate: {
        name: "delegate",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "amount-ustx", type: "uint128" },
          { name: "num-cycles", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          numCycles: TypedAbiArg<number | bigint, "numCycles">,
        ],
        Response<bigint, bigint>
      >,
      delegateUpdate: {
        name: "delegate-update",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "old-signer-manager", type: "trait_reference" },
          { name: "cycles-to-extend", type: "uint128" },
          { name: "amount-increase", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          oldSignerManager: TypedAbiArg<string, "oldSignerManager">,
          cyclesToExtend: TypedAbiArg<number | bigint, "cyclesToExtend">,
          amountIncrease: TypedAbiArg<number | bigint, "amountIncrease">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      initialize: {
        name: "initialize",
        access: "public",
        args: [{ name: "sm", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [sm: TypedAbiArg<string, "sm">],
        Response<boolean, bigint>
      >,
      undelegate: {
        name: "undelegate",
        access: "public",
        args: [{ name: "old-signer-manager", type: "trait_reference" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [oldSignerManager: TypedAbiArg<string, "oldSignerManager">],
        Response<boolean, bigint>
      >,
      currentCycle: {
        name: "current-cycle",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      isDelegating: {
        name: "is-delegating",
        access: "read_only",
        args: [
          { name: "staker", type: "principal" },
          { name: "sm", type: "principal" },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [staker: TypedAbiArg<string, "staker">, sm: TypedAbiArg<string, "sm">],
        boolean
      >,
    },
    maps: {
      delegating: {
        name: "delegating",
        key: {
          tuple: [
            { name: "sm", type: "principal" },
            { name: "staker", type: "principal" },
          ],
        },
        value: "bool",
      } as TypedAbiMap<
        {
          sm: string;
          staker: string;
        },
        boolean
      >,
    },
    variables: {
      ERR_ALREADY_INITIALIZED: {
        name: "ERR_ALREADY_INITIALIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WRONG_SIGNER_MANAGER: {
        name: "ERR_WRONG_SIGNER_MANAGER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      nativePoolSm: {
        name: "native-pool-sm",
        type: {
          optional: "principal",
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_ALREADY_INITIALIZED: {
        isOk: false,
        value: 36_003n,
      },
      ERR_WRONG_SIGNER_MANAGER: {
        isOk: false,
        value: 36_002n,
      },
      nativePoolSm: null,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "native-pool-v1",
  },
  pox5: {
    functions: {
      addSignerToSetForCycle: {
        name: "add-signer-to-set-for-cycle",
        access: "private",
        args: [
          { name: "signer", type: "principal" },
          { name: "cycle", type: "uint128" },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          cycle: TypedAbiArg<number | bigint, "cycle">,
        ],
        boolean
      >,
      addStakerToBond: {
        name: "add-staker-to-bond",
        access: "private",
        args: [
          {
            name: "staker-item",
            type: {
              tuple: [
                { name: "max-sats", type: "uint128" },
                { name: "staker", type: "principal" },
              ],
            },
          },
          {
            name: "accumulator-res",
            type: {
              response: {
                ok: {
                  tuple: [
                    { name: "bond-index", type: "uint128" },
                    { name: "sum-max-sats", type: "uint128" },
                  ],
                },
                error: "uint128",
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "bond-index", type: "uint128" },
                  { name: "sum-max-sats", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          stakerItem: TypedAbiArg<
            {
              maxSats: number | bigint;
              staker: string;
            },
            "stakerItem"
          >,
          accumulatorRes: TypedAbiArg<
            Response<
              {
                bondIndex: number | bigint;
                sumMaxSats: number | bigint;
              },
              number | bigint
            >,
            "accumulatorRes"
          >,
        ],
        Response<
          {
            bondIndex: bigint;
            sumMaxSats: bigint;
          },
          bigint
        >
      >,
      addStakerToBondCycles: {
        name: "add-staker-to-bond-cycles",
        access: "private",
        args: [
          { name: "staker", type: "principal" },
          { name: "signer", type: "principal" },
          { name: "bond-index", type: "uint128" },
          { name: "first-reward-cycle", type: "uint128" },
          { name: "num-cycles", type: "uint128" },
          { name: "amount-sats", type: "uint128" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-sats", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          signer: TypedAbiArg<string, "signer">,
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          firstRewardCycle: TypedAbiArg<number | bigint, "firstRewardCycle">,
          numCycles: TypedAbiArg<number | bigint, "numCycles">,
          amountSats: TypedAbiArg<number | bigint, "amountSats">,
        ],
        Response<
          {
            amountSats: bigint;
            bondIndex: bigint;
            firstRewardCycle: bigint;
            signer: string;
            staker: string;
          },
          bigint
        >
      >,
      addStakerToBondForCycle: {
        name: "add-staker-to-bond-for-cycle",
        access: "private",
        args: [
          { name: "cycle-index", type: "uint128" },
          {
            name: "accumulator-res",
            type: {
              response: {
                ok: {
                  tuple: [
                    { name: "amount-sats", type: "uint128" },
                    { name: "bond-index", type: "uint128" },
                    { name: "first-reward-cycle", type: "uint128" },
                    { name: "signer", type: "principal" },
                    { name: "staker", type: "principal" },
                  ],
                },
                error: "uint128",
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-sats", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, "cycleIndex">,
          accumulatorRes: TypedAbiArg<
            Response<
              {
                amountSats: number | bigint;
                bondIndex: number | bigint;
                firstRewardCycle: number | bigint;
                signer: string;
                staker: string;
              },
              number | bigint
            >,
            "accumulatorRes"
          >,
        ],
        Response<
          {
            amountSats: bigint;
            bondIndex: bigint;
            firstRewardCycle: bigint;
            signer: string;
            staker: string;
          },
          bigint
        >
      >,
      addStakerToSignerCycles: {
        name: "add-staker-to-signer-cycles",
        access: "private",
        args: [
          { name: "staker", type: "principal" },
          { name: "signer", type: "principal" },
          { name: "first-reward-cycle", type: "uint128" },
          { name: "num-cycles", type: "uint128" },
          { name: "amount-ustx", type: "uint128" },
          { name: "is-stx-staking", type: "bool" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-ustx", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "is-stx-staking", type: "bool" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          signer: TypedAbiArg<string, "signer">,
          firstRewardCycle: TypedAbiArg<number | bigint, "firstRewardCycle">,
          numCycles: TypedAbiArg<number | bigint, "numCycles">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          isStxStaking: TypedAbiArg<boolean, "isStxStaking">,
        ],
        Response<
          {
            amountUstx: bigint;
            firstRewardCycle: bigint;
            isStxStaking: boolean;
            signer: string;
            staker: string;
          },
          bigint
        >
      >,
      addStakerToSignerForCycle: {
        name: "add-staker-to-signer-for-cycle",
        access: "private",
        args: [
          { name: "cycle-index", type: "uint128" },
          {
            name: "accumulator-res",
            type: {
              response: {
                ok: {
                  tuple: [
                    { name: "amount-ustx", type: "uint128" },
                    { name: "first-reward-cycle", type: "uint128" },
                    { name: "is-stx-staking", type: "bool" },
                    { name: "signer", type: "principal" },
                    { name: "staker", type: "principal" },
                  ],
                },
                error: "uint128",
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-ustx", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "is-stx-staking", type: "bool" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, "cycleIndex">,
          accumulatorRes: TypedAbiArg<
            Response<
              {
                amountUstx: number | bigint;
                firstRewardCycle: number | bigint;
                isStxStaking: boolean;
                signer: string;
                staker: string;
              },
              number | bigint
            >,
            "accumulatorRes"
          >,
        ],
        Response<
          {
            amountUstx: bigint;
            firstRewardCycle: bigint;
            isStxStaking: boolean;
            signer: string;
            staker: string;
          },
          bigint
        >
      >,
      assertActiveBondIncluded: {
        name: "assert-active-bond-included",
        access: "private",
        args: [
          { name: "offset", type: "uint128" },
          {
            name: "acc-res",
            type: {
              response: {
                ok: {
                  tuple: [
                    {
                      name: "bond-periods",
                      type: { list: { type: "uint128", length: 6 } },
                    },
                    { name: "calculation-height", type: "uint128" },
                    { name: "latest-bond-index", type: "uint128" },
                  ],
                },
                error: "uint128",
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  {
                    name: "bond-periods",
                    type: { list: { type: "uint128", length: 6 } },
                  },
                  { name: "calculation-height", type: "uint128" },
                  { name: "latest-bond-index", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          offset: TypedAbiArg<number | bigint, "offset">,
          accRes: TypedAbiArg<
            Response<
              {
                bondPeriods: number | bigint[];
                calculationHeight: number | bigint;
                latestBondIndex: number | bigint;
              },
              number | bigint
            >,
            "accRes"
          >,
        ],
        Response<
          {
            bondPeriods: bigint[];
            calculationHeight: bigint;
            latestBondIndex: bigint;
          },
          bigint
        >
      >,
      calculateBondRewards: {
        name: "calculate-bond-rewards",
        access: "private",
        args: [
          { name: "bond-index", type: "uint128" },
          {
            name: "accumulator-res",
            type: {
              response: {
                ok: {
                  tuple: [
                    { name: "available-rewards", type: "uint128" },
                    { name: "calculation-height", type: "uint128" },
                    { name: "last-bond-index", type: { optional: "uint128" } },
                    {
                      name: "last-bond-stx-value-ratio",
                      type: { optional: "uint128" },
                    },
                    { name: "reward-cycle", type: "uint128" },
                  ],
                },
                error: "uint128",
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "available-rewards", type: "uint128" },
                  { name: "calculation-height", type: "uint128" },
                  { name: "last-bond-index", type: { optional: "uint128" } },
                  {
                    name: "last-bond-stx-value-ratio",
                    type: { optional: "uint128" },
                  },
                  { name: "reward-cycle", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          accumulatorRes: TypedAbiArg<
            Response<
              {
                availableRewards: number | bigint;
                calculationHeight: number | bigint;
                lastBondIndex: number | bigint | null;
                lastBondStxValueRatio: number | bigint | null;
                rewardCycle: number | bigint;
              },
              number | bigint
            >,
            "accumulatorRes"
          >,
        ],
        Response<
          {
            availableRewards: bigint;
            calculationHeight: bigint;
            lastBondIndex: bigint | null;
            lastBondStxValueRatio: bigint | null;
            rewardCycle: bigint;
          },
          bigint
        >
      >,
      getL1LockupSummary: {
        name: "get-l1-lockup-summary",
        access: "private",
        args: [
          {
            name: "lockup",
            type: {
              tuple: [
                { name: "amount", type: "uint128" },
                { name: "header", type: { buffer: { length: 80 } } },
                { name: "height", type: "uint128" },
                {
                  name: "leaf-hashes",
                  type: {
                    list: { type: { buffer: { length: 32 } }, length: 14 },
                  },
                },
                { name: "output-index", type: "uint128" },
                { name: "tx", type: { buffer: { length: 100000 } } },
                { name: "tx-count", type: "uint128" },
                { name: "tx-index", type: "uint128" },
                { name: "unlock-burn-height", type: "uint128" },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              { name: "output-index", type: "uint128" },
              { name: "txid", type: { buffer: { length: 32 } } },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          lockup: TypedAbiArg<
            {
              amount: number | bigint;
              header: Uint8Array;
              height: number | bigint;
              leafHashes: Uint8Array[];
              outputIndex: number | bigint;
              tx: Uint8Array;
              txCount: number | bigint;
              txIndex: number | bigint;
              unlockBurnHeight: number | bigint;
            },
            "lockup"
          >,
        ],
        {
          outputIndex: bigint;
          txid: Uint8Array;
        }
      >,
      matchUintInList: {
        name: "match-uint-in-list",
        access: "private",
        args: [
          { name: "item", type: "uint128" },
          {
            name: "acc",
            type: {
              tuple: [
                { name: "found", type: "bool" },
                { name: "needle", type: "uint128" },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              { name: "found", type: "bool" },
              { name: "needle", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          item: TypedAbiArg<number | bigint, "item">,
          acc: TypedAbiArg<
            {
              found: boolean;
              needle: number | bigint;
            },
            "acc"
          >,
        ],
        {
          found: boolean;
          needle: bigint;
        }
      >,
      removeStakerFromBondCycles: {
        name: "remove-staker-from-bond-cycles",
        access: "private",
        args: [
          { name: "staker", type: "principal" },
          { name: "signer", type: "principal" },
          { name: "bond-index", type: "uint128" },
          { name: "first-reward-cycle", type: "uint128" },
          { name: "num-cycles", type: "uint128" },
          { name: "amount-sats", type: "uint128" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-sats", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          signer: TypedAbiArg<string, "signer">,
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          firstRewardCycle: TypedAbiArg<number | bigint, "firstRewardCycle">,
          numCycles: TypedAbiArg<number | bigint, "numCycles">,
          amountSats: TypedAbiArg<number | bigint, "amountSats">,
        ],
        Response<
          {
            amountSats: bigint;
            bondIndex: bigint;
            firstRewardCycle: bigint;
            signer: string;
            staker: string;
          },
          bigint
        >
      >,
      removeStakerFromBondForCycle: {
        name: "remove-staker-from-bond-for-cycle",
        access: "private",
        args: [
          { name: "cycle-index", type: "uint128" },
          {
            name: "accumulator-res",
            type: {
              response: {
                ok: {
                  tuple: [
                    { name: "amount-sats", type: "uint128" },
                    { name: "bond-index", type: "uint128" },
                    { name: "first-reward-cycle", type: "uint128" },
                    { name: "signer", type: "principal" },
                    { name: "staker", type: "principal" },
                  ],
                },
                error: "uint128",
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-sats", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, "cycleIndex">,
          accumulatorRes: TypedAbiArg<
            Response<
              {
                amountSats: number | bigint;
                bondIndex: number | bigint;
                firstRewardCycle: number | bigint;
                signer: string;
                staker: string;
              },
              number | bigint
            >,
            "accumulatorRes"
          >,
        ],
        Response<
          {
            amountSats: bigint;
            bondIndex: bigint;
            firstRewardCycle: bigint;
            signer: string;
            staker: string;
          },
          bigint
        >
      >,
      removeStakerFromCycles: {
        name: "remove-staker-from-cycles",
        access: "private",
        args: [
          { name: "staker", type: "principal" },
          { name: "first-reward-cycle", type: "uint128" },
          { name: "num-cycles", type: "uint128" },
          { name: "is-stx-staking", type: "bool" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "is-stx-staking", type: "bool" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          firstRewardCycle: TypedAbiArg<number | bigint, "firstRewardCycle">,
          numCycles: TypedAbiArg<number | bigint, "numCycles">,
          isStxStaking: TypedAbiArg<boolean, "isStxStaking">,
        ],
        Response<
          {
            firstRewardCycle: bigint;
            isStxStaking: boolean;
            staker: string;
          },
          bigint
        >
      >,
      removeStakerFromSetForCycle: {
        name: "remove-staker-from-set-for-cycle",
        access: "private",
        args: [
          { name: "signer", type: "principal" },
          { name: "cycle", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          cycle: TypedAbiArg<number | bigint, "cycle">,
        ],
        Response<boolean, bigint>
      >,
      removeStakerFromSignerForCycle: {
        name: "remove-staker-from-signer-for-cycle",
        access: "private",
        args: [
          { name: "cycle-index", type: "uint128" },
          {
            name: "accumulator-res",
            type: {
              response: {
                ok: {
                  tuple: [
                    { name: "first-reward-cycle", type: "uint128" },
                    { name: "is-stx-staking", type: "bool" },
                    { name: "staker", type: "principal" },
                  ],
                },
                error: "uint128",
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "is-stx-staking", type: "bool" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, "cycleIndex">,
          accumulatorRes: TypedAbiArg<
            Response<
              {
                firstRewardCycle: number | bigint;
                isStxStaking: boolean;
                staker: string;
              },
              number | bigint
            >,
            "accumulatorRes"
          >,
        ],
        Response<
          {
            firstRewardCycle: bigint;
            isStxStaking: boolean;
            staker: string;
          },
          bigint
        >
      >,
      reverseBuff16: {
        name: "reverse-buff16",
        access: "private",
        args: [{ name: "input", type: { buffer: { length: 16 } } }],
        outputs: { type: { buffer: { length: 17 } } },
      } as TypedAbiFunction<
        [input: TypedAbiArg<Uint8Array, "input">],
        Uint8Array
      >,
      rollSbtc: {
        name: "roll-sbtc",
        access: "private",
        args: [
          { name: "staker", type: "principal" },
          { name: "old-sbtc", type: "uint128" },
          { name: "new-sbtc", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          oldSbtc: TypedAbiArg<number | bigint, "oldSbtc">,
          newSbtc: TypedAbiArg<number | bigint, "newSbtc">,
        ],
        Response<boolean, bigint>
      >,
      settleRewards: {
        name: "settle-rewards",
        access: "private",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: {
          type: {
            tuple: [
              { name: "earned", type: "uint128" },
              { name: "rewards-per-token", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        {
          earned: bigint;
          rewardsPerToken: bigint;
        }
      >,
      settleStakerRewards: {
        name: "settle-staker-rewards",
        access: "private",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
          { name: "staker", type: "principal" },
        ],
        outputs: {
          type: {
            tuple: [
              { name: "earned", type: "uint128" },
              { name: "rewards-per-token", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
          staker: TypedAbiArg<string, "staker">,
        ],
        {
          earned: bigint;
          rewardsPerToken: bigint;
        }
      >,
      signerManagerValidateStake: {
        name: "signer-manager-validate-stake",
        access: "private",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "staker", type: "principal" },
          { name: "first-index", type: "uint128" },
          { name: "num-indexes", type: "uint128" },
          { name: "amount-ustx", type: "uint128" },
          { name: "amount-sats", type: "uint128" },
          { name: "is-bond", type: "bool" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          staker: TypedAbiArg<string, "staker">,
          firstIndex: TypedAbiArg<number | bigint, "firstIndex">,
          numIndexes: TypedAbiArg<number | bigint, "numIndexes">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          amountSats: TypedAbiArg<number | bigint, "amountSats">,
          isBond: TypedAbiArg<boolean, "isBond">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      transferFromReserve: {
        name: "transfer-from-reserve",
        access: "private",
        args: [
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      transferStrandedRewards: {
        name: "transfer-stranded-rewards",
        access: "private",
        args: [
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      unstakeSatsFromBondCycle: {
        name: "unstake-sats-from-bond-cycle",
        access: "private",
        args: [
          { name: "cycle-index", type: "uint128" },
          {
            name: "accumulator-res",
            type: {
              response: {
                ok: {
                  tuple: [
                    { name: "amount-to-withdrawal-sats", type: "uint128" },
                    { name: "bond-index", type: "uint128" },
                    { name: "first-reward-cycle", type: "uint128" },
                    { name: "new-amount-sats", type: "uint128" },
                    { name: "staker", type: "principal" },
                  ],
                },
                error: "uint128",
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-to-withdrawal-sats", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "new-amount-sats", type: "uint128" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          cycleIndex: TypedAbiArg<number | bigint, "cycleIndex">,
          accumulatorRes: TypedAbiArg<
            Response<
              {
                amountToWithdrawalSats: number | bigint;
                bondIndex: number | bigint;
                firstRewardCycle: number | bigint;
                newAmountSats: number | bigint;
                staker: string;
              },
              number | bigint
            >,
            "accumulatorRes"
          >,
        ],
        Response<
          {
            amountToWithdrawalSats: bigint;
            bondIndex: bigint;
            firstRewardCycle: bigint;
            newAmountSats: bigint;
            staker: string;
          },
          bigint
        >
      >,
      unstakeSatsFromBondCycles: {
        name: "unstake-sats-from-bond-cycles",
        access: "private",
        args: [
          { name: "staker", type: "principal" },
          { name: "bond-index", type: "uint128" },
          { name: "first-reward-cycle", type: "uint128" },
          { name: "num-cycles", type: "uint128" },
          { name: "amount-to-withdrawal-sats", type: "uint128" },
          { name: "new-amount-sats", type: "uint128" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-to-withdrawal-sats", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "new-amount-sats", type: "uint128" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          firstRewardCycle: TypedAbiArg<number | bigint, "firstRewardCycle">,
          numCycles: TypedAbiArg<number | bigint, "numCycles">,
          amountToWithdrawalSats: TypedAbiArg<
            number | bigint,
            "amountToWithdrawalSats"
          >,
          newAmountSats: TypedAbiArg<number | bigint, "newAmountSats">,
        ],
        Response<
          {
            amountToWithdrawalSats: bigint;
            bondIndex: bigint;
            firstRewardCycle: bigint;
            newAmountSats: bigint;
            staker: string;
          },
          bigint
        >
      >,
      updateClaimableBondRewards: {
        name: "update-claimable-bond-rewards",
        access: "private",
        args: [
          { name: "bond-index", type: "uint128" },
          {
            name: "accumulator",
            type: {
              tuple: [
                {
                  name: "bond-rewards",
                  type: {
                    list: {
                      type: {
                        tuple: [
                          { name: "bond-index", type: "uint128" },
                          { name: "earned", type: "uint128" },
                          { name: "rewards-per-token", type: "uint128" },
                        ],
                      },
                      length: 6,
                    },
                  },
                },
                { name: "reward-cycle", type: "uint128" },
                { name: "signer", type: "principal" },
                { name: "total", type: "uint128" },
              ],
            },
          },
        ],
        outputs: {
          type: {
            tuple: [
              {
                name: "bond-rewards",
                type: {
                  list: {
                    type: {
                      tuple: [
                        { name: "bond-index", type: "uint128" },
                        { name: "earned", type: "uint128" },
                        { name: "rewards-per-token", type: "uint128" },
                      ],
                    },
                    length: 6,
                  },
                },
              },
              { name: "reward-cycle", type: "uint128" },
              { name: "signer", type: "principal" },
              { name: "total", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          accumulator: TypedAbiArg<
            {
              bondRewards: {
                bondIndex: number | bigint;
                earned: number | bigint;
                rewardsPerToken: number | bigint;
              }[];
              rewardCycle: number | bigint;
              signer: string;
              total: number | bigint;
            },
            "accumulator"
          >,
        ],
        {
          bondRewards: {
            bondIndex: bigint;
            earned: bigint;
            rewardsPerToken: bigint;
          }[];
          rewardCycle: bigint;
          signer: string;
          total: bigint;
        }
      >,
      updateClaimableRewards: {
        name: "update-claimable-rewards",
        access: "private",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: {
          type: {
            tuple: [
              { name: "earned", type: "uint128" },
              { name: "rewards-per-token", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        {
          earned: bigint;
          rewardsPerToken: bigint;
        }
      >,
      validateL1Lockup: {
        name: "validate-l1-lockup",
        access: "private",
        args: [
          {
            name: "lockup",
            type: {
              tuple: [
                { name: "amount", type: "uint128" },
                { name: "header", type: { buffer: { length: 80 } } },
                { name: "height", type: "uint128" },
                {
                  name: "leaf-hashes",
                  type: {
                    list: { type: { buffer: { length: 32 } }, length: 14 },
                  },
                },
                { name: "output-index", type: "uint128" },
                { name: "tx", type: { buffer: { length: 100000 } } },
                { name: "tx-count", type: "uint128" },
                { name: "tx-index", type: "uint128" },
                { name: "unlock-burn-height", type: "uint128" },
              ],
            },
          },
          {
            name: "accumulator-res",
            type: {
              response: {
                ok: {
                  tuple: [
                    {
                      name: "early-unlock-bytes",
                      type: { buffer: { length: 683 } },
                    },
                    { name: "minimum-unlock-height", type: "uint128" },
                    {
                      name: "seen-outpoints",
                      type: {
                        list: {
                          type: {
                            tuple: [
                              { name: "output-index", type: "uint128" },
                              {
                                name: "txid",
                                type: { buffer: { length: 32 } },
                              },
                            ],
                          },
                          length: 10,
                        },
                      },
                    },
                    { name: "staker", type: "principal" },
                    {
                      name: "staker-unlock-bytes",
                      type: { buffer: { length: 683 } },
                    },
                    { name: "sum", type: "uint128" },
                  ],
                },
                error: "uint128",
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  {
                    name: "early-unlock-bytes",
                    type: { buffer: { length: 683 } },
                  },
                  { name: "minimum-unlock-height", type: "uint128" },
                  {
                    name: "seen-outpoints",
                    type: {
                      list: {
                        type: {
                          tuple: [
                            { name: "output-index", type: "uint128" },
                            { name: "txid", type: { buffer: { length: 32 } } },
                          ],
                        },
                        length: 10,
                      },
                    },
                  },
                  { name: "staker", type: "principal" },
                  {
                    name: "staker-unlock-bytes",
                    type: { buffer: { length: 683 } },
                  },
                  { name: "sum", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          lockup: TypedAbiArg<
            {
              amount: number | bigint;
              header: Uint8Array;
              height: number | bigint;
              leafHashes: Uint8Array[];
              outputIndex: number | bigint;
              tx: Uint8Array;
              txCount: number | bigint;
              txIndex: number | bigint;
              unlockBurnHeight: number | bigint;
            },
            "lockup"
          >,
          accumulatorRes: TypedAbiArg<
            Response<
              {
                earlyUnlockBytes: Uint8Array;
                minimumUnlockHeight: number | bigint;
                seenOutpoints: {
                  outputIndex: number | bigint;
                  txid: Uint8Array;
                }[];
                staker: string;
                stakerUnlockBytes: Uint8Array;
                sum: number | bigint;
              },
              number | bigint
            >,
            "accumulatorRes"
          >,
        ],
        Response<
          {
            earlyUnlockBytes: Uint8Array;
            minimumUnlockHeight: bigint;
            seenOutpoints: {
              outputIndex: bigint;
              txid: Uint8Array;
            }[];
            staker: string;
            stakerUnlockBytes: Uint8Array;
            sum: bigint;
          },
          bigint
        >
      >,
      validateNoReentrancy: {
        name: "validate-no-reentrancy",
        access: "private",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      verifyBondRolloverWindow: {
        name: "verify-bond-rollover-window",
        access: "private",
        args: [
          {
            name: "existing-membership",
            type: {
              optional: {
                tuple: [
                  { name: "amount-sats", type: "uint128" },
                  { name: "amount-ustx", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "is-l1-lock", type: "bool" },
                  { name: "signer", type: "principal" },
                ],
              },
            },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          existingMembership: TypedAbiArg<
            {
              amountSats: number | bigint;
              amountUstx: number | bigint;
              bondIndex: number | bigint;
              isL1Lock: boolean;
              signer: string;
            } | null,
            "existingMembership"
          >,
        ],
        Response<boolean, bigint>
      >,
      verifyL1Lockups: {
        name: "verify-l1-lockups",
        access: "private",
        args: [
          { name: "staker", type: "principal" },
          { name: "bond-index", type: "uint128" },
          {
            name: "lockups",
            type: {
              tuple: [
                {
                  name: "outputs",
                  type: {
                    list: {
                      type: {
                        tuple: [
                          { name: "amount", type: "uint128" },
                          { name: "header", type: { buffer: { length: 80 } } },
                          { name: "height", type: "uint128" },
                          {
                            name: "leaf-hashes",
                            type: {
                              list: {
                                type: { buffer: { length: 32 } },
                                length: 14,
                              },
                            },
                          },
                          { name: "output-index", type: "uint128" },
                          { name: "tx", type: { buffer: { length: 100000 } } },
                          { name: "tx-count", type: "uint128" },
                          { name: "tx-index", type: "uint128" },
                          { name: "unlock-burn-height", type: "uint128" },
                        ],
                      },
                      length: 10,
                    },
                  },
                },
                {
                  name: "staker-unlock-bytes",
                  type: { buffer: { length: 683 } },
                },
              ],
            },
          },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          lockups: TypedAbiArg<
            {
              outputs: {
                amount: number | bigint;
                header: Uint8Array;
                height: number | bigint;
                leafHashes: Uint8Array[];
                outputIndex: number | bigint;
                tx: Uint8Array;
                txCount: number | bigint;
                txIndex: number | bigint;
                unlockBurnHeight: number | bigint;
              }[];
              stakerUnlockBytes: Uint8Array;
            },
            "lockups"
          >,
        ],
        Response<bigint, bigint>
      >,
      verifyNotPreparePhase: {
        name: "verify-not-prepare-phase",
        access: "private",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      announceL1EarlyExit: {
        name: "announce-l1-early-exit",
        access: "public",
        args: [
          { name: "staker", type: "principal" },
          { name: "old-signer-manager", type: "trait_reference" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-sats-released", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          oldSignerManager: TypedAbiArg<string, "oldSignerManager">,
        ],
        Response<
          {
            amountSatsReleased: bigint;
            bondIndex: bigint;
            signer: string;
            staker: string;
          },
          bigint
        >
      >,
      calculateRewards: {
        name: "calculate-rewards",
        access: "public",
        args: [
          {
            name: "bond-periods",
            type: { list: { type: "uint128", length: 6 } },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "accrued-rewards-per-ustx", type: "uint128" },
                  {
                    name: "bond-periods",
                    type: { list: { type: "uint128", length: 6 } },
                  },
                  { name: "calculation-height", type: "uint128" },
                  { name: "cumulative-rewards-per-ustx", type: "uint128" },
                  { name: "cycle-staked-ustx", type: "uint128" },
                  { name: "gross-accrued-rewards", type: "uint128" },
                  { name: "reserve-balance", type: "uint128" },
                  { name: "reserve-deposit", type: "uint128" },
                  { name: "stx-cycle", type: "uint128" },
                  { name: "total-bond-rewards", type: "uint128" },
                  { name: "total-stx-staker-rewards", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [bondPeriods: TypedAbiArg<number | bigint[], "bondPeriods">],
        Response<
          {
            accruedRewardsPerUstx: bigint;
            bondPeriods: bigint[];
            calculationHeight: bigint;
            cumulativeRewardsPerUstx: bigint;
            cycleStakedUstx: bigint;
            grossAccruedRewards: bigint;
            reserveBalance: bigint;
            reserveDeposit: bigint;
            stxCycle: bigint;
            totalBondRewards: bigint;
            totalStxStakerRewards: bigint;
          },
          bigint
        >
      >,
      claimRewards: {
        name: "claim-rewards",
        access: "public",
        args: [
          {
            name: "bond-periods",
            type: { list: { type: "uint128", length: 6 } },
          },
          { name: "reward-cycle", type: "uint128" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  {
                    name: "bond-rewards",
                    type: {
                      list: {
                        type: {
                          tuple: [
                            { name: "bond-index", type: "uint128" },
                            { name: "earned", type: "uint128" },
                            { name: "rewards-per-token", type: "uint128" },
                          ],
                        },
                        length: 6,
                      },
                    },
                  },
                  { name: "bond-totals", type: "uint128" },
                  {
                    name: "stx-rewards",
                    type: {
                      tuple: [
                        { name: "earned", type: "uint128" },
                        { name: "rewards-per-token", type: "uint128" },
                      ],
                    },
                  },
                  { name: "total-rewards", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          bondPeriods: TypedAbiArg<number | bigint[], "bondPeriods">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
        ],
        Response<
          {
            bondRewards: {
              bondIndex: bigint;
              earned: bigint;
              rewardsPerToken: bigint;
            }[];
            bondTotals: bigint;
            stxRewards: {
              earned: bigint;
              rewardsPerToken: bigint;
            };
            totalRewards: bigint;
          },
          bigint
        >
      >,
      claimStakerRewardsForSigner: {
        name: "claim-staker-rewards-for-signer",
        access: "public",
        args: [
          { name: "staker", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "earned", type: "uint128" },
                  { name: "rewards-per-token", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        Response<
          {
            earned: bigint;
            rewardsPerToken: bigint;
          },
          bigint
        >
      >,
      grantSignerKey: {
        name: "grant-signer-key",
        access: "public",
        args: [
          { name: "signer-key", type: { buffer: { length: 33 } } },
          { name: "signer-manager", type: "principal" },
          { name: "auth-id", type: "uint128" },
          { name: "signer-sig", type: { buffer: { length: 65 } } },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "auth-id", type: "uint128" },
                  { name: "signer-key", type: { buffer: { length: 33 } } },
                  { name: "signer-manager", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          signerKey: TypedAbiArg<Uint8Array, "signerKey">,
          signerManager: TypedAbiArg<string, "signerManager">,
          authId: TypedAbiArg<number | bigint, "authId">,
          signerSig: TypedAbiArg<Uint8Array, "signerSig">,
        ],
        Response<
          {
            authId: bigint;
            signerKey: Uint8Array;
            signerManager: string;
          },
          bigint
        >
      >,
      pauseRewards: {
        name: "pause-rewards",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      registerForBond: {
        name: "register-for-bond",
        access: "public",
        args: [
          { name: "bond-index", type: "uint128" },
          { name: "signer-manager", type: "trait_reference" },
          { name: "amount-ustx", type: "uint128" },
          {
            name: "btc-lockup",
            type: {
              response: {
                ok: {
                  tuple: [
                    {
                      name: "outputs",
                      type: {
                        list: {
                          type: {
                            tuple: [
                              { name: "amount", type: "uint128" },
                              {
                                name: "header",
                                type: { buffer: { length: 80 } },
                              },
                              { name: "height", type: "uint128" },
                              {
                                name: "leaf-hashes",
                                type: {
                                  list: {
                                    type: { buffer: { length: 32 } },
                                    length: 14,
                                  },
                                },
                              },
                              { name: "output-index", type: "uint128" },
                              {
                                name: "tx",
                                type: { buffer: { length: 100000 } },
                              },
                              { name: "tx-count", type: "uint128" },
                              { name: "tx-index", type: "uint128" },
                              { name: "unlock-burn-height", type: "uint128" },
                            ],
                          },
                          length: 10,
                        },
                      },
                    },
                    {
                      name: "staker-unlock-bytes",
                      type: { buffer: { length: 683 } },
                    },
                  ],
                },
                error: "uint128",
              },
            },
          },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-ustx", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  {
                    name: "btc-lockup",
                    type: {
                      tuple: [
                        {
                          name: "txs",
                          type: {
                            optional: {
                              list: {
                                type: {
                                  tuple: [
                                    { name: "output-index", type: "uint128" },
                                    {
                                      name: "txid",
                                      type: { buffer: { length: 32 } },
                                    },
                                  ],
                                },
                                length: 10,
                              },
                            },
                          },
                        },
                        {
                          name: "type",
                          type: { "string-ascii": { length: 2 } },
                        },
                      ],
                    },
                  },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "is-l1-lock", type: "bool" },
                  { name: "sats-total", type: "uint128" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                  { name: "unlock-burn-height", type: "uint128" },
                  { name: "unlock-cycle", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          signerManager: TypedAbiArg<string, "signerManager">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          btcLockup: TypedAbiArg<
            Response<
              {
                outputs: {
                  amount: number | bigint;
                  header: Uint8Array;
                  height: number | bigint;
                  leafHashes: Uint8Array[];
                  outputIndex: number | bigint;
                  tx: Uint8Array;
                  txCount: number | bigint;
                  txIndex: number | bigint;
                  unlockBurnHeight: number | bigint;
                }[];
                stakerUnlockBytes: Uint8Array;
              },
              number | bigint
            >,
            "btcLockup"
          >,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<
          {
            amountUstx: bigint;
            bondIndex: bigint;
            btcLockup: {
              txs:
                | {
                    outputIndex: bigint;
                    txid: Uint8Array;
                  }[]
                | null;
              type: string;
            };
            firstRewardCycle: bigint;
            isL1Lock: boolean;
            satsTotal: bigint;
            signer: string;
            staker: string;
            unlockBurnHeight: bigint;
            unlockCycle: bigint;
          },
          bigint
        >
      >,
      registerSigner: {
        name: "register-signer",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "signer-key", type: { buffer: { length: 33 } } },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "signer", type: "principal" },
                  { name: "signer-key", type: { buffer: { length: 33 } } },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          signerKey: TypedAbiArg<Uint8Array, "signerKey">,
        ],
        Response<
          {
            signer: string;
            signerKey: Uint8Array;
          },
          bigint
        >
      >,
      revokeSignerGrant: {
        name: "revoke-signer-grant",
        access: "public",
        args: [
          { name: "signer-manager", type: "principal" },
          { name: "signer-key", type: { buffer: { length: 33 } } },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "existed", type: "bool" },
                  { name: "signer-key", type: { buffer: { length: 33 } } },
                  { name: "signer-manager", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          signerKey: TypedAbiArg<Uint8Array, "signerKey">,
        ],
        Response<
          {
            existed: boolean;
            signerKey: Uint8Array;
            signerManager: string;
          },
          bigint
        >
      >,
      setBondAdmin: {
        name: "set-bond-admin",
        access: "public",
        args: [{ name: "new-admin", type: "principal" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "new-admin", type: "principal" },
                  { name: "old-admin", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [newAdmin: TypedAbiArg<string, "newAdmin">],
        Response<
          {
            newAdmin: string;
            oldAdmin: string;
          },
          bigint
        >
      >,
      setBurnchainParameters: {
        name: "set-burnchain-parameters",
        access: "public",
        args: [
          { name: "first-burn-height", type: "uint128" },
          { name: "prepare-cycle-length", type: "uint128" },
          { name: "reward-cycle-length", type: "uint128" },
          { name: "begin-pox5-reward-cycle", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          firstBurnHeight: TypedAbiArg<number | bigint, "firstBurnHeight">,
          prepareCycleLength: TypedAbiArg<
            number | bigint,
            "prepareCycleLength"
          >,
          rewardCycleLength: TypedAbiArg<number | bigint, "rewardCycleLength">,
          beginPox5RewardCycle: TypedAbiArg<
            number | bigint,
            "beginPox5RewardCycle"
          >,
        ],
        Response<boolean, null>
      >,
      setPauseAdmin: {
        name: "set-pause-admin",
        access: "public",
        args: [{ name: "new-admin", type: "principal" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "new-admin", type: "principal" },
                  { name: "old-admin", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [newAdmin: TypedAbiArg<string, "newAdmin">],
        Response<
          {
            newAdmin: string;
            oldAdmin: string;
          },
          bigint
        >
      >,
      setupBond: {
        name: "setup-bond",
        access: "public",
        args: [
          { name: "bond-index", type: "uint128" },
          { name: "target-rate", type: "uint128" },
          { name: "stx-value-ratio", type: "uint128" },
          { name: "min-ustx-ratio", type: "uint128" },
          { name: "early-unlock-bytes", type: { buffer: { length: 683 } } },
          {
            name: "allowlist",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "max-sats", type: "uint128" },
                    { name: "staker", type: "principal" },
                  ],
                },
                length: 1000,
              },
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "bond-index", type: "uint128" },
                  {
                    name: "early-unlock-bytes",
                    type: { buffer: { length: 683 } },
                  },
                  { name: "max-allocation-sats", type: "uint128" },
                  { name: "min-ustx-ratio", type: "uint128" },
                  { name: "stx-value-ratio", type: "uint128" },
                  { name: "target-rate", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          targetRate: TypedAbiArg<number | bigint, "targetRate">,
          stxValueRatio: TypedAbiArg<number | bigint, "stxValueRatio">,
          minUstxRatio: TypedAbiArg<number | bigint, "minUstxRatio">,
          earlyUnlockBytes: TypedAbiArg<Uint8Array, "earlyUnlockBytes">,
          allowlist: TypedAbiArg<
            {
              maxSats: number | bigint;
              staker: string;
            }[],
            "allowlist"
          >,
        ],
        Response<
          {
            bondIndex: bigint;
            earlyUnlockBytes: Uint8Array;
            maxAllocationSats: bigint;
            minUstxRatio: bigint;
            stxValueRatio: bigint;
            targetRate: bigint;
          },
          bigint
        >
      >,
      stake: {
        name: "stake",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "amount-ustx", type: "uint128" },
          { name: "num-cycles", type: "uint128" },
          { name: "start-burn-ht", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-ustx", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "num-cycles", type: "uint128" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                  { name: "unlock-burn-height", type: "uint128" },
                  { name: "unlock-cycle", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          numCycles: TypedAbiArg<number | bigint, "numCycles">,
          startBurnHt: TypedAbiArg<number | bigint, "startBurnHt">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<
          {
            amountUstx: bigint;
            firstRewardCycle: bigint;
            numCycles: bigint;
            signer: string;
            staker: string;
            unlockBurnHeight: bigint;
            unlockCycle: bigint;
          },
          bigint
        >
      >,
      stakeUpdate: {
        name: "stake-update",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "old-signer-manager", type: "trait_reference" },
          { name: "cycles-to-extend", type: "uint128" },
          { name: "amount-increase", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-increase", type: "uint128" },
                  { name: "amount-ustx", type: "uint128" },
                  { name: "cycles-to-extend", type: "uint128" },
                  { name: "num-cycles", type: "uint128" },
                  { name: "old-signer", type: "principal" },
                  { name: "prev-unlock-height", type: "uint128" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                  { name: "unlock-burn-height", type: "uint128" },
                  { name: "unlock-cycle", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          oldSignerManager: TypedAbiArg<string, "oldSignerManager">,
          cyclesToExtend: TypedAbiArg<number | bigint, "cyclesToExtend">,
          amountIncrease: TypedAbiArg<number | bigint, "amountIncrease">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<
          {
            amountIncrease: bigint;
            amountUstx: bigint;
            cyclesToExtend: bigint;
            numCycles: bigint;
            oldSigner: string;
            prevUnlockHeight: bigint;
            signer: string;
            staker: string;
            unlockBurnHeight: bigint;
            unlockCycle: bigint;
          },
          bigint
        >
      >,
      unstake: {
        name: "unstake",
        access: "public",
        args: [{ name: "old-signer-manager", type: "trait_reference" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-ustx", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                  { name: "unlock-burn-height", type: "uint128" },
                  { name: "unlock-cycle", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [oldSignerManager: TypedAbiArg<string, "oldSignerManager">],
        Response<
          {
            amountUstx: bigint;
            firstRewardCycle: bigint;
            signer: string;
            staker: string;
            unlockBurnHeight: bigint;
            unlockCycle: bigint;
          },
          bigint
        >
      >,
      unstakeSbtc: {
        name: "unstake-sbtc",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "amount-to-withdrawal-sats", type: "uint128" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-withdrawn-sats", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "new-amount-sats", type: "uint128" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          amountToWithdrawalSats: TypedAbiArg<
            number | bigint,
            "amountToWithdrawalSats"
          >,
        ],
        Response<
          {
            amountWithdrawnSats: bigint;
            bondIndex: bigint;
            newAmountSats: bigint;
            signer: string;
            staker: string;
          },
          bigint
        >
      >,
      updateBondRegistration: {
        name: "update-bond-registration",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "old-signer-manager", type: "trait_reference" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "amount-sats", type: "uint128" },
                  { name: "amount-ustx", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "first-reward-cycle", type: "uint128" },
                  { name: "is-l1-lock", type: "bool" },
                  { name: "num-cycles", type: "uint128" },
                  { name: "old-signer", type: "principal" },
                  { name: "signer", type: "principal" },
                  { name: "staker", type: "principal" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          oldSignerManager: TypedAbiArg<string, "oldSignerManager">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<
          {
            amountSats: bigint;
            amountUstx: bigint;
            bondIndex: bigint;
            firstRewardCycle: bigint;
            isL1Lock: boolean;
            numCycles: bigint;
            oldSigner: string;
            signer: string;
            staker: string;
          },
          bigint
        >
      >,
      assertAllActiveBondsIncluded: {
        name: "assert-all-active-bonds-included",
        access: "read_only",
        args: [
          {
            name: "bond-periods",
            type: { list: { type: "uint128", length: 6 } },
          },
          { name: "calculation-height", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          bondPeriods: TypedAbiArg<number | bigint[], "bondPeriods">,
          calculationHeight: TypedAbiArg<number | bigint, "calculationHeight">,
        ],
        Response<boolean, bigint>
      >,
      bondOverlapsNewPosition_q: {
        name: "bond-overlaps-new-position?",
        access: "read_only",
        args: [
          {
            name: "existing-membership",
            type: {
              optional: {
                tuple: [
                  { name: "amount-sats", type: "uint128" },
                  { name: "amount-ustx", type: "uint128" },
                  { name: "bond-index", type: "uint128" },
                  { name: "is-l1-lock", type: "bool" },
                  { name: "signer", type: "principal" },
                ],
              },
            },
          },
          { name: "new-first-reward-cycle", type: "uint128" },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [
          existingMembership: TypedAbiArg<
            {
              amountSats: number | bigint;
              amountUstx: number | bigint;
              bondIndex: number | bigint;
              isL1Lock: boolean;
              signer: string;
            } | null,
            "existingMembership"
          >,
          newFirstRewardCycle: TypedAbiArg<
            number | bigint,
            "newFirstRewardCycle"
          >,
        ],
        boolean
      >,
      bondPeriodToBurnHeight: {
        name: "bond-period-to-burn-height",
        access: "read_only",
        args: [{ name: "bond-index", type: "uint128" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [bondIndex: TypedAbiArg<number | bigint, "bondIndex">],
        bigint
      >,
      bondPeriodToRewardCycle: {
        name: "bond-period-to-reward-cycle",
        access: "read_only",
        args: [{ name: "bond-index", type: "uint128" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [bondIndex: TypedAbiArg<number | bigint, "bondIndex">],
        bigint
      >,
      burnHeightToDistributionIndex: {
        name: "burn-height-to-distribution-index",
        access: "read_only",
        args: [{ name: "height", type: "uint128" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [height: TypedAbiArg<number | bigint, "height">],
        bigint
      >,
      burnHeightToRewardCycle: {
        name: "burn-height-to-reward-cycle",
        access: "read_only",
        args: [{ name: "height", type: "uint128" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [height: TypedAbiArg<number | bigint, "height">],
        bigint
      >,
      checkPoxLockPeriod: {
        name: "check-pox-lock-period",
        access: "read_only",
        args: [{ name: "lock-period", type: "uint128" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [lockPeriod: TypedAbiArg<number | bigint, "lockPeriod">],
        boolean
      >,
      clamp: {
        name: "clamp",
        access: "read_only",
        args: [
          { name: "value", type: "uint128" },
          { name: "min", type: "uint128" },
          { name: "max", type: "uint128" },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          value: TypedAbiArg<number | bigint, "value">,
          min: TypedAbiArg<number | bigint, "min">,
          max: TypedAbiArg<number | bigint, "max">,
        ],
        bigint
      >,
      computeEarnedRewards: {
        name: "compute-earned-rewards",
        access: "read_only",
        args: [
          { name: "shares", type: "uint128" },
          { name: "rpt-current", type: "uint128" },
          { name: "rpt-paid", type: "uint128" },
          { name: "pending", type: "uint128" },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          shares: TypedAbiArg<number | bigint, "shares">,
          rptCurrent: TypedAbiArg<number | bigint, "rptCurrent">,
          rptPaid: TypedAbiArg<number | bigint, "rptPaid">,
          pending: TypedAbiArg<number | bigint, "pending">,
        ],
        bigint
      >,
      constructLockupOutputScript: {
        name: "construct-lockup-output-script",
        access: "read_only",
        args: [
          { name: "staker", type: "principal" },
          { name: "unlock-burn-height", type: "uint128" },
          { name: "staker-unlock-bytes", type: { buffer: { length: 683 } } },
          { name: "early-unlock-bytes", type: { buffer: { length: 683 } } },
        ],
        outputs: {
          type: {
            response: { ok: { buffer: { length: 34 } }, error: "uint128" },
          },
        },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          unlockBurnHeight: TypedAbiArg<number | bigint, "unlockBurnHeight">,
          stakerUnlockBytes: TypedAbiArg<Uint8Array, "stakerUnlockBytes">,
          earlyUnlockBytes: TypedAbiArg<Uint8Array, "earlyUnlockBytes">,
        ],
        Response<Uint8Array, bigint>
      >,
      constructLockupScript: {
        name: "construct-lockup-script",
        access: "read_only",
        args: [
          { name: "staker", type: "principal" },
          { name: "unlock-burn-height", type: "uint128" },
          { name: "staker-unlock-bytes", type: { buffer: { length: 683 } } },
          { name: "early-unlock-bytes", type: { buffer: { length: 683 } } },
        ],
        outputs: {
          type: {
            response: { ok: { buffer: { length: 2437 } }, error: "uint128" },
          },
        },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          unlockBurnHeight: TypedAbiArg<number | bigint, "unlockBurnHeight">,
          stakerUnlockBytes: TypedAbiArg<Uint8Array, "stakerUnlockBytes">,
          earlyUnlockBytes: TypedAbiArg<Uint8Array, "earlyUnlockBytes">,
        ],
        Response<Uint8Array, bigint>
      >,
      currentDistributionCycle: {
        name: "current-distribution-cycle",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      currentPoxRewardCycle: {
        name: "current-pox-reward-cycle",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      distributionCycleToBurnHeight: {
        name: "distribution-cycle-to-burn-height",
        access: "read_only",
        args: [{ name: "cycle", type: "uint128" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [cycle: TypedAbiArg<number | bigint, "cycle">],
        bigint
      >,
      getAmountDelegatedForSigner: {
        name: "get-amount-delegated-for-signer",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "cycle", type: "uint128" },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          cycle: TypedAbiArg<number | bigint, "cycle">,
        ],
        bigint
      >,
      getBcHHash: {
        name: "get-bc-h-hash",
        access: "read_only",
        args: [{ name: "bh", type: "uint128" }],
        outputs: { type: { optional: { buffer: { length: 32 } } } },
      } as TypedAbiFunction<
        [bh: TypedAbiArg<number | bigint, "bh">],
        Uint8Array | null
      >,
      getBondAllowance: {
        name: "get-bond-allowance",
        access: "read_only",
        args: [
          { name: "bond-index", type: "uint128" },
          { name: "staker", type: "principal" },
        ],
        outputs: { type: { optional: "uint128" } },
      } as TypedAbiFunction<
        [
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          staker: TypedAbiArg<string, "staker">,
        ],
        bigint | null
      >,
      getBondL1UnlockHeight: {
        name: "get-bond-l1-unlock-height",
        access: "read_only",
        args: [{ name: "bond-index", type: "uint128" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [bondIndex: TypedAbiArg<number | bigint, "bondIndex">],
        bigint
      >,
      getBondMembership: {
        name: "get-bond-membership",
        access: "read_only",
        args: [{ name: "staker", type: "principal" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "amount-sats", type: "uint128" },
                { name: "amount-ustx", type: "uint128" },
                { name: "bond-index", type: "uint128" },
                { name: "is-l1-lock", type: "bool" },
                { name: "signer", type: "principal" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [staker: TypedAbiArg<string, "staker">],
        {
          amountSats: bigint;
          amountUstx: bigint;
          bondIndex: bigint;
          isL1Lock: boolean;
          signer: string;
        } | null
      >,
      getEarned: {
        name: "get-earned",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        bigint
      >,
      getEarnedStakerRewards: {
        name: "get-earned-staker-rewards",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
          { name: "staker", type: "principal" },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
          staker: TypedAbiArg<string, "staker">,
        ],
        bigint
      >,
      getFirstPox5RewardCycle: {
        name: "get-first-pox-5-reward-cycle",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getLastAccountedRewardsOnly: {
        name: "get-last-accounted-rewards-only",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getLastRewardComputeHeight: {
        name: "get-last-reward-compute-height",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getNewRewards: {
        name: "get-new-rewards",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getPoxInfo: {
        name: "get-pox-info",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "first-burnchain-block-height", type: "uint128" },
                  { name: "min-amount-ustx", type: "uint128" },
                  { name: "prepare-cycle-length", type: "uint128" },
                  { name: "reward-cycle-id", type: "uint128" },
                  { name: "reward-cycle-length", type: "uint128" },
                  { name: "total-liquid-supply-ustx", type: "uint128" },
                ],
              },
              error: "none",
            },
          },
        },
      } as TypedAbiFunction<
        [],
        Response<
          {
            firstBurnchainBlockHeight: bigint;
            minAmountUstx: bigint;
            prepareCycleLength: bigint;
            rewardCycleId: bigint;
            rewardCycleLength: bigint;
            totalLiquidSupplyUstx: bigint;
          },
          null
        >
      >,
      getProtocolBond: {
        name: "get-protocol-bond",
        access: "read_only",
        args: [{ name: "bond-index", type: "uint128" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                {
                  name: "early-unlock-bytes",
                  type: { buffer: { length: 683 } },
                },
                { name: "min-ustx-ratio", type: "uint128" },
                { name: "stx-value-ratio", type: "uint128" },
                { name: "target-rate", type: "uint128" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [bondIndex: TypedAbiArg<number | bigint, "bondIndex">],
        {
          earlyUnlockBytes: Uint8Array;
          minUstxRatio: bigint;
          stxValueRatio: bigint;
          targetRate: bigint;
        } | null
      >,
      getReserveBalance: {
        name: "get-reserve-balance",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getReversedTxid: {
        name: "get-reversed-txid",
        access: "read_only",
        args: [{ name: "tx", type: { buffer: { length: 100000 } } }],
        outputs: { type: { buffer: { length: 32 } } },
      } as TypedAbiFunction<[tx: TypedAbiArg<Uint8Array, "tx">], Uint8Array>,
      getRewards: {
        name: "get-rewards",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getRewardsPerTokenForCycle: {
        name: "get-rewards-per-token-for-cycle",
        access: "read_only",
        args: [
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        bigint
      >,
      getSignerCycleMembership: {
        name: "get-signer-cycle-membership",
        access: "read_only",
        args: [
          { name: "staker", type: "principal" },
          { name: "cycle", type: "uint128" },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "amount-ustx", type: "uint128" },
                { name: "signer", type: "principal" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          cycle: TypedAbiArg<number | bigint, "cycle">,
        ],
        {
          amountUstx: bigint;
          signer: string;
        } | null
      >,
      getSignerGrantMessageHash: {
        name: "get-signer-grant-message-hash",
        access: "read_only",
        args: [
          { name: "signer-manager", type: "principal" },
          { name: "auth-id", type: "uint128" },
        ],
        outputs: { type: { buffer: { length: 32 } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          authId: TypedAbiArg<number | bigint, "authId">,
        ],
        Uint8Array
      >,
      getSignerInfo: {
        name: "get-signer-info",
        access: "read_only",
        args: [{ name: "signer", type: "principal" }],
        outputs: { type: { optional: { buffer: { length: 33 } } } },
      } as TypedAbiFunction<
        [signer: TypedAbiArg<string, "signer">],
        Uint8Array | null
      >,
      getSignerPendingStakedUstxPerCycle: {
        name: "get-signer-pending-staked-ustx-per-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "cycle", type: "uint128" },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          cycle: TypedAbiArg<number | bigint, "cycle">,
        ],
        bigint
      >,
      getSignerRewardsPerTokenForCycle: {
        name: "get-signer-rewards-per-token-for-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        bigint
      >,
      getSignerRewardsPerTokenSettledForCycle: {
        name: "get-signer-rewards-per-token-settled-for-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        bigint
      >,
      getSignerSetFirstItemForCycle: {
        name: "get-signer-set-first-item-for-cycle",
        access: "read_only",
        args: [{ name: "cycle", type: "uint128" }],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<
        [cycle: TypedAbiArg<number | bigint, "cycle">],
        string | null
      >,
      getSignerSetItemForCycle: {
        name: "get-signer-set-item-for-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "cycle", type: "uint128" },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "next", type: { optional: "principal" } },
                { name: "prev", type: { optional: "principal" } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          cycle: TypedAbiArg<number | bigint, "cycle">,
        ],
        {
          next: string | null;
          prev: string | null;
        } | null
      >,
      getSignerSetLastItemForCycle: {
        name: "get-signer-set-last-item-for-cycle",
        access: "read_only",
        args: [{ name: "cycle", type: "uint128" }],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<
        [cycle: TypedAbiArg<number | bigint, "cycle">],
        string | null
      >,
      getSignerSetNextItemForCycle: {
        name: "get-signer-set-next-item-for-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "cycle", type: "uint128" },
        ],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          cycle: TypedAbiArg<number | bigint, "cycle">,
        ],
        string | null
      >,
      getSignerSetPrevItemForCycle: {
        name: "get-signer-set-prev-item-for-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "cycle", type: "uint128" },
        ],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          cycle: TypedAbiArg<number | bigint, "cycle">,
        ],
        string | null
      >,
      getSignerSharesStakedForCycle: {
        name: "get-signer-shares-staked-for-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        bigint
      >,
      getSignerUnclaimedRewardsForCycle: {
        name: "get-signer-unclaimed-rewards-for-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        bigint
      >,
      getStakerCustodiedSbtc: {
        name: "get-staker-custodied-sbtc",
        access: "read_only",
        args: [{ name: "staker", type: "principal" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[staker: TypedAbiArg<string, "staker">], bigint>,
      getStakerInfo: {
        name: "get-staker-info",
        access: "read_only",
        args: [{ name: "staker", type: "principal" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "amount-ustx", type: "uint128" },
                { name: "first-reward-cycle", type: "uint128" },
                { name: "num-cycles", type: "uint128" },
                { name: "signer", type: "principal" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [staker: TypedAbiArg<string, "staker">],
        {
          amountUstx: bigint;
          firstRewardCycle: bigint;
          numCycles: bigint;
          signer: string;
        } | null
      >,
      getStakerRewardsPerTokenSettledForCycle: {
        name: "get-staker-rewards-per-token-settled-for-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
          { name: "staker", type: "principal" },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
          staker: TypedAbiArg<string, "staker">,
        ],
        bigint
      >,
      getStakerSharesStakedForCycle: {
        name: "get-staker-shares-staked-for-cycle",
        access: "read_only",
        args: [
          { name: "staker", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
          { name: "signer", type: "principal" },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
          signer: TypedAbiArg<string, "signer">,
        ],
        bigint
      >,
      getStakerUnclaimedRewardsForCycle: {
        name: "get-staker-unclaimed-rewards-for-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
          { name: "staker", type: "principal" },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
          staker: TypedAbiArg<string, "staker">,
        ],
        bigint
      >,
      getTotalSbtcStaked: {
        name: "get-total-sbtc-staked",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getTotalSbtcStakedForBond: {
        name: "get-total-sbtc-staked-for-bond",
        access: "read_only",
        args: [{ name: "bond-index", type: "uint128" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [bondIndex: TypedAbiArg<number | bigint, "bondIndex">],
        bigint
      >,
      getTotalSharesStakedForCycle: {
        name: "get-total-shares-staked-for-cycle",
        access: "read_only",
        args: [
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        bigint
      >,
      getTotalUstxStacked: {
        name: "get-total-ustx-stacked",
        access: "read_only",
        args: [{ name: "reward-cycle", type: "uint128" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">],
        bigint
      >,
      getUstxDelegatedForCycle: {
        name: "get-ustx-delegated-for-cycle",
        access: "read_only",
        args: [{ name: "reward-cycle", type: "uint128" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">],
        bigint
      >,
      hasAnnouncedL1EarlyExit: {
        name: "has-announced-l1-early-exit",
        access: "read_only",
        args: [
          { name: "bond-index", type: "uint128" },
          { name: "staker", type: "principal" },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          staker: TypedAbiArg<string, "staker">,
        ],
        boolean
      >,
      isBondActiveAtHeight: {
        name: "is-bond-active-at-height",
        access: "read_only",
        args: [
          { name: "bond-index", type: "uint128" },
          { name: "calculation-height", type: "uint128" },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          calculationHeight: TypedAbiArg<number | bigint, "calculationHeight">,
        ],
        boolean
      >,
      isInPreparePhase: {
        name: "is-in-prepare-phase",
        access: "read_only",
        args: [{ name: "current-cycle", type: "uint128" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [currentCycle: TypedAbiArg<number | bigint, "currentCycle">],
        boolean
      >,
      minUstxForSatsAmount: {
        name: "min-ustx-for-sats-amount",
        access: "read_only",
        args: [
          { name: "sats-amount", type: "uint128" },
          { name: "stx-value-ratio", type: "uint128" },
          { name: "min-ustx-ratio", type: "uint128" },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          satsAmount: TypedAbiArg<number | bigint, "satsAmount">,
          stxValueRatio: TypedAbiArg<number | bigint, "stxValueRatio">,
          minUstxRatio: TypedAbiArg<number | bigint, "minUstxRatio">,
        ],
        bigint
      >,
      parseBlockHeader: {
        name: "parse-block-header",
        access: "read_only",
        args: [{ name: "headerbuff", type: { buffer: { length: 80 } } }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "merkle-root", type: { buffer: { length: 32 } } },
                  { name: "nbits", type: "uint128" },
                  { name: "nonce", type: "uint128" },
                  { name: "parent", type: { buffer: { length: 32 } } },
                  { name: "timestamp", type: "uint128" },
                  { name: "version", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [headerbuff: TypedAbiArg<Uint8Array, "headerbuff">],
        Response<
          {
            merkleRoot: Uint8Array;
            nbits: bigint;
            nonce: bigint;
            parent: Uint8Array;
            timestamp: bigint;
            version: bigint;
          },
          bigint
        >
      >,
      pushCScriptNum: {
        name: "push-c-script-num",
        access: "read_only",
        args: [{ name: "n", type: "uint128" }],
        outputs: {
          type: {
            response: { ok: { buffer: { length: 1027 } }, error: "uint128" },
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, "n">],
        Response<Uint8Array, bigint>
      >,
      pushScriptBytes: {
        name: "push-script-bytes",
        access: "read_only",
        args: [{ name: "bytes", type: { buffer: { length: 1024 } } }],
        outputs: { type: { buffer: { length: 1027 } } },
      } as TypedAbiFunction<
        [bytes: TypedAbiArg<Uint8Array, "bytes">],
        Uint8Array
      >,
      readHashslice: {
        name: "read-hashslice",
        access: "read_only",
        args: [
          {
            name: "old-ctx",
            type: {
              tuple: [
                { name: "index", type: "uint128" },
                { name: "txbuff", type: { buffer: { length: 4096 } } },
              ],
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  {
                    name: "ctx",
                    type: {
                      tuple: [
                        { name: "index", type: "uint128" },
                        { name: "txbuff", type: { buffer: { length: 4096 } } },
                      ],
                    },
                  },
                  { name: "hashslice", type: { buffer: { length: 32 } } },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          oldCtx: TypedAbiArg<
            {
              index: number | bigint;
              txbuff: Uint8Array;
            },
            "oldCtx"
          >,
        ],
        Response<
          {
            ctx: {
              index: bigint;
              txbuff: Uint8Array;
            };
            hashslice: Uint8Array;
          },
          bigint
        >
      >,
      readUint32: {
        name: "read-uint32",
        access: "read_only",
        args: [
          {
            name: "ctx",
            type: {
              tuple: [
                { name: "index", type: "uint128" },
                { name: "txbuff", type: { buffer: { length: 4096 } } },
              ],
            },
          },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  {
                    name: "ctx",
                    type: {
                      tuple: [
                        { name: "index", type: "uint128" },
                        { name: "txbuff", type: { buffer: { length: 4096 } } },
                      ],
                    },
                  },
                  { name: "uint32", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          ctx: TypedAbiArg<
            {
              index: number | bigint;
              txbuff: Uint8Array;
            },
            "ctx"
          >,
        ],
        Response<
          {
            ctx: {
              index: bigint;
              txbuff: Uint8Array;
            };
            uint32: bigint;
          },
          bigint
        >
      >,
      reverseBuff32: {
        name: "reverse-buff32",
        access: "read_only",
        args: [{ name: "input", type: { buffer: { length: 32 } } }],
        outputs: { type: { buffer: { length: 32 } } },
      } as TypedAbiFunction<
        [input: TypedAbiArg<Uint8Array, "input">],
        Uint8Array
      >,
      rewardCycleToBurnHeight: {
        name: "reward-cycle-to-burn-height",
        access: "read_only",
        args: [{ name: "cycle", type: "uint128" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [cycle: TypedAbiArg<number | bigint, "cycle">],
        bigint
      >,
      serializeCScriptNum: {
        name: "serialize-c-script-num",
        access: "read_only",
        args: [{ name: "n", type: "uint128" }],
        outputs: {
          type: {
            response: { ok: { buffer: { length: 5 } }, error: "uint128" },
          },
        },
      } as TypedAbiFunction<
        [n: TypedAbiArg<number | bigint, "n">],
        Response<Uint8Array, bigint>
      >,
      signerSetContainsForCycle: {
        name: "signer-set-contains-for-cycle",
        access: "read_only",
        args: [
          { name: "signer", type: "principal" },
          { name: "cycle", type: "uint128" },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [
          signer: TypedAbiArg<string, "signer">,
          cycle: TypedAbiArg<number | bigint, "cycle">,
        ],
        boolean
      >,
      uintToBuffLe: {
        name: "uint-to-buff-le",
        access: "read_only",
        args: [{ name: "n", type: "uint128" }],
        outputs: { type: { buffer: { length: 2 } } },
      } as TypedAbiFunction<[n: TypedAbiArg<number | bigint, "n">], Uint8Array>,
      verifyBlockHeader: {
        name: "verify-block-header",
        access: "read_only",
        args: [
          { name: "headerbuff", type: { buffer: { length: 80 } } },
          { name: "expected-block-height", type: "uint128" },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [
          headerbuff: TypedAbiArg<Uint8Array, "headerbuff">,
          expectedBlockHeight: TypedAbiArg<
            number | bigint,
            "expectedBlockHeight"
          >,
        ],
        boolean
      >,
      verifySignerKeyGrant: {
        name: "verify-signer-key-grant",
        access: "read_only",
        args: [
          { name: "signer-manager", type: "principal" },
          { name: "signer-key", type: { buffer: { length: 33 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          signerKey: TypedAbiArg<Uint8Array, "signerKey">,
        ],
        Response<boolean, bigint>
      >,
    },
    maps: {
      protocolBondAllowances: {
        name: "protocol-bond-allowances",
        key: {
          tuple: [
            { name: "bond-index", type: "uint128" },
            { name: "staker", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint;
          staker: string;
        },
        bigint
      >,
      protocolBondL1EarlyExitAnnounced: {
        name: "protocol-bond-l1-early-exit-announced",
        key: {
          tuple: [
            { name: "bond-index", type: "uint128" },
            { name: "staker", type: "principal" },
          ],
        },
        value: "bool",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint;
          staker: string;
        },
        boolean
      >,
      protocolBondMemberships: {
        name: "protocol-bond-memberships",
        key: "principal",
        value: {
          tuple: [
            { name: "amount-sats", type: "uint128" },
            { name: "amount-ustx", type: "uint128" },
            { name: "bond-index", type: "uint128" },
            { name: "is-l1-lock", type: "bool" },
            { name: "signer", type: "principal" },
          ],
        },
      } as TypedAbiMap<
        string,
        {
          amountSats: bigint;
          amountUstx: bigint;
          bondIndex: bigint;
          isL1Lock: boolean;
          signer: string;
        }
      >,
      protocolBonds: {
        name: "protocol-bonds",
        key: "uint128",
        value: {
          tuple: [
            { name: "early-unlock-bytes", type: { buffer: { length: 683 } } },
            { name: "min-ustx-ratio", type: "uint128" },
            { name: "stx-value-ratio", type: "uint128" },
            { name: "target-rate", type: "uint128" },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          earlyUnlockBytes: Uint8Array;
          minUstxRatio: bigint;
          stxValueRatio: bigint;
          targetRate: bigint;
        }
      >,
      protocolBondsTotalStaked: {
        name: "protocol-bonds-total-staked",
        key: "uint128",
        value: "uint128",
      } as TypedAbiMap<number | bigint, bigint>,
      rewardsPerTokenForCycle: {
        name: "rewards-per-token-for-cycle",
        key: {
          tuple: [
            { name: "bond-index", type: { optional: "uint128" } },
            { name: "reward-cycle", type: "uint128" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint | null;
          rewardCycle: number | bigint;
        },
        bigint
      >,
      signerDelegatedPerCycle: {
        name: "signer-delegated-per-cycle",
        key: {
          tuple: [
            { name: "cycle", type: "uint128" },
            { name: "signer", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          cycle: number | bigint;
          signer: string;
        },
        bigint
      >,
      signerKeyGrants: {
        name: "signer-key-grants",
        key: {
          tuple: [
            { name: "signer-key", type: { buffer: { length: 33 } } },
            { name: "signer-manager", type: "principal" },
          ],
        },
        value: "bool",
      } as TypedAbiMap<
        {
          signerKey: Uint8Array;
          signerManager: string;
        },
        boolean
      >,
      signerPendingStakedUstxPerCycle: {
        name: "signer-pending-staked-ustx-per-cycle",
        key: {
          tuple: [
            { name: "cycle", type: "uint128" },
            { name: "signer", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          cycle: number | bigint;
          signer: string;
        },
        bigint
      >,
      signerRewardsPerTokenForCycle: {
        name: "signer-rewards-per-token-for-cycle",
        key: {
          tuple: [
            { name: "bond-index", type: { optional: "uint128" } },
            { name: "reward-cycle", type: "uint128" },
            { name: "signer", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint | null;
          rewardCycle: number | bigint;
          signer: string;
        },
        bigint
      >,
      signerRewardsPerTokenSettledForCycle: {
        name: "signer-rewards-per-token-settled-for-cycle",
        key: {
          tuple: [
            { name: "bond-index", type: { optional: "uint128" } },
            { name: "reward-cycle", type: "uint128" },
            { name: "signer", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint | null;
          rewardCycle: number | bigint;
          signer: string;
        },
        bigint
      >,
      signerSetLlFirstForCycle: {
        name: "signer-set-ll-first-for-cycle",
        key: "uint128",
        value: "principal",
      } as TypedAbiMap<number | bigint, string>,
      signerSetLlForCycle: {
        name: "signer-set-ll-for-cycle",
        key: {
          tuple: [
            { name: "cycle", type: "uint128" },
            { name: "signer", type: "principal" },
          ],
        },
        value: {
          tuple: [
            { name: "next", type: { optional: "principal" } },
            { name: "prev", type: { optional: "principal" } },
          ],
        },
      } as TypedAbiMap<
        {
          cycle: number | bigint;
          signer: string;
        },
        {
          next: string | null;
          prev: string | null;
        }
      >,
      signerSetLlLastForCycle: {
        name: "signer-set-ll-last-for-cycle",
        key: "uint128",
        value: "principal",
      } as TypedAbiMap<number | bigint, string>,
      signerSharesStakedForCycle: {
        name: "signer-shares-staked-for-cycle",
        key: {
          tuple: [
            { name: "bond-index", type: { optional: "uint128" } },
            { name: "reward-cycle", type: "uint128" },
            { name: "signer", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint | null;
          rewardCycle: number | bigint;
          signer: string;
        },
        bigint
      >,
      signerUnclaimedRewardsForCycle: {
        name: "signer-unclaimed-rewards-for-cycle",
        key: {
          tuple: [
            { name: "bond-index", type: { optional: "uint128" } },
            { name: "reward-cycle", type: "uint128" },
            { name: "signer", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint | null;
          rewardCycle: number | bigint;
          signer: string;
        },
        bigint
      >,
      signers: {
        name: "signers",
        key: "principal",
        value: { buffer: { length: 33 } },
      } as TypedAbiMap<string, Uint8Array>,
      stakerInfo: {
        name: "staker-info",
        key: "principal",
        value: {
          tuple: [
            { name: "amount-ustx", type: "uint128" },
            { name: "first-reward-cycle", type: "uint128" },
            { name: "num-cycles", type: "uint128" },
            { name: "signer", type: "principal" },
          ],
        },
      } as TypedAbiMap<
        string,
        {
          amountUstx: bigint;
          firstRewardCycle: bigint;
          numCycles: bigint;
          signer: string;
        }
      >,
      stakerRewardsPerTokenSettledForCycle: {
        name: "staker-rewards-per-token-settled-for-cycle",
        key: {
          tuple: [
            { name: "bond-index", type: { optional: "uint128" } },
            { name: "reward-cycle", type: "uint128" },
            { name: "signer", type: "principal" },
            { name: "staker", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint | null;
          rewardCycle: number | bigint;
          signer: string;
          staker: string;
        },
        bigint
      >,
      stakerSharesStakedForCycle: {
        name: "staker-shares-staked-for-cycle",
        key: {
          tuple: [
            { name: "bond-index", type: { optional: "uint128" } },
            { name: "reward-cycle", type: "uint128" },
            { name: "signer", type: "principal" },
            { name: "staker", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint | null;
          rewardCycle: number | bigint;
          signer: string;
          staker: string;
        },
        bigint
      >,
      stakerSignerCycleMemberships: {
        name: "staker-signer-cycle-memberships",
        key: {
          tuple: [
            { name: "cycle", type: "uint128" },
            { name: "staker", type: "principal" },
          ],
        },
        value: {
          tuple: [
            { name: "amount-ustx", type: "uint128" },
            { name: "signer", type: "principal" },
          ],
        },
      } as TypedAbiMap<
        {
          cycle: number | bigint;
          staker: string;
        },
        {
          amountUstx: bigint;
          signer: string;
        }
      >,
      stakerUnclaimedRewardsForCycle: {
        name: "staker-unclaimed-rewards-for-cycle",
        key: {
          tuple: [
            { name: "bond-index", type: { optional: "uint128" } },
            { name: "reward-cycle", type: "uint128" },
            { name: "signer", type: "principal" },
            { name: "staker", type: "principal" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint | null;
          rewardCycle: number | bigint;
          signer: string;
          staker: string;
        },
        bigint
      >,
      totalSharesStakedForCycle: {
        name: "total-shares-staked-for-cycle",
        key: {
          tuple: [
            { name: "bond-index", type: { optional: "uint128" } },
            { name: "reward-cycle", type: "uint128" },
          ],
        },
        value: "uint128",
      } as TypedAbiMap<
        {
          bondIndex: number | bigint | null;
          rewardCycle: number | bigint;
        },
        bigint
      >,
      usedSignerKeyGrants: {
        name: "used-signer-key-grants",
        key: {
          tuple: [
            { name: "auth-id", type: "uint128" },
            { name: "signer-key", type: { buffer: { length: 33 } } },
            { name: "signer-manager", type: "principal" },
          ],
        },
        value: "bool",
      } as TypedAbiMap<
        {
          authId: number | bigint;
          signerKey: Uint8Array;
          signerManager: string;
        },
        boolean
      >,
      ustxDelegatedPerCycle: {
        name: "ustx-delegated-per-cycle",
        key: "uint128",
        value: "uint128",
      } as TypedAbiMap<number | bigint, bigint>,
    },
    variables: {
      BITCOIN_LOCKTIME_THRESHOLD: {
        name: "BITCOIN_LOCKTIME_THRESHOLD",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      BOND_GAP_CYCLES: {
        name: "BOND_GAP_CYCLES",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      BOND_LENGTH_CYCLES: {
        name: "BOND_LENGTH_CYCLES",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_ACTIVE_BOND_NOT_INCLUDED: {
        name: "ERR_ACTIVE_BOND_NOT_INCLUDED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_ALREADY_REGISTERED: {
        name: "ERR_ALREADY_REGISTERED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_ALREADY_STAKED: {
        name: "ERR_ALREADY_STAKED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_BOND_ALREADY_SETUP: {
        name: "ERR_BOND_ALREADY_SETUP",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_BOND_ALREADY_STARTED: {
        name: "ERR_BOND_ALREADY_STARTED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_BOND_NOT_ACTIVE: {
        name: "ERR_BOND_NOT_ACTIVE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_BOND_NOT_FOUND: {
        name: "ERR_BOND_NOT_FOUND",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      eRR_CANNOT_ANNOUNCE_L1_EARLY_UNLOCK: {
        name: "ERR_CANNOT_ANNOUNCE_L1_EARLY_UNLOCK",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_CANNOT_SETUP_BOND_TOO_LATE: {
        name: "ERR_CANNOT_SETUP_BOND_TOO_LATE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_CANNOT_SETUP_BOND_TOO_SOON: {
        name: "ERR_CANNOT_SETUP_BOND_TOO_SOON",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_CANNOT_UNSTAKE_SBTC: {
        name: "ERR_CANNOT_UNSTAKE_SBTC",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_DISTRIBUTION_ALREADY_COMPUTED: {
        name: "ERR_DISTRIBUTION_ALREADY_COMPUTED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_DUPLICATE_LOCKUP_OUTPOINT: {
        name: "ERR_DUPLICATE_LOCKUP_OUTPOINT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INSUFFICIENT_RESERVE_BALANCE: {
        name: "ERR_INSUFFICIENT_RESERVE_BALANCE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INSUFFICIENT_STX: {
        name: "ERR_INSUFFICIENT_STX",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_BOND_PERIOD_ORDERING: {
        name: "ERR_INVALID_BOND_PERIOD_ORDERING",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_BTC_HEADER: {
        name: "ERR_INVALID_BTC_HEADER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_LOCKUP_AMOUNT: {
        name: "ERR_INVALID_LOCKUP_AMOUNT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_LOCKUP_SCRIPT: {
        name: "ERR_INVALID_LOCKUP_SCRIPT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_MERKLE_PROOF: {
        name: "ERR_INVALID_MERKLE_PROOF",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_NUM_CYCLES: {
        name: "ERR_INVALID_NUM_CYCLES",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_OLD_SIGNER_MANAGER: {
        name: "ERR_INVALID_OLD_SIGNER_MANAGER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_SIGNATURE_PUBKEY: {
        name: "ERR_INVALID_SIGNATURE_PUBKEY",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_SIGNATURE_RECOVER: {
        name: "ERR_INVALID_SIGNATURE_RECOVER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_START_BURN_HEIGHT: {
        name: "ERR_INVALID_START_BURN_HEIGHT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_UNLOCK_HEIGHT: {
        name: "ERR_INVALID_UNLOCK_HEIGHT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_UNSTAKE_SBTC_AMOUNT: {
        name: "ERR_INVALID_UNSTAKE_SBTC_AMOUNT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      eRR_L1_EARLY_EXIT_ALREADY_ANNOUNCED: {
        name: "ERR_L1_EARLY_EXIT_ALREADY_ANNOUNCED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_ALLOWLISTED: {
        name: "ERR_NOT_ALLOWLISTED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_BOND_PARTICIPANT: {
        name: "ERR_NOT_BOND_PARTICIPANT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_STAKING: {
        name: "ERR_NOT_STAKING",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NO_CLAIMABLE_REWARDS: {
        name: "ERR_NO_CLAIMABLE_REWARDS",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_READ_TX_OUT_OF_BOUNDS: {
        name: "ERR_READ_TX_OUT_OF_BOUNDS",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_REENTRANT_CALL: {
        name: "ERR_REENTRANT_CALL",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_REWARDS_PAUSED: {
        name: "ERR_REWARDS_PAUSED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_ROLLOVER_TOO_EARLY: {
        name: "ERR_ROLLOVER_TOO_EARLY",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SIGNER_KEY_GRANT_NOT_FOUND: {
        name: "ERR_SIGNER_KEY_GRANT_NOT_FOUND",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SIGNER_KEY_GRANT_USED: {
        name: "ERR_SIGNER_KEY_GRANT_USED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SIGNER_NOT_FOUND: {
        name: "ERR_SIGNER_NOT_FOUND",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_STAKER_ALREADY_ADDED: {
        name: "ERR_STAKER_ALREADY_ADDED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_STAKE_IN_PREPARE_PHASE: {
        name: "ERR_STAKE_IN_PREPARE_PHASE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_TOO_MUCH_SATS: {
        name: "ERR_TOO_MUCH_SATS",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_UNAUTHORIZED: {
        name: "ERR_UNAUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_UNAUTHORIZED_SIGNER_REGISTRATION: {
        name: "ERR_UNAUTHORIZED_SIGNER_REGISTRATION",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_UNSTAKE_IN_PREPARE_PHASE: {
        name: "ERR_UNSTAKE_IN_PREPARE_PHASE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_UPDATE_BOND_SAME_SIGNER: {
        name: "ERR_UPDATE_BOND_SAME_SIGNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      MAX_NUM_CYCLES: {
        name: "MAX_NUM_CYCLES",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      pOX_5_SIGNER_DOMAIN: {
        name: "POX_5_SIGNER_DOMAIN",
        type: {
          tuple: [
            {
              name: "chain-id",
              type: "uint128",
            },
            {
              name: "name",
              type: {
                "string-ascii": {
                  length: 12,
                },
              },
            },
            {
              name: "version",
              type: {
                "string-ascii": {
                  length: 5,
                },
              },
            },
          ],
        },
        access: "constant",
      } as TypedAbiVariable<{
        chainId: bigint;
        name: string;
        version: string;
      }>,
      PRECISION: {
        name: "PRECISION",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      RESERVE_RATIO: {
        name: "RESERVE_RATIO",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      SIGNER_SET_MIN_USTX: {
        name: "SIGNER_SET_MIN_USTX",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      sIP018_MSG_PREFIX: {
        name: "SIP018_MSG_PREFIX",
        type: {
          buffer: {
            length: 6,
          },
        },
        access: "constant",
      } as TypedAbiVariable<Uint8Array>,
      STACKS_ADDR_VERSION_MAINNET: {
        name: "STACKS_ADDR_VERSION_MAINNET",
        type: {
          buffer: {
            length: 1,
          },
        },
        access: "constant",
      } as TypedAbiVariable<Uint8Array>,
      STACKS_ADDR_VERSION_TESTNET: {
        name: "STACKS_ADDR_VERSION_TESTNET",
        type: {
          buffer: {
            length: 1,
          },
        },
        access: "constant",
      } as TypedAbiVariable<Uint8Array>,
      bondAdmin: {
        name: "bond-admin",
        type: "principal",
        access: "variable",
      } as TypedAbiVariable<string>,
      configured: {
        name: "configured",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      firstBondPeriodCycle: {
        name: "first-bond-period-cycle",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      firstBurnchainBlockHeight: {
        name: "first-burnchain-block-height",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      firstPox5RewardCycle: {
        name: "first-pox-5-reward-cycle",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      lastAccountedRewardsOnly: {
        name: "last-accounted-rewards-only",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      lastRewardComputeHeight: {
        name: "last-reward-compute-height",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      pauseAdmin: {
        name: "pause-admin",
        type: "principal",
        access: "variable",
      } as TypedAbiVariable<string>,
      poxPrepareCycleLength: {
        name: "pox-prepare-cycle-length",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      poxRewardCycleLength: {
        name: "pox-reward-cycle-length",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      reserveBalance: {
        name: "reserve-balance",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      rewardsPaused: {
        name: "rewards-paused",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      signerManagerCallActive: {
        name: "signer-manager-call-active",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      totalSbtcStaked: {
        name: "total-sbtc-staked",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      BITCOIN_LOCKTIME_THRESHOLD: 500_000_000n,
      BOND_GAP_CYCLES: 2n,
      BOND_LENGTH_CYCLES: 12n,
      ERR_ACTIVE_BOND_NOT_INCLUDED: {
        isOk: false,
        value: 33n,
      },
      ERR_ALREADY_REGISTERED: {
        isOk: false,
        value: 9n,
      },
      ERR_ALREADY_STAKED: {
        isOk: false,
        value: 19n,
      },
      ERR_BOND_ALREADY_SETUP: {
        isOk: false,
        value: 4n,
      },
      ERR_BOND_ALREADY_STARTED: {
        isOk: false,
        value: 43n,
      },
      ERR_BOND_NOT_ACTIVE: {
        isOk: false,
        value: 31n,
      },
      ERR_BOND_NOT_FOUND: {
        isOk: false,
        value: 7n,
      },
      eRR_CANNOT_ANNOUNCE_L1_EARLY_UNLOCK: {
        isOk: false,
        value: 35n,
      },
      ERR_CANNOT_SETUP_BOND_TOO_LATE: {
        isOk: false,
        value: 3n,
      },
      ERR_CANNOT_SETUP_BOND_TOO_SOON: {
        isOk: false,
        value: 2n,
      },
      ERR_CANNOT_UNSTAKE_SBTC: {
        isOk: false,
        value: 38n,
      },
      ERR_DISTRIBUTION_ALREADY_COMPUTED: {
        isOk: false,
        value: 30n,
      },
      ERR_DUPLICATE_LOCKUP_OUTPOINT: {
        isOk: false,
        value: 46n,
      },
      ERR_INSUFFICIENT_RESERVE_BALANCE: {
        isOk: false,
        value: 51n,
      },
      ERR_INSUFFICIENT_STX: {
        isOk: false,
        value: 8n,
      },
      ERR_INVALID_BOND_PERIOD_ORDERING: {
        isOk: false,
        value: 29n,
      },
      ERR_INVALID_BTC_HEADER: {
        isOk: false,
        value: 40n,
      },
      ERR_INVALID_LOCKUP_AMOUNT: {
        isOk: false,
        value: 45n,
      },
      ERR_INVALID_LOCKUP_SCRIPT: {
        isOk: false,
        value: 42n,
      },
      ERR_INVALID_MERKLE_PROOF: {
        isOk: false,
        value: 41n,
      },
      ERR_INVALID_NUM_CYCLES: {
        isOk: false,
        value: 20n,
      },
      ERR_INVALID_OLD_SIGNER_MANAGER: {
        isOk: false,
        value: 36n,
      },
      ERR_INVALID_SIGNATURE_PUBKEY: {
        isOk: false,
        value: 14n,
      },
      ERR_INVALID_SIGNATURE_RECOVER: {
        isOk: false,
        value: 13n,
      },
      ERR_INVALID_START_BURN_HEIGHT: {
        isOk: false,
        value: 24n,
      },
      ERR_INVALID_UNLOCK_HEIGHT: {
        isOk: false,
        value: 52n,
      },
      ERR_INVALID_UNSTAKE_SBTC_AMOUNT: {
        isOk: false,
        value: 37n,
      },
      eRR_L1_EARLY_EXIT_ALREADY_ANNOUNCED: {
        isOk: false,
        value: 50n,
      },
      ERR_NOT_ALLOWLISTED: {
        isOk: false,
        value: 11n,
      },
      ERR_NOT_BOND_PARTICIPANT: {
        isOk: false,
        value: 34n,
      },
      ERR_NOT_STAKING: {
        isOk: false,
        value: 27n,
      },
      ERR_NO_CLAIMABLE_REWARDS: {
        isOk: false,
        value: 32n,
      },
      ERR_READ_TX_OUT_OF_BOUNDS: {
        isOk: false,
        value: 39n,
      },
      ERR_REENTRANT_CALL: {
        isOk: false,
        value: 49n,
      },
      ERR_REWARDS_PAUSED: {
        isOk: false,
        value: 53n,
      },
      ERR_ROLLOVER_TOO_EARLY: {
        isOk: false,
        value: 48n,
      },
      ERR_SIGNER_KEY_GRANT_NOT_FOUND: {
        isOk: false,
        value: 17n,
      },
      ERR_SIGNER_KEY_GRANT_USED: {
        isOk: false,
        value: 12n,
      },
      ERR_SIGNER_NOT_FOUND: {
        isOk: false,
        value: 23n,
      },
      ERR_STAKER_ALREADY_ADDED: {
        isOk: false,
        value: 5n,
      },
      ERR_STAKE_IN_PREPARE_PHASE: {
        isOk: false,
        value: 47n,
      },
      ERR_TOO_MUCH_SATS: {
        isOk: false,
        value: 10n,
      },
      ERR_UNAUTHORIZED: {
        isOk: false,
        value: 1n,
      },
      ERR_UNAUTHORIZED_SIGNER_REGISTRATION: {
        isOk: false,
        value: 26n,
      },
      ERR_UNSTAKE_IN_PREPARE_PHASE: {
        isOk: false,
        value: 28n,
      },
      ERR_UPDATE_BOND_SAME_SIGNER: {
        isOk: false,
        value: 44n,
      },
      MAX_NUM_CYCLES: 96n,
      pOX_5_SIGNER_DOMAIN: {
        chainId: 2_147_483_648n,
        name: "pox-5-signer",
        version: "1.0.0",
      },
      PRECISION: 1_000_000_000_000_000_000n,
      RESERVE_RATIO: 1_500n,
      SIGNER_SET_MIN_USTX: 50_000_000_000n,
      sIP018_MSG_PREFIX: Uint8Array.from([83, 73, 80, 48, 49, 56]),
      STACKS_ADDR_VERSION_MAINNET: Uint8Array.from([22]),
      STACKS_ADDR_VERSION_TESTNET: Uint8Array.from([26]),
      bondAdmin: "SP000000000000000000002Q6VF78",
      configured: false,
      firstBondPeriodCycle: 0n,
      firstBurnchainBlockHeight: 0n,
      firstPox5RewardCycle: 0n,
      lastAccountedRewardsOnly: 0n,
      lastRewardComputeHeight: 0n,
      pauseAdmin: "SP000000000000000000002Q6VF78",
      poxPrepareCycleLength: 50n,
      poxRewardCycleLength: 1_050n,
      reserveBalance: 0n,
      rewardsPaused: false,
      signerManagerCallActive: false,
      totalSbtcStaked: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "pox-5",
  },
  rewardSplitCalculatorV1: {
    functions: {
      clipInt: {
        name: "clip-int",
        access: "private",
        args: [
          { name: "lo", type: "int128" },
          { name: "hi", type: "int128" },
          { name: "v", type: "int128" },
        ],
        outputs: { type: "int128" },
      } as TypedAbiFunction<
        [
          lo: TypedAbiArg<number | bigint, "lo">,
          hi: TypedAbiArg<number | bigint, "hi">,
          v: TypedAbiArg<number | bigint, "v">,
        ],
        bigint
      >,
      computeAndApply: {
        name: "compute-and-apply",
        access: "public",
        args: [
          { name: "r-current", type: "uint128" },
          { name: "t-stbtc", type: "uint128" },
          { name: "t-ststxbtc", type: "uint128" },
          { name: "t-ststx", type: "uint128" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "boost", type: "int128" },
                  { name: "next-ema", type: "int128" },
                  { name: "ststx-bps", type: "uint128" },
                  { name: "ststxbtc-bps", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          rCurrent: TypedAbiArg<number | bigint, "rCurrent">,
          tStbtc: TypedAbiArg<number | bigint, "tStbtc">,
          tStstxbtc: TypedAbiArg<number | bigint, "tStstxbtc">,
          tStstx: TypedAbiArg<number | bigint, "tStstx">,
        ],
        Response<
          {
            boost: bigint;
            nextEma: bigint;
            ststxBps: bigint;
            ststxbtcBps: bigint;
          },
          bigint
        >
      >,
      resetEma: {
        name: "reset-ema",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      setParams: {
        name: "set-params",
        access: "public",
        args: [
          { name: "rt", type: "uint128" },
          { name: "alpha", type: "uint128" },
          { name: "gamma", type: "uint128" },
          { name: "lambda", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          rt: TypedAbiArg<number | bigint, "rt">,
          alpha: TypedAbiArg<number | bigint, "alpha">,
          gamma: TypedAbiArg<number | bigint, "gamma">,
          lambda: TypedAbiArg<number | bigint, "lambda">,
        ],
        Response<boolean, bigint>
      >,
      getAlphaMaxBps: {
        name: "get-alpha-max-bps",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getEmaDelta: {
        name: "get-ema-delta",
        access: "read_only",
        args: [],
        outputs: { type: "int128" },
      } as TypedAbiFunction<[], bigint>,
      getGammaBps: {
        name: "get-gamma-bps",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getLambdaBps: {
        name: "get-lambda-bps",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getRTarget: {
        name: "get-r-target",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      preview: {
        name: "preview",
        access: "read_only",
        args: [
          { name: "r-current", type: "uint128" },
          { name: "t-stbtc", type: "uint128" },
          { name: "t-ststxbtc", type: "uint128" },
          { name: "t-ststx", type: "uint128" },
        ],
        outputs: {
          type: {
            tuple: [
              { name: "boost", type: "int128" },
              { name: "next-ema", type: "int128" },
              { name: "ststx-bps", type: "uint128" },
              { name: "ststxbtc-bps", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [
          rCurrent: TypedAbiArg<number | bigint, "rCurrent">,
          tStbtc: TypedAbiArg<number | bigint, "tStbtc">,
          tStstxbtc: TypedAbiArg<number | bigint, "tStstxbtc">,
          tStstx: TypedAbiArg<number | bigint, "tStstx">,
        ],
        {
          boost: bigint;
          nextEma: bigint;
          ststxBps: bigint;
          ststxbtcBps: bigint;
        }
      >,
    },
    maps: {},
    variables: {
      DENOMINATOR_BPS: {
        name: "DENOMINATOR_BPS",
        type: "int128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_PARAMS: {
        name: "ERR_INVALID_PARAMS",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_AUTHORIZED: {
        name: "ERR_NOT_AUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NO_TVL: {
        name: "ERR_NO_TVL",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      alphaMaxBps: {
        name: "alpha-max-bps",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      emaDelta: {
        name: "ema-delta",
        type: "int128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      gammaBps: {
        name: "gamma-bps",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      lambdaBps: {
        name: "lambda-bps",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      rTarget: {
        name: "r-target",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      DENOMINATOR_BPS: 10_000n,
      ERR_INVALID_PARAMS: {
        isOk: false,
        value: 38_003n,
      },
      ERR_NOT_AUTHORIZED: {
        isOk: false,
        value: 38_001n,
      },
      ERR_NO_TVL: {
        isOk: false,
        value: 38_002n,
      },
      alphaMaxBps: 5_000n,
      emaDelta: 0n,
      gammaBps: 10_000n,
      lambdaBps: 3_000n,
      rTarget: 1_000n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "reward-split-calculator-v1",
  },
  rewardsPox5V1: {
    functions: {
      routeSbtcShare: {
        name: "route-sbtc-share",
        access: "private",
        args: [
          { name: "share", type: "uint128" },
          { name: "dest", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          share: TypedAbiArg<number | bigint, "share">,
          dest: TypedAbiArg<string, "dest">,
        ],
        Response<boolean, bigint>
      >,
      initialize: {
        name: "initialize",
        access: "public",
        args: [{ name: "the-keeper", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [theKeeper: TypedAbiArg<string, "theKeeper">],
        Response<boolean, bigint>
      >,
      processRewards: {
        name: "process-rewards",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<bigint, bigint>>,
      setKeeper: {
        name: "set-keeper",
        access: "public",
        args: [{ name: "new-keeper", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newKeeper: TypedAbiArg<string, "newKeeper">],
        Response<boolean, bigint>
      >,
      setSplitBps: {
        name: "set-split-bps",
        access: "public",
        args: [
          { name: "new-ststxbtc-bps", type: "uint128" },
          { name: "new-ststx-bps", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          newStstxbtcBps: TypedAbiArg<number | bigint, "newStstxbtcBps">,
          newStstxBps: TypedAbiArg<number | bigint, "newStstxBps">,
        ],
        Response<boolean, bigint>
      >,
      setStxRewardRecipient: {
        name: "set-stx-reward-recipient",
        access: "public",
        args: [{ name: "recipient", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [recipient: TypedAbiArg<string, "recipient">],
        Response<boolean, bigint>
      >,
      getKeeper: {
        name: "get-keeper",
        access: "read_only",
        args: [],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<[], string | null>,
      getReadyToRelease: {
        name: "get-ready-to-release",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getReleaseEndBlock: {
        name: "get-release-end-block",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getSbtcBalance: {
        name: "get-sbtc-balance",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStreamingRemaining: {
        name: "get-streaming-remaining",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStstxBps: {
        name: "get-ststx-bps",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStstxbtcBps: {
        name: "get-ststxbtc-bps",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxRewardRecipient: {
        name: "get-stx-reward-recipient",
        access: "read_only",
        args: [],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<[], string | null>,
    },
    maps: {},
    variables: {
      DENOMINATOR_BPS: {
        name: "DENOMINATOR_BPS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_ALREADY_INITIALIZED: {
        name: "ERR_ALREADY_INITIALIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_BPS_TOO_HIGH: {
        name: "ERR_BPS_TOO_HIGH",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_KEEPER: {
        name: "ERR_NOT_KEEPER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_RECIPIENT_NOT_SET: {
        name: "ERR_RECIPIENT_NOT_SET",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      RELEASE_WINDOW_BLOCKS: {
        name: "RELEASE_WINDOW_BLOCKS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      keeper: {
        name: "keeper",
        type: {
          optional: "principal",
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
      lastReleaseBlock: {
        name: "last-release-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      releaseEndBlock: {
        name: "release-end-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      releasePerBlock: {
        name: "release-per-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      ststxBps: {
        name: "ststx-bps",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      ststxbtcBps: {
        name: "ststxbtc-bps",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      stxRewardRecipient: {
        name: "stx-reward-recipient",
        type: {
          optional: "principal",
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      DENOMINATOR_BPS: 10_000n,
      ERR_ALREADY_INITIALIZED: {
        isOk: false,
        value: 33_005n,
      },
      ERR_BPS_TOO_HIGH: {
        isOk: false,
        value: 33_002n,
      },
      ERR_NOT_KEEPER: {
        isOk: false,
        value: 33_004n,
      },
      ERR_RECIPIENT_NOT_SET: {
        isOk: false,
        value: 33_003n,
      },
      RELEASE_WINDOW_BLOCKS: 10n,
      keeper: null,
      lastReleaseBlock: 0n,
      releaseEndBlock: 0n,
      releasePerBlock: 0n,
      ststxBps: 0n,
      ststxbtcBps: 0n,
      stxRewardRecipient: null,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "rewards-pox5-v1",
  },
  rewardsStxV1: {
    functions: {
      addRewards: {
        name: "add-rewards",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<bigint, bigint>
      >,
      initialize: {
        name: "initialize",
        access: "public",
        args: [{ name: "the-keeper", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [theKeeper: TypedAbiArg<string, "theKeeper">],
        Response<boolean, bigint>
      >,
      processRewards: {
        name: "process-rewards",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<bigint, bigint>>,
      setKeeper: {
        name: "set-keeper",
        access: "public",
        args: [{ name: "new-keeper", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newKeeper: TypedAbiArg<string, "newKeeper">],
        Response<boolean, bigint>
      >,
      getKeeper: {
        name: "get-keeper",
        access: "read_only",
        args: [],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<[], string | null>,
      getReadyToRelease: {
        name: "get-ready-to-release",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStreamingRemaining: {
        name: "get-streaming-remaining",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxBalance: {
        name: "get-stx-balance",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      ERR_ALREADY_INITIALIZED: {
        name: "ERR_ALREADY_INITIALIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_KEEPER: {
        name: "ERR_NOT_KEEPER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      RELEASE_WINDOW_BLOCKS: {
        name: "RELEASE_WINDOW_BLOCKS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      keeper: {
        name: "keeper",
        type: {
          optional: "principal",
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
      lastReleaseBlock: {
        name: "last-release-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      releaseEndBlock: {
        name: "release-end-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      releasePerBlock: {
        name: "release-per-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_ALREADY_INITIALIZED: {
        isOk: false,
        value: 34_002n,
      },
      ERR_NOT_KEEPER: {
        isOk: false,
        value: 34_001n,
      },
      RELEASE_WINDOW_BLOCKS: 10n,
      keeper: null,
      lastReleaseBlock: 0n,
      releaseEndBlock: 0n,
      releasePerBlock: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "rewards-stx-v1",
  },
  rewardsStxV2: {
    functions: {
      addRewards: {
        name: "add-rewards",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<bigint, bigint>
      >,
      initialize: {
        name: "initialize",
        access: "public",
        args: [{ name: "the-keeper", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [theKeeper: TypedAbiArg<string, "theKeeper">],
        Response<boolean, bigint>
      >,
      processRewards: {
        name: "process-rewards",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<bigint, bigint>>,
      setKeeper: {
        name: "set-keeper",
        access: "public",
        args: [{ name: "new-keeper", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newKeeper: TypedAbiArg<string, "newKeeper">],
        Response<boolean, bigint>
      >,
      getKeeper: {
        name: "get-keeper",
        access: "read_only",
        args: [],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<[], string | null>,
      getReadyToRelease: {
        name: "get-ready-to-release",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStreamingRemaining: {
        name: "get-streaming-remaining",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxBalance: {
        name: "get-stx-balance",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      ERR_ALREADY_INITIALIZED: {
        name: "ERR_ALREADY_INITIALIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_KEEPER: {
        name: "ERR_NOT_KEEPER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      RELEASE_WINDOW_BLOCKS: {
        name: "RELEASE_WINDOW_BLOCKS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      keeper: {
        name: "keeper",
        type: {
          optional: "principal",
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
      lastReleaseBlock: {
        name: "last-release-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      releaseEndBlock: {
        name: "release-end-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      releasePerBlock: {
        name: "release-per-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_ALREADY_INITIALIZED: {
        isOk: false,
        value: 34_002n,
      },
      ERR_NOT_KEEPER: {
        isOk: false,
        value: 34_001n,
      },
      RELEASE_WINDOW_BLOCKS: 10n,
      keeper: null,
      lastReleaseBlock: 0n,
      releaseEndBlock: 0n,
      releasePerBlock: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "rewards-stx-v2",
  },
  sbtcDeposit: {
    functions: {
      completeIndividualDepositsHelper: {
        name: "complete-individual-deposits-helper",
        access: "private",
        args: [
          {
            name: "deposit",
            type: {
              tuple: [
                { name: "amount", type: "uint128" },
                { name: "burn-hash", type: { buffer: { length: 32 } } },
                { name: "burn-height", type: "uint128" },
                { name: "recipient", type: "principal" },
                { name: "sweep-txid", type: { buffer: { length: 32 } } },
                { name: "txid", type: { buffer: { length: 32 } } },
                { name: "vout-index", type: "uint128" },
              ],
            },
          },
          {
            name: "helper-response",
            type: { response: { ok: "uint128", error: "uint128" } },
          },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          deposit: TypedAbiArg<
            {
              amount: number | bigint;
              burnHash: Uint8Array;
              burnHeight: number | bigint;
              recipient: string;
              sweepTxid: Uint8Array;
              txid: Uint8Array;
              voutIndex: number | bigint;
            },
            "deposit"
          >,
          helperResponse: TypedAbiArg<
            Response<number | bigint, number | bigint>,
            "helperResponse"
          >,
        ],
        Response<bigint, bigint>
      >,
      completeDepositWrapper: {
        name: "complete-deposit-wrapper",
        access: "public",
        args: [
          { name: "txid", type: { buffer: { length: 32 } } },
          { name: "vout-index", type: "uint128" },
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
          { name: "burn-hash", type: { buffer: { length: 32 } } },
          { name: "burn-height", type: "uint128" },
          { name: "sweep-txid", type: { buffer: { length: 32 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          txid: TypedAbiArg<Uint8Array, "txid">,
          voutIndex: TypedAbiArg<number | bigint, "voutIndex">,
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
          burnHash: TypedAbiArg<Uint8Array, "burnHash">,
          burnHeight: TypedAbiArg<number | bigint, "burnHeight">,
          sweepTxid: TypedAbiArg<Uint8Array, "sweepTxid">,
        ],
        Response<boolean, bigint>
      >,
      completeDepositsWrapper: {
        name: "complete-deposits-wrapper",
        access: "public",
        args: [
          {
            name: "deposits",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "amount", type: "uint128" },
                    { name: "burn-hash", type: { buffer: { length: 32 } } },
                    { name: "burn-height", type: "uint128" },
                    { name: "recipient", type: "principal" },
                    { name: "sweep-txid", type: { buffer: { length: 32 } } },
                    { name: "txid", type: { buffer: { length: 32 } } },
                    { name: "vout-index", type: "uint128" },
                  ],
                },
                length: 500,
              },
            },
          },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          deposits: TypedAbiArg<
            {
              amount: number | bigint;
              burnHash: Uint8Array;
              burnHeight: number | bigint;
              recipient: string;
              sweepTxid: Uint8Array;
              txid: Uint8Array;
              voutIndex: number | bigint;
            }[],
            "deposits"
          >,
        ],
        Response<bigint, bigint>
      >,
      getBurnHeader: {
        name: "get-burn-header",
        access: "read_only",
        args: [{ name: "height", type: "uint128" }],
        outputs: { type: { optional: { buffer: { length: 32 } } } },
      } as TypedAbiFunction<
        [height: TypedAbiArg<number | bigint, "height">],
        Uint8Array | null
      >,
    },
    maps: {},
    variables: {
      ERR_DEPOSIT: {
        name: "ERR_DEPOSIT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_DEPOSIT_INDEX_PREFIX: {
        name: "ERR_DEPOSIT_INDEX_PREFIX",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_DEPOSIT_REPLAY: {
        name: "ERR_DEPOSIT_REPLAY",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_BURN_HASH: {
        name: "ERR_INVALID_BURN_HASH",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_CALLER: {
        name: "ERR_INVALID_CALLER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_LOWER_THAN_DUST: {
        name: "ERR_LOWER_THAN_DUST",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_TXID_LEN: {
        name: "ERR_TXID_LEN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      depositRole: {
        name: "deposit-role",
        type: {
          buffer: {
            length: 1,
          },
        },
        access: "constant",
      } as TypedAbiVariable<Uint8Array>,
      dustLimit: {
        name: "dust-limit",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      txidLength: {
        name: "txid-length",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch30",
    clarity_version: "Clarity3",
    contractName: "sbtc-deposit",
  },
  sbtcRegistry: {
    functions: {
      incrementLastWithdrawalRequestId: {
        name: "increment-last-withdrawal-request-id",
        access: "private",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      completeDeposit: {
        name: "complete-deposit",
        access: "public",
        args: [
          { name: "txid", type: { buffer: { length: 32 } } },
          { name: "vout-index", type: "uint128" },
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
          { name: "burn-hash", type: { buffer: { length: 32 } } },
          { name: "burn-height", type: "uint128" },
          { name: "sweep-txid", type: { buffer: { length: 32 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          txid: TypedAbiArg<Uint8Array, "txid">,
          voutIndex: TypedAbiArg<number | bigint, "voutIndex">,
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
          burnHash: TypedAbiArg<Uint8Array, "burnHash">,
          burnHeight: TypedAbiArg<number | bigint, "burnHeight">,
          sweepTxid: TypedAbiArg<Uint8Array, "sweepTxid">,
        ],
        Response<boolean, bigint>
      >,
      completeWithdrawalAccept: {
        name: "complete-withdrawal-accept",
        access: "public",
        args: [
          { name: "request-id", type: "uint128" },
          { name: "bitcoin-txid", type: { buffer: { length: 32 } } },
          { name: "output-index", type: "uint128" },
          { name: "signer-bitmap", type: "uint128" },
          { name: "fee", type: "uint128" },
          { name: "burn-hash", type: { buffer: { length: 32 } } },
          { name: "burn-height", type: "uint128" },
          { name: "sweep-txid", type: { buffer: { length: 32 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestId: TypedAbiArg<number | bigint, "requestId">,
          bitcoinTxid: TypedAbiArg<Uint8Array, "bitcoinTxid">,
          outputIndex: TypedAbiArg<number | bigint, "outputIndex">,
          signerBitmap: TypedAbiArg<number | bigint, "signerBitmap">,
          fee: TypedAbiArg<number | bigint, "fee">,
          burnHash: TypedAbiArg<Uint8Array, "burnHash">,
          burnHeight: TypedAbiArg<number | bigint, "burnHeight">,
          sweepTxid: TypedAbiArg<Uint8Array, "sweepTxid">,
        ],
        Response<boolean, bigint>
      >,
      completeWithdrawalReject: {
        name: "complete-withdrawal-reject",
        access: "public",
        args: [
          { name: "request-id", type: "uint128" },
          { name: "signer-bitmap", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestId: TypedAbiArg<number | bigint, "requestId">,
          signerBitmap: TypedAbiArg<number | bigint, "signerBitmap">,
        ],
        Response<boolean, bigint>
      >,
      createWithdrawalRequest: {
        name: "create-withdrawal-request",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "max-fee", type: "uint128" },
          { name: "sender", type: "principal" },
          {
            name: "recipient",
            type: {
              tuple: [
                { name: "hashbytes", type: { buffer: { length: 32 } } },
                { name: "version", type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: "height", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          maxFee: TypedAbiArg<number | bigint, "maxFee">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            "recipient"
          >,
          height: TypedAbiArg<number | bigint, "height">,
        ],
        Response<bigint, bigint>
      >,
      rotateKeys: {
        name: "rotate-keys",
        access: "public",
        args: [
          {
            name: "new-keys",
            type: { list: { type: { buffer: { length: 33 } }, length: 128 } },
          },
          { name: "new-address", type: "principal" },
          { name: "new-aggregate-pubkey", type: { buffer: { length: 33 } } },
          { name: "new-signature-threshold", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          newKeys: TypedAbiArg<Uint8Array[], "newKeys">,
          newAddress: TypedAbiArg<string, "newAddress">,
          newAggregatePubkey: TypedAbiArg<Uint8Array, "newAggregatePubkey">,
          newSignatureThreshold: TypedAbiArg<
            number | bigint,
            "newSignatureThreshold"
          >,
        ],
        Response<boolean, bigint>
      >,
      updateProtocolContract: {
        name: "update-protocol-contract",
        access: "public",
        args: [
          { name: "contract-type", type: { buffer: { length: 1 } } },
          { name: "new-contract", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          contractType: TypedAbiArg<Uint8Array, "contractType">,
          newContract: TypedAbiArg<string, "newContract">,
        ],
        Response<boolean, bigint>
      >,
      getActiveProtocol: {
        name: "get-active-protocol",
        access: "read_only",
        args: [{ name: "contract-flag", type: { buffer: { length: 1 } } }],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<
        [contractFlag: TypedAbiArg<Uint8Array, "contractFlag">],
        string | null
      >,
      getCompletedDeposit: {
        name: "get-completed-deposit",
        access: "read_only",
        args: [
          { name: "txid", type: { buffer: { length: 32 } } },
          { name: "vout-index", type: "uint128" },
        ],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "amount", type: "uint128" },
                { name: "recipient", type: "principal" },
                { name: "sweep-burn-hash", type: { buffer: { length: 32 } } },
                { name: "sweep-burn-height", type: "uint128" },
                { name: "sweep-txid", type: { buffer: { length: 32 } } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [
          txid: TypedAbiArg<Uint8Array, "txid">,
          voutIndex: TypedAbiArg<number | bigint, "voutIndex">,
        ],
        {
          amount: bigint;
          recipient: string;
          sweepBurnHash: Uint8Array;
          sweepBurnHeight: bigint;
          sweepTxid: Uint8Array;
        } | null
      >,
      getCompletedWithdrawalSweepData: {
        name: "get-completed-withdrawal-sweep-data",
        access: "read_only",
        args: [{ name: "id", type: "uint128" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "sweep-burn-hash", type: { buffer: { length: 32 } } },
                { name: "sweep-burn-height", type: "uint128" },
                { name: "sweep-txid", type: { buffer: { length: 32 } } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [id: TypedAbiArg<number | bigint, "id">],
        {
          sweepBurnHash: Uint8Array;
          sweepBurnHeight: bigint;
          sweepTxid: Uint8Array;
        } | null
      >,
      getCurrentAggregatePubkey: {
        name: "get-current-aggregate-pubkey",
        access: "read_only",
        args: [],
        outputs: { type: { buffer: { length: 33 } } },
      } as TypedAbiFunction<[], Uint8Array>,
      getCurrentSignerData: {
        name: "get-current-signer-data",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            tuple: [
              {
                name: "current-aggregate-pubkey",
                type: { buffer: { length: 33 } },
              },
              { name: "current-signature-threshold", type: "uint128" },
              { name: "current-signer-principal", type: "principal" },
              {
                name: "current-signer-set",
                type: {
                  list: { type: { buffer: { length: 33 } }, length: 128 },
                },
              },
            ],
          },
        },
      } as TypedAbiFunction<
        [],
        {
          currentAggregatePubkey: Uint8Array;
          currentSignatureThreshold: bigint;
          currentSignerPrincipal: string;
          currentSignerSet: Uint8Array[];
        }
      >,
      getCurrentSignerPrincipal: {
        name: "get-current-signer-principal",
        access: "read_only",
        args: [],
        outputs: { type: "principal" },
      } as TypedAbiFunction<[], string>,
      getCurrentSignerSet: {
        name: "get-current-signer-set",
        access: "read_only",
        args: [],
        outputs: {
          type: { list: { type: { buffer: { length: 33 } }, length: 128 } },
        },
      } as TypedAbiFunction<[], Uint8Array[]>,
      getDepositStatus: {
        name: "get-deposit-status",
        access: "read_only",
        args: [
          { name: "txid", type: { buffer: { length: 32 } } },
          { name: "vout-index", type: "uint128" },
        ],
        outputs: { type: { optional: "bool" } },
      } as TypedAbiFunction<
        [
          txid: TypedAbiArg<Uint8Array, "txid">,
          voutIndex: TypedAbiArg<number | bigint, "voutIndex">,
        ],
        boolean | null
      >,
      getWithdrawalRequest: {
        name: "get-withdrawal-request",
        access: "read_only",
        args: [{ name: "id", type: "uint128" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "amount", type: "uint128" },
                { name: "block-height", type: "uint128" },
                { name: "max-fee", type: "uint128" },
                {
                  name: "recipient",
                  type: {
                    tuple: [
                      { name: "hashbytes", type: { buffer: { length: 32 } } },
                      { name: "version", type: { buffer: { length: 1 } } },
                    ],
                  },
                },
                { name: "sender", type: "principal" },
                { name: "status", type: { optional: "bool" } },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [id: TypedAbiArg<number | bigint, "id">],
        {
          amount: bigint;
          blockHeight: bigint;
          maxFee: bigint;
          recipient: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          sender: string;
          status: boolean | null;
        } | null
      >,
      isProtocolCaller: {
        name: "is-protocol-caller",
        access: "read_only",
        args: [
          { name: "contract-flag", type: { buffer: { length: 1 } } },
          { name: "contract", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          contractFlag: TypedAbiArg<Uint8Array, "contractFlag">,
          contract: TypedAbiArg<string, "contract">,
        ],
        Response<boolean, bigint>
      >,
    },
    maps: {
      activeProtocolContracts: {
        name: "active-protocol-contracts",
        key: { buffer: { length: 1 } },
        value: "principal",
      } as TypedAbiMap<Uint8Array, string>,
      activeProtocolRoles: {
        name: "active-protocol-roles",
        key: "principal",
        value: { buffer: { length: 1 } },
      } as TypedAbiMap<string, Uint8Array>,
      aggregatePubkeys: {
        name: "aggregate-pubkeys",
        key: { buffer: { length: 33 } },
        value: "bool",
      } as TypedAbiMap<Uint8Array, boolean>,
      completedDeposits: {
        name: "completed-deposits",
        key: {
          tuple: [
            { name: "txid", type: { buffer: { length: 32 } } },
            { name: "vout-index", type: "uint128" },
          ],
        },
        value: {
          tuple: [
            { name: "amount", type: "uint128" },
            { name: "recipient", type: "principal" },
            { name: "sweep-burn-hash", type: { buffer: { length: 32 } } },
            { name: "sweep-burn-height", type: "uint128" },
            { name: "sweep-txid", type: { buffer: { length: 32 } } },
          ],
        },
      } as TypedAbiMap<
        {
          txid: Uint8Array;
          voutIndex: number | bigint;
        },
        {
          amount: bigint;
          recipient: string;
          sweepBurnHash: Uint8Array;
          sweepBurnHeight: bigint;
          sweepTxid: Uint8Array;
        }
      >,
      completedWithdrawalSweep: {
        name: "completed-withdrawal-sweep",
        key: "uint128",
        value: {
          tuple: [
            { name: "sweep-burn-hash", type: { buffer: { length: 32 } } },
            { name: "sweep-burn-height", type: "uint128" },
            { name: "sweep-txid", type: { buffer: { length: 32 } } },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          sweepBurnHash: Uint8Array;
          sweepBurnHeight: bigint;
          sweepTxid: Uint8Array;
        }
      >,
      depositStatus: {
        name: "deposit-status",
        key: {
          tuple: [
            { name: "txid", type: { buffer: { length: 32 } } },
            { name: "vout-index", type: "uint128" },
          ],
        },
        value: "bool",
      } as TypedAbiMap<
        {
          txid: Uint8Array;
          voutIndex: number | bigint;
        },
        boolean
      >,
      withdrawalRequests: {
        name: "withdrawal-requests",
        key: "uint128",
        value: {
          tuple: [
            { name: "amount", type: "uint128" },
            { name: "block-height", type: "uint128" },
            { name: "max-fee", type: "uint128" },
            {
              name: "recipient",
              type: {
                tuple: [
                  { name: "hashbytes", type: { buffer: { length: 32 } } },
                  { name: "version", type: { buffer: { length: 1 } } },
                ],
              },
            },
            { name: "sender", type: "principal" },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          amount: bigint;
          blockHeight: bigint;
          maxFee: bigint;
          recipient: {
            hashbytes: Uint8Array;
            version: Uint8Array;
          };
          sender: string;
        }
      >,
      withdrawalStatus: {
        name: "withdrawal-status",
        key: "uint128",
        value: "bool",
      } as TypedAbiMap<number | bigint, boolean>,
    },
    variables: {
      ERR_AGG_PUBKEY_REPLAY: {
        name: "ERR_AGG_PUBKEY_REPLAY",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_REQUEST_ID: {
        name: "ERR_INVALID_REQUEST_ID",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_UNAUTHORIZED: {
        name: "ERR_UNAUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      depositRole: {
        name: "deposit-role",
        type: {
          buffer: {
            length: 1,
          },
        },
        access: "constant",
      } as TypedAbiVariable<Uint8Array>,
      governanceRole: {
        name: "governance-role",
        type: {
          buffer: {
            length: 1,
          },
        },
        access: "constant",
      } as TypedAbiVariable<Uint8Array>,
      withdrawalRole: {
        name: "withdrawal-role",
        type: {
          buffer: {
            length: 1,
          },
        },
        access: "constant",
      } as TypedAbiVariable<Uint8Array>,
      currentAggregatePubkey: {
        name: "current-aggregate-pubkey",
        type: {
          buffer: {
            length: 33,
          },
        },
        access: "variable",
      } as TypedAbiVariable<Uint8Array>,
      currentSignatureThreshold: {
        name: "current-signature-threshold",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      currentSignerPrincipal: {
        name: "current-signer-principal",
        type: "principal",
        access: "variable",
      } as TypedAbiVariable<string>,
      currentSignerSet: {
        name: "current-signer-set",
        type: {
          list: {
            type: {
              buffer: {
                length: 33,
              },
            },
            length: 128,
          },
        },
        access: "variable",
      } as TypedAbiVariable<Uint8Array[]>,
      lastWithdrawalRequestId: {
        name: "last-withdrawal-request-id",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch30",
    clarity_version: "Clarity3",
    contractName: "sbtc-registry",
  },
  sbtcToken: {
    functions: {
      protocolMintManyIter: {
        name: "protocol-mint-many-iter",
        access: "private",
        args: [
          {
            name: "item",
            type: {
              tuple: [
                { name: "amount", type: "uint128" },
                { name: "recipient", type: "principal" },
              ],
            },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          item: TypedAbiArg<
            {
              amount: number | bigint;
              recipient: string;
            },
            "item"
          >,
        ],
        Response<boolean, bigint>
      >,
      transferManyIter: {
        name: "transfer-many-iter",
        access: "private",
        args: [
          {
            name: "individual-transfer",
            type: {
              tuple: [
                { name: "amount", type: "uint128" },
                {
                  name: "memo",
                  type: { optional: { buffer: { length: 34 } } },
                },
                { name: "sender", type: "principal" },
                { name: "to", type: "principal" },
              ],
            },
          },
          {
            name: "result",
            type: { response: { ok: "uint128", error: "uint128" } },
          },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          individualTransfer: TypedAbiArg<
            {
              amount: number | bigint;
              memo: Uint8Array | null;
              sender: string;
              to: string;
            },
            "individualTransfer"
          >,
          result: TypedAbiArg<
            Response<number | bigint, number | bigint>,
            "result"
          >,
        ],
        Response<bigint, bigint>
      >,
      protocolBurn: {
        name: "protocol-burn",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "owner", type: "principal" },
          { name: "contract-flag", type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          owner: TypedAbiArg<string, "owner">,
          contractFlag: TypedAbiArg<Uint8Array, "contractFlag">,
        ],
        Response<boolean, bigint>
      >,
      protocolBurnLocked: {
        name: "protocol-burn-locked",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "owner", type: "principal" },
          { name: "contract-flag", type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          owner: TypedAbiArg<string, "owner">,
          contractFlag: TypedAbiArg<Uint8Array, "contractFlag">,
        ],
        Response<boolean, bigint>
      >,
      protocolLock: {
        name: "protocol-lock",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "owner", type: "principal" },
          { name: "contract-flag", type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          owner: TypedAbiArg<string, "owner">,
          contractFlag: TypedAbiArg<Uint8Array, "contractFlag">,
        ],
        Response<boolean, bigint>
      >,
      protocolMint: {
        name: "protocol-mint",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
          { name: "contract-flag", type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
          contractFlag: TypedAbiArg<Uint8Array, "contractFlag">,
        ],
        Response<boolean, bigint>
      >,
      protocolMintMany: {
        name: "protocol-mint-many",
        access: "public",
        args: [
          {
            name: "recipients",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "amount", type: "uint128" },
                    { name: "recipient", type: "principal" },
                  ],
                },
                length: 200,
              },
            },
          },
          { name: "contract-flag", type: { buffer: { length: 1 } } },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                list: {
                  type: { response: { ok: "bool", error: "uint128" } },
                  length: 200,
                },
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          recipients: TypedAbiArg<
            {
              amount: number | bigint;
              recipient: string;
            }[],
            "recipients"
          >,
          contractFlag: TypedAbiArg<Uint8Array, "contractFlag">,
        ],
        Response<Response<boolean, bigint>[], bigint>
      >,
      protocolSetName: {
        name: "protocol-set-name",
        access: "public",
        args: [
          { name: "new-name", type: { "string-ascii": { length: 32 } } },
          { name: "contract-flag", type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          newName: TypedAbiArg<string, "newName">,
          contractFlag: TypedAbiArg<Uint8Array, "contractFlag">,
        ],
        Response<boolean, bigint>
      >,
      protocolSetSymbol: {
        name: "protocol-set-symbol",
        access: "public",
        args: [
          { name: "new-symbol", type: { "string-ascii": { length: 10 } } },
          { name: "contract-flag", type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          newSymbol: TypedAbiArg<string, "newSymbol">,
          contractFlag: TypedAbiArg<Uint8Array, "contractFlag">,
        ],
        Response<boolean, bigint>
      >,
      protocolSetTokenUri: {
        name: "protocol-set-token-uri",
        access: "public",
        args: [
          {
            name: "new-uri",
            type: { optional: { "string-utf8": { length: 256 } } },
          },
          { name: "contract-flag", type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          newUri: TypedAbiArg<string | null, "newUri">,
          contractFlag: TypedAbiArg<Uint8Array, "contractFlag">,
        ],
        Response<boolean, bigint>
      >,
      protocolUnlock: {
        name: "protocol-unlock",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "owner", type: "principal" },
          { name: "contract-flag", type: { buffer: { length: 1 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          owner: TypedAbiArg<string, "owner">,
          contractFlag: TypedAbiArg<Uint8Array, "contractFlag">,
        ],
        Response<boolean, bigint>
      >,
      transfer: {
        name: "transfer",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
          { name: "recipient", type: "principal" },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<string, "recipient">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
        ],
        Response<boolean, bigint>
      >,
      transferMany: {
        name: "transfer-many",
        access: "public",
        args: [
          {
            name: "recipients",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "amount", type: "uint128" },
                    {
                      name: "memo",
                      type: { optional: { buffer: { length: 34 } } },
                    },
                    { name: "sender", type: "principal" },
                    { name: "to", type: "principal" },
                  ],
                },
                length: 200,
              },
            },
          },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          recipients: TypedAbiArg<
            {
              amount: number | bigint;
              memo: Uint8Array | null;
              sender: string;
              to: string;
            }[],
            "recipients"
          >,
        ],
        Response<bigint, bigint>
      >,
      getBalance: {
        name: "get-balance",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [who: TypedAbiArg<string, "who">],
        Response<bigint, null>
      >,
      getBalanceAvailable: {
        name: "get-balance-available",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [who: TypedAbiArg<string, "who">],
        Response<bigint, null>
      >,
      getBalanceLocked: {
        name: "get-balance-locked",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [who: TypedAbiArg<string, "who">],
        Response<bigint, null>
      >,
      getDecimals: {
        name: "get-decimals",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getName: {
        name: "get-name",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 32 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getSymbol: {
        name: "get-symbol",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 10 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getTokenUri: {
        name: "get-token-uri",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: {
              ok: { optional: { "string-utf8": { length: 256 } } },
              error: "none",
            },
          },
        },
      } as TypedAbiFunction<[], Response<string | null, null>>,
      getTotalSupply: {
        name: "get-total-supply",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
    },
    maps: {},
    variables: {
      ERR_NOT_OWNER: {
        name: "ERR_NOT_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_TRANSFER_INDEX_PREFIX: {
        name: "ERR_TRANSFER_INDEX_PREFIX",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      tokenDecimals: {
        name: "token-decimals",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      tokenName: {
        name: "token-name",
        type: {
          "string-ascii": {
            length: 32,
          },
        },
        access: "variable",
      } as TypedAbiVariable<string>,
      tokenSymbol: {
        name: "token-symbol",
        type: {
          "string-ascii": {
            length: 10,
          },
        },
        access: "variable",
      } as TypedAbiVariable<string>,
      tokenUri: {
        name: "token-uri",
        type: {
          optional: {
            "string-utf8": {
              length: 256,
            },
          },
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [{ name: "sbtc-token" }, { name: "sbtc-token-locked" }],
    epoch: "Epoch30",
    clarity_version: "Clarity3",
    contractName: "sbtc-token",
  },
  sbtcWithdrawal: {
    functions: {
      completeIndividualWithdrawalHelper: {
        name: "complete-individual-withdrawal-helper",
        access: "private",
        args: [
          {
            name: "withdrawal",
            type: {
              tuple: [
                {
                  name: "bitcoin-txid",
                  type: { optional: { buffer: { length: 32 } } },
                },
                { name: "burn-hash", type: { buffer: { length: 32 } } },
                { name: "burn-height", type: "uint128" },
                { name: "fee", type: { optional: "uint128" } },
                { name: "output-index", type: { optional: "uint128" } },
                { name: "request-id", type: "uint128" },
                { name: "signer-bitmap", type: "uint128" },
                { name: "status", type: "bool" },
                {
                  name: "sweep-txid",
                  type: { optional: { buffer: { length: 32 } } },
                },
              ],
            },
          },
          {
            name: "helper-response",
            type: { response: { ok: "uint128", error: "uint128" } },
          },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          withdrawal: TypedAbiArg<
            {
              bitcoinTxid: Uint8Array | null;
              burnHash: Uint8Array;
              burnHeight: number | bigint;
              fee: number | bigint | null;
              outputIndex: number | bigint | null;
              requestId: number | bigint;
              signerBitmap: number | bigint;
              status: boolean;
              sweepTxid: Uint8Array | null;
            },
            "withdrawal"
          >,
          helperResponse: TypedAbiArg<
            Response<number | bigint, number | bigint>,
            "helperResponse"
          >,
        ],
        Response<bigint, bigint>
      >,
      acceptWithdrawalRequest: {
        name: "accept-withdrawal-request",
        access: "public",
        args: [
          { name: "request-id", type: "uint128" },
          { name: "bitcoin-txid", type: { buffer: { length: 32 } } },
          { name: "signer-bitmap", type: "uint128" },
          { name: "output-index", type: "uint128" },
          { name: "fee", type: "uint128" },
          { name: "burn-hash", type: { buffer: { length: 32 } } },
          { name: "burn-height", type: "uint128" },
          { name: "sweep-txid", type: { buffer: { length: 32 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestId: TypedAbiArg<number | bigint, "requestId">,
          bitcoinTxid: TypedAbiArg<Uint8Array, "bitcoinTxid">,
          signerBitmap: TypedAbiArg<number | bigint, "signerBitmap">,
          outputIndex: TypedAbiArg<number | bigint, "outputIndex">,
          fee: TypedAbiArg<number | bigint, "fee">,
          burnHash: TypedAbiArg<Uint8Array, "burnHash">,
          burnHeight: TypedAbiArg<number | bigint, "burnHeight">,
          sweepTxid: TypedAbiArg<Uint8Array, "sweepTxid">,
        ],
        Response<boolean, bigint>
      >,
      completeWithdrawals: {
        name: "complete-withdrawals",
        access: "public",
        args: [
          {
            name: "withdrawals",
            type: {
              list: {
                type: {
                  tuple: [
                    {
                      name: "bitcoin-txid",
                      type: { optional: { buffer: { length: 32 } } },
                    },
                    { name: "burn-hash", type: { buffer: { length: 32 } } },
                    { name: "burn-height", type: "uint128" },
                    { name: "fee", type: { optional: "uint128" } },
                    { name: "output-index", type: { optional: "uint128" } },
                    { name: "request-id", type: "uint128" },
                    { name: "signer-bitmap", type: "uint128" },
                    { name: "status", type: "bool" },
                    {
                      name: "sweep-txid",
                      type: { optional: { buffer: { length: 32 } } },
                    },
                  ],
                },
                length: 600,
              },
            },
          },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          withdrawals: TypedAbiArg<
            {
              bitcoinTxid: Uint8Array | null;
              burnHash: Uint8Array;
              burnHeight: number | bigint;
              fee: number | bigint | null;
              outputIndex: number | bigint | null;
              requestId: number | bigint;
              signerBitmap: number | bigint;
              status: boolean;
              sweepTxid: Uint8Array | null;
            }[],
            "withdrawals"
          >,
        ],
        Response<bigint, bigint>
      >,
      initiateWithdrawalRequest: {
        name: "initiate-withdrawal-request",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          {
            name: "recipient",
            type: {
              tuple: [
                { name: "hashbytes", type: { buffer: { length: 32 } } },
                { name: "version", type: { buffer: { length: 1 } } },
              ],
            },
          },
          { name: "max-fee", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            "recipient"
          >,
          maxFee: TypedAbiArg<number | bigint, "maxFee">,
        ],
        Response<bigint, bigint>
      >,
      rejectWithdrawalRequest: {
        name: "reject-withdrawal-request",
        access: "public",
        args: [
          { name: "request-id", type: "uint128" },
          { name: "signer-bitmap", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestId: TypedAbiArg<number | bigint, "requestId">,
          signerBitmap: TypedAbiArg<number | bigint, "signerBitmap">,
        ],
        Response<boolean, bigint>
      >,
      getBurnHeader: {
        name: "get-burn-header",
        access: "read_only",
        args: [{ name: "height", type: "uint128" }],
        outputs: { type: { optional: { buffer: { length: 32 } } } },
      } as TypedAbiFunction<
        [height: TypedAbiArg<number | bigint, "height">],
        Uint8Array | null
      >,
      validateRecipient: {
        name: "validate-recipient",
        access: "read_only",
        args: [
          {
            name: "recipient",
            type: {
              tuple: [
                { name: "hashbytes", type: { buffer: { length: 32 } } },
                { name: "version", type: { buffer: { length: 1 } } },
              ],
            },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          recipient: TypedAbiArg<
            {
              hashbytes: Uint8Array;
              version: Uint8Array;
            },
            "recipient"
          >,
        ],
        Response<boolean, bigint>
      >,
    },
    maps: {},
    variables: {
      DUST_LIMIT: {
        name: "DUST_LIMIT",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_ALREADY_PROCESSED: {
        name: "ERR_ALREADY_PROCESSED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_DUST_LIMIT: {
        name: "ERR_DUST_LIMIT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_FEE_TOO_HIGH: {
        name: "ERR_FEE_TOO_HIGH",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_ADDR_HASHBYTES: {
        name: "ERR_INVALID_ADDR_HASHBYTES",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_ADDR_VERSION: {
        name: "ERR_INVALID_ADDR_VERSION",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_BURN_HASH: {
        name: "ERR_INVALID_BURN_HASH",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_CALLER: {
        name: "ERR_INVALID_CALLER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_REQUEST: {
        name: "ERR_INVALID_REQUEST",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAWAL_INDEX: {
        name: "ERR_WITHDRAWAL_INDEX",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAWAL_INDEX_PREFIX: {
        name: "ERR_WITHDRAWAL_INDEX_PREFIX",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      MAX_ADDRESS_VERSION: {
        name: "MAX_ADDRESS_VERSION",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      mAX_ADDRESS_VERSION_BUFF_20: {
        name: "MAX_ADDRESS_VERSION_BUFF_20",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      mAX_ADDRESS_VERSION_BUFF_32: {
        name: "MAX_ADDRESS_VERSION_BUFF_32",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      withdrawRole: {
        name: "withdraw-role",
        type: {
          buffer: {
            length: 1,
          },
        },
        access: "constant",
      } as TypedAbiVariable<Uint8Array>,
    },
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch30",
    clarity_version: "Clarity3",
    contractName: "sbtc-withdrawal",
  },
  sdaoStakingSbtcV1: {
    functions: {
      increaseCummRewardPerStake: {
        name: "increase-cumm-reward-per-stake",
        access: "private",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      addRewards: {
        name: "add-rewards",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "end-block", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          endBlock: TypedAbiArg<number | bigint, "endBlock">,
        ],
        Response<bigint, bigint>
      >,
      claimPendingRewards: {
        name: "claim-pending-rewards",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<bigint, bigint>>,
      setShutdownStake: {
        name: "set-shutdown-stake",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      stake: {
        name: "stake",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<bigint, bigint>
      >,
      unstake: {
        name: "unstake",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<bigint, bigint>
      >,
      calculateCummRewardPerStake: {
        name: "calculate-cumm-reward-per-stake",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getCummRewardPerStake: {
        name: "get-cumm-reward-per-stake",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getLastRewardIncreaseBlock: {
        name: "get-last-reward-increase-block",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getPendingRewards: {
        name: "get-pending-rewards",
        access: "read_only",
        args: [{ name: "staker", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [staker: TypedAbiArg<string, "staker">],
        Response<bigint, null>
      >,
      getRewardsEndBlock: {
        name: "get-rewards-end-block",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getRewardsPerBlock: {
        name: "get-rewards-per-block",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getShutdownStake: {
        name: "get-shutdown-stake",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getStakeAmountOf: {
        name: "get-stake-amount-of",
        access: "read_only",
        args: [{ name: "staker", type: "principal" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[staker: TypedAbiArg<string, "staker">], bigint>,
      getStakeCummRewardPerStakeOf: {
        name: "get-stake-cumm-reward-per-stake-of",
        access: "read_only",
        args: [{ name: "staker", type: "principal" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[staker: TypedAbiArg<string, "staker">], bigint>,
      getStakeOf: {
        name: "get-stake-of",
        access: "read_only",
        args: [{ name: "staker", type: "principal" }],
        outputs: {
          type: {
            tuple: [
              { name: "amount", type: "uint128" },
              { name: "cumm-reward-per-stake", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [staker: TypedAbiArg<string, "staker">],
        {
          amount: bigint;
          cummRewardPerStake: bigint;
        }
      >,
      getTotalStaked: {
        name: "get-total-staked",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getUnassignedRewards: {
        name: "get-unassigned-rewards",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {
      stakes: {
        name: "stakes",
        key: { tuple: [{ name: "staker", type: "principal" }] },
        value: {
          tuple: [
            { name: "amount", type: "uint128" },
            { name: "cumm-reward-per-stake", type: "uint128" },
          ],
        },
      } as TypedAbiMap<
        {
          staker: string;
        },
        {
          amount: bigint;
          cummRewardPerStake: bigint;
        }
      >,
    },
    variables: {
      ERR_INSUFFICIENT_STAKE: {
        name: "ERR_INSUFFICIENT_STAKE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_END_BLOCK: {
        name: "ERR_INVALID_END_BLOCK",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_REWARDS_CALC: {
        name: "ERR_REWARDS_CALC",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SHUTDOWN: {
        name: "ERR_SHUTDOWN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      REWARD_SCALE: {
        name: "REWARD_SCALE",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      cummRewardPerStake: {
        name: "cumm-reward-per-stake",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      lastRewardIncreaseBlock: {
        name: "last-reward-increase-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      rewardsEndBlock: {
        name: "rewards-end-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      rewardsPerBlock: {
        name: "rewards-per-block",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      shutdownStake: {
        name: "shutdown-stake",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      totalStaked: {
        name: "total-staked",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      unassignedRewards: {
        name: "unassigned-rewards",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_INSUFFICIENT_STAKE: {
        isOk: false,
        value: 12_003n,
      },
      ERR_INVALID_END_BLOCK: {
        isOk: false,
        value: 12_002n,
      },
      ERR_REWARDS_CALC: {
        isOk: false,
        value: 12_001n,
      },
      ERR_SHUTDOWN: {
        isOk: false,
        value: 12_004n,
      },
      REWARD_SCALE: 10_000_000_000n,
      cummRewardPerStake: 0n,
      lastRewardIncreaseBlock: 3n,
      rewardsEndBlock: 0n,
      rewardsPerBlock: 0n,
      shutdownStake: false,
      totalStaked: 0n,
      unassignedRewards: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "sdao-staking-sbtc-v1",
  },
  sdaoToken: {
    functions: {
      burn: {
        name: "burn",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<boolean, bigint>
      >,
      burnForProtocol: {
        name: "burn-for-protocol",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
        ],
        Response<boolean, bigint>
      >,
      mintForProtocol: {
        name: "mint-for-protocol",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      setTokenUri: {
        name: "set-token-uri",
        access: "public",
        args: [{ name: "value", type: { "string-utf8": { length: 256 } } }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [value: TypedAbiArg<string, "value">],
        Response<boolean, bigint>
      >,
      transfer: {
        name: "transfer",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
          { name: "recipient", type: "principal" },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<string, "recipient">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
        ],
        Response<boolean, bigint>
      >,
      getBalance: {
        name: "get-balance",
        access: "read_only",
        args: [{ name: "account", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [account: TypedAbiArg<string, "account">],
        Response<bigint, null>
      >,
      getDecimals: {
        name: "get-decimals",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getName: {
        name: "get-name",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 17 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getSymbol: {
        name: "get-symbol",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 4 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getTokenUri: {
        name: "get-token-uri",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: {
              ok: { optional: { "string-utf8": { length: 256 } } },
              error: "none",
            },
          },
        },
      } as TypedAbiFunction<[], Response<string | null, null>>,
      getTotalSupply: {
        name: "get-total-supply",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
    },
    maps: {},
    variables: {
      ERR_NOT_AUTHORIZED: {
        name: "ERR_NOT_AUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      tokenUri: {
        name: "token-uri",
        type: {
          optional: {
            "string-utf8": {
              length: 256,
            },
          },
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_NOT_AUTHORIZED: {
        isOk: false,
        value: 4n,
      },
      tokenUri: null,
    },
    non_fungible_tokens: [],
    fungible_tokens: [{ name: "sdao" }],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "sdao-token",
  },
  signerAdminV1: {
    functions: {
      setAdmin: {
        name: "set-admin",
        access: "public",
        args: [
          { name: "manager", type: "principal" },
          { name: "who", type: "principal" },
          { name: "enabled", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          manager: TypedAbiArg<string, "manager">,
          who: TypedAbiArg<string, "who">,
          enabled: TypedAbiArg<boolean, "enabled">,
        ],
        Response<boolean, bigint>
      >,
      isAdmin: {
        name: "is-admin",
        access: "read_only",
        args: [
          { name: "manager", type: "principal" },
          { name: "who", type: "principal" },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [
          manager: TypedAbiArg<string, "manager">,
          who: TypedAbiArg<string, "who">,
        ],
        boolean
      >,
    },
    maps: {
      admins: {
        name: "admins",
        key: {
          tuple: [
            { name: "manager", type: "principal" },
            { name: "who", type: "principal" },
          ],
        },
        value: "bool",
      } as TypedAbiMap<
        {
          manager: string;
          who: string;
        },
        boolean
      >,
    },
    variables: {
      ERR_NOT_ADMIN: {
        name: "ERR_NOT_ADMIN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
    },
    constants: {
      ERR_NOT_ADMIN: {
        isOk: false,
        value: 35_001n,
      },
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "signer-admin-v1",
  },
  signerManagerV1: {
    functions: {
      authorizeAdmin: {
        name: "authorize-admin",
        access: "private",
        args: [],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<boolean, bigint>>,
      claimRewards: {
        name: "claim-rewards",
        access: "public",
        args: [
          {
            name: "bond-periods",
            type: { list: { type: "uint128", length: 6 } },
          },
          { name: "reward-cycle", type: "uint128" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  {
                    name: "bond-rewards",
                    type: {
                      list: {
                        type: {
                          tuple: [
                            { name: "bond-index", type: "uint128" },
                            { name: "earned", type: "uint128" },
                            { name: "rewards-per-token", type: "uint128" },
                          ],
                        },
                        length: 6,
                      },
                    },
                  },
                  { name: "bond-totals", type: "uint128" },
                  {
                    name: "stx-rewards",
                    type: {
                      tuple: [
                        { name: "earned", type: "uint128" },
                        { name: "rewards-per-token", type: "uint128" },
                      ],
                    },
                  },
                  { name: "total-rewards", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          bondPeriods: TypedAbiArg<number | bigint[], "bondPeriods">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
        ],
        Response<
          {
            bondRewards: {
              bondIndex: bigint;
              earned: bigint;
              rewardsPerToken: bigint;
            }[];
            bondTotals: bigint;
            stxRewards: {
              earned: bigint;
              rewardsPerToken: bigint;
            };
            totalRewards: bigint;
          },
          bigint
        >
      >,
      registerSelf: {
        name: "register-self",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "signer-key", type: { buffer: { length: 33 } } },
          { name: "auth-id", type: "uint128" },
          { name: "signer-sig", type: { buffer: { length: 65 } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          signerKey: TypedAbiArg<Uint8Array, "signerKey">,
          authId: TypedAbiArg<number | bigint, "authId">,
          signerSig: TypedAbiArg<Uint8Array, "signerSig">,
        ],
        Response<boolean, bigint>
      >,
      setAllowedStaker: {
        name: "set-allowed-staker",
        access: "public",
        args: [
          { name: "staker", type: "principal" },
          { name: "allowed", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          allowed: TypedAbiArg<boolean, "allowed">,
        ],
        Response<boolean, bigint>
      >,
      setRewardsRecipient: {
        name: "set-rewards-recipient",
        access: "public",
        args: [{ name: "recipient", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [recipient: TypedAbiArg<string, "recipient">],
        Response<boolean, bigint>
      >,
      validateStake_x: {
        name: "validate-stake!",
        access: "public",
        args: [
          { name: "staker", type: "principal" },
          { name: "first-index", type: "uint128" },
          { name: "num-indexes", type: "uint128" },
          { name: "amount-ustx", type: "uint128" },
          { name: "amount-sats", type: "uint128" },
          { name: "is-bond", type: "bool" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          firstIndex: TypedAbiArg<number | bigint, "firstIndex">,
          numIndexes: TypedAbiArg<number | bigint, "numIndexes">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          amountSats: TypedAbiArg<number | bigint, "amountSats">,
          isBond: TypedAbiArg<boolean, "isBond">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      getRewardsRecipient: {
        name: "get-rewards-recipient",
        access: "read_only",
        args: [],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<[], string | null>,
      isAdmin: {
        name: "is-admin",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
      isAllowedStaker: {
        name: "is-allowed-staker",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {
      allowedStakers: {
        name: "allowed-stakers",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
    },
    variables: {
      ERR_RECIPIENT_NOT_SET: {
        name: "ERR_RECIPIENT_NOT_SET",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_STAKER_NOT_ALLOWED: {
        name: "ERR_STAKER_NOT_ALLOWED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_UNAUTHORIZED_ADMIN: {
        name: "ERR_UNAUTHORIZED_ADMIN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      rewardsRecipient: {
        name: "rewards-recipient",
        type: {
          optional: "principal",
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_RECIPIENT_NOT_SET: {
        isOk: false,
        value: 30_003n,
      },
      ERR_STAKER_NOT_ALLOWED: {
        isOk: false,
        value: 30_002n,
      },
      ERR_UNAUTHORIZED_ADMIN: {
        isOk: false,
        value: 30_001n,
      },
      rewardsRecipient: null,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "signer-manager-v1",
  },
  signerPayoutV1: {
    functions: {
      isErrResponse: {
        name: "is-err-response",
        access: "private",
        args: [
          {
            name: "result",
            type: { response: { ok: "bool", error: "uint128" } },
          },
        ],
        outputs: { type: "bool" },
      } as TypedAbiFunction<
        [result: TypedAbiArg<Response<boolean, number | bigint>, "result">],
        boolean
      >,
      sendAllocation: {
        name: "send-allocation",
        access: "private",
        args: [
          {
            name: "alloc",
            type: {
              tuple: [
                { name: "sbtc-amount", type: "uint128" },
                { name: "signer", type: "principal" },
              ],
            },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          alloc: TypedAbiArg<
            {
              sbtcAmount: number | bigint;
              signer: string;
            },
            "alloc"
          >,
        ],
        Response<boolean, bigint>
      >,
      distribute: {
        name: "distribute",
        access: "public",
        args: [
          {
            name: "allocations",
            type: {
              list: {
                type: {
                  tuple: [
                    { name: "sbtc-amount", type: "uint128" },
                    { name: "signer", type: "principal" },
                  ],
                },
                length: 20,
              },
            },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          allocations: TypedAbiArg<
            {
              sbtcAmount: number | bigint;
              signer: string;
            }[],
            "allocations"
          >,
        ],
        Response<boolean, bigint>
      >,
      initialize: {
        name: "initialize",
        access: "public",
        args: [{ name: "the-keeper", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [theKeeper: TypedAbiArg<string, "theKeeper">],
        Response<boolean, bigint>
      >,
      setKeeper: {
        name: "set-keeper",
        access: "public",
        args: [{ name: "new-keeper", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newKeeper: TypedAbiArg<string, "newKeeper">],
        Response<boolean, bigint>
      >,
      withdrawResidual: {
        name: "withdraw-residual",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      getKeeper: {
        name: "get-keeper",
        access: "read_only",
        args: [],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<[], string | null>,
      getSbtcBalance: {
        name: "get-sbtc-balance",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      ERR_ALREADY_INITIALIZED: {
        name: "ERR_ALREADY_INITIALIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_KEEPER: {
        name: "ERR_NOT_KEEPER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NO_ALLOCATIONS: {
        name: "ERR_NO_ALLOCATIONS",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      keeper: {
        name: "keeper",
        type: {
          optional: "principal",
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_ALREADY_INITIALIZED: {
        isOk: false,
        value: 34_003n,
      },
      ERR_NOT_KEEPER: {
        isOk: false,
        value: 34_001n,
      },
      ERR_NO_ALLOCATIONS: {
        isOk: false,
        value: 34_002n,
      },
      keeper: null,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "signer-payout-v1",
  },
  signerRegistryV1: {
    functions: {
      registerSlot: {
        name: "register-slot",
        access: "public",
        args: [
          { name: "index", type: "uint128" },
          { name: "signer-manager", type: "principal" },
          { name: "staker", type: "principal" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          index: TypedAbiArg<number | bigint, "index">,
          signerManager: TypedAbiArg<string, "signerManager">,
          staker: TypedAbiArg<string, "staker">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        Response<boolean, bigint>
      >,
      getSlot: {
        name: "get-slot",
        access: "read_only",
        args: [{ name: "index", type: "uint128" }],
        outputs: {
          type: {
            optional: {
              tuple: [
                { name: "bond-index", type: { optional: "uint128" } },
                { name: "signer-manager", type: "principal" },
                { name: "staker", type: "principal" },
              ],
            },
          },
        },
      } as TypedAbiFunction<
        [index: TypedAbiArg<number | bigint, "index">],
        {
          bondIndex: bigint | null;
          signerManager: string;
          staker: string;
        } | null
      >,
    },
    maps: {
      slots: {
        name: "slots",
        key: { tuple: [{ name: "index", type: "uint128" }] },
        value: {
          tuple: [
            { name: "bond-index", type: { optional: "uint128" } },
            { name: "signer-manager", type: "principal" },
            { name: "staker", type: "principal" },
          ],
        },
      } as TypedAbiMap<
        {
          index: number | bigint;
        },
        {
          bondIndex: bigint | null;
          signerManager: string;
          staker: string;
        }
      >,
    },
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "signer-registry-v1",
  },
  sip010TraitFtStandard: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "sip-010-trait-ft-standard",
  },
  sip09Trait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "sip-09-trait",
  },
  stackingDaoCoreStbtcV1: {
    functions: {
      deposit: {
        name: "deposit",
        access: "public",
        args: [
          { name: "sbtc-amount", type: "uint128" },
          { name: "min-shares-out", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          sbtcAmount: TypedAbiArg<number | bigint, "sbtcAmount">,
          minSharesOut: TypedAbiArg<number | bigint, "minSharesOut">,
        ],
        Response<bigint, bigint>
      >,
      initWithdraw: {
        name: "init-withdraw",
        access: "public",
        args: [{ name: "stbtc-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stbtcAmount: TypedAbiArg<number | bigint, "stbtcAmount">],
        Response<bigint, bigint>
      >,
      setFeeExempt: {
        name: "set-fee-exempt",
        access: "public",
        args: [
          { name: "who", type: "principal" },
          { name: "exempt", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          who: TypedAbiArg<string, "who">,
          exempt: TypedAbiArg<boolean, "exempt">,
        ],
        Response<boolean, bigint>
      >,
      setShutdownDeposits: {
        name: "set-shutdown-deposits",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownInitWithdraw: {
        name: "set-shutdown-init-withdraw",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownWithdraw: {
        name: "set-shutdown-withdraw",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownWithdrawIdle: {
        name: "set-shutdown-withdraw-idle",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setWithdrawFee: {
        name: "set-withdraw-fee",
        access: "public",
        args: [{ name: "fee", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [fee: TypedAbiArg<number | bigint, "fee">],
        Response<boolean, bigint>
      >,
      setWithdrawIdleFee: {
        name: "set-withdraw-idle-fee",
        access: "public",
        args: [{ name: "fee", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [fee: TypedAbiArg<number | bigint, "fee">],
        Response<boolean, bigint>
      >,
      withdraw: {
        name: "withdraw",
        access: "public",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "sbtc-fee", type: "uint128" },
                  { name: "sbtc-user", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        Response<
          {
            sbtcFee: bigint;
            sbtcUser: bigint;
          },
          bigint
        >
      >,
      withdrawIdle: {
        name: "withdraw-idle",
        access: "public",
        args: [{ name: "stbtc-amount", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "sbtc-fee", type: "uint128" },
                  { name: "sbtc-user", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [stbtcAmount: TypedAbiArg<number | bigint, "stbtcAmount">],
        Response<
          {
            sbtcFee: bigint;
            sbtcUser: bigint;
          },
          bigint
        >
      >,
      getShutdownDeposits: {
        name: "get-shutdown-deposits",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownInitWithdraw: {
        name: "get-shutdown-init-withdraw",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownWithdraw: {
        name: "get-shutdown-withdraw",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownWithdrawIdle: {
        name: "get-shutdown-withdraw-idle",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getWithdrawFee: {
        name: "get-withdraw-fee",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawIdleFee: {
        name: "get-withdraw-idle-fee",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      isFeeExempt: {
        name: "is-fee-exempt",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {
      feeExempt: {
        name: "fee-exempt",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
    },
    variables: {
      DEAD_SHARES: {
        name: "DEAD_SHARES",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      dENOMINATOR_8: {
        name: "DENOMINATOR_8",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      DENOMINATOR_BPS: {
        name: "DENOMINATOR_BPS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_GET_OWNER: {
        name: "ERR_GET_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INSUFFICIENT_IDLE: {
        name: "ERR_INSUFFICIENT_IDLE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_FEE: {
        name: "ERR_INVALID_FEE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_MIN_SHARES: {
        name: "ERR_MIN_SHARES",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SHUTDOWN: {
        name: "ERR_SHUTDOWN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAW_LOCKED: {
        name: "ERR_WITHDRAW_LOCKED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAW_NOT_NFT_OWNER: {
        name: "ERR_WITHDRAW_NOT_NFT_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      shutdownDeposits: {
        name: "shutdown-deposits",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownInitWithdraw: {
        name: "shutdown-init-withdraw",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownWithdraw: {
        name: "shutdown-withdraw",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownWithdrawIdle: {
        name: "shutdown-withdraw-idle",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      withdrawFee: {
        name: "withdraw-fee",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      withdrawIdleFee: {
        name: "withdraw-idle-fee",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      DEAD_SHARES: 1_000n,
      dENOMINATOR_8: 100_000_000n,
      DENOMINATOR_BPS: 10_000n,
      ERR_GET_OWNER: {
        isOk: false,
        value: 25_005n,
      },
      ERR_INSUFFICIENT_IDLE: {
        isOk: false,
        value: 25_006n,
      },
      ERR_INVALID_FEE: {
        isOk: false,
        value: 25_008n,
      },
      ERR_MIN_SHARES: {
        isOk: false,
        value: 25_007n,
      },
      ERR_SHUTDOWN: {
        isOk: false,
        value: 25_001n,
      },
      ERR_WITHDRAW_LOCKED: {
        isOk: false,
        value: 25_002n,
      },
      ERR_WITHDRAW_NOT_NFT_OWNER: {
        isOk: false,
        value: 25_003n,
      },
      shutdownDeposits: false,
      shutdownInitWithdraw: false,
      shutdownWithdraw: false,
      shutdownWithdrawIdle: false,
      withdrawFee: 0n,
      withdrawIdleFee: 100n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stacking-dao-core-stbtc-v1",
  },
  stackingDaoCoreStstxbtcV1: {
    functions: {
      deposit: {
        name: "deposit",
        access: "public",
        args: [
          { name: "stx-amount", type: "uint128" },
          { name: "min-shares-out", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          stxAmount: TypedAbiArg<number | bigint, "stxAmount">,
          minSharesOut: TypedAbiArg<number | bigint, "minSharesOut">,
        ],
        Response<bigint, bigint>
      >,
      initWithdraw: {
        name: "init-withdraw",
        access: "public",
        args: [{ name: "ststxbtc-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">],
        Response<bigint, bigint>
      >,
      setFeeExempt: {
        name: "set-fee-exempt",
        access: "public",
        args: [
          { name: "who", type: "principal" },
          { name: "exempt", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          who: TypedAbiArg<string, "who">,
          exempt: TypedAbiArg<boolean, "exempt">,
        ],
        Response<boolean, bigint>
      >,
      setShutdownDeposits: {
        name: "set-shutdown-deposits",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownInitWithdraw: {
        name: "set-shutdown-init-withdraw",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownWithdraw: {
        name: "set-shutdown-withdraw",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownWithdrawIdle: {
        name: "set-shutdown-withdraw-idle",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setTreasury: {
        name: "set-treasury",
        access: "public",
        args: [{ name: "new-treasury", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newTreasury: TypedAbiArg<string, "newTreasury">],
        Response<boolean, bigint>
      >,
      setWithdrawFee: {
        name: "set-withdraw-fee",
        access: "public",
        args: [{ name: "fee", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [fee: TypedAbiArg<number | bigint, "fee">],
        Response<boolean, bigint>
      >,
      setWithdrawIdleFee: {
        name: "set-withdraw-idle-fee",
        access: "public",
        args: [{ name: "fee", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [fee: TypedAbiArg<number | bigint, "fee">],
        Response<boolean, bigint>
      >,
      withdraw: {
        name: "withdraw",
        access: "public",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "stx-fee", type: "uint128" },
                  { name: "stx-user", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        Response<
          {
            stxFee: bigint;
            stxUser: bigint;
          },
          bigint
        >
      >,
      withdrawIdle: {
        name: "withdraw-idle",
        access: "public",
        args: [{ name: "ststxbtc-amount", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "stx-fee", type: "uint128" },
                  { name: "stx-user", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">],
        Response<
          {
            stxFee: bigint;
            stxUser: bigint;
          },
          bigint
        >
      >,
      getShutdownDeposits: {
        name: "get-shutdown-deposits",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownInitWithdraw: {
        name: "get-shutdown-init-withdraw",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownWithdraw: {
        name: "get-shutdown-withdraw",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownWithdrawIdle: {
        name: "get-shutdown-withdraw-idle",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getTreasury: {
        name: "get-treasury",
        access: "read_only",
        args: [],
        outputs: { type: "principal" },
      } as TypedAbiFunction<[], string>,
      getWithdrawFee: {
        name: "get-withdraw-fee",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawIdleFee: {
        name: "get-withdraw-idle-fee",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      isFeeExempt: {
        name: "is-fee-exempt",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {
      feeExempt: {
        name: "fee-exempt",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
    },
    variables: {
      DENOMINATOR_BPS: {
        name: "DENOMINATOR_BPS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_GET_OWNER: {
        name: "ERR_GET_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INSUFFICIENT_IDLE: {
        name: "ERR_INSUFFICIENT_IDLE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_FEE: {
        name: "ERR_INVALID_FEE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_MIN_SHARES: {
        name: "ERR_MIN_SHARES",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SHUTDOWN: {
        name: "ERR_SHUTDOWN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAW_LOCKED: {
        name: "ERR_WITHDRAW_LOCKED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAW_NOT_NFT_OWNER: {
        name: "ERR_WITHDRAW_NOT_NFT_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      shutdownDeposits: {
        name: "shutdown-deposits",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownInitWithdraw: {
        name: "shutdown-init-withdraw",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownWithdraw: {
        name: "shutdown-withdraw",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownWithdrawIdle: {
        name: "shutdown-withdraw-idle",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      treasury: {
        name: "treasury",
        type: "principal",
        access: "variable",
      } as TypedAbiVariable<string>,
      withdrawFee: {
        name: "withdraw-fee",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      withdrawIdleFee: {
        name: "withdraw-idle-fee",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      DENOMINATOR_BPS: 10_000n,
      ERR_GET_OWNER: {
        isOk: false,
        value: 27_005n,
      },
      ERR_INSUFFICIENT_IDLE: {
        isOk: false,
        value: 27_006n,
      },
      ERR_INVALID_FEE: {
        isOk: false,
        value: 27_008n,
      },
      ERR_MIN_SHARES: {
        isOk: false,
        value: 27_007n,
      },
      ERR_SHUTDOWN: {
        isOk: false,
        value: 27_001n,
      },
      ERR_WITHDRAW_LOCKED: {
        isOk: false,
        value: 27_002n,
      },
      ERR_WITHDRAW_NOT_NFT_OWNER: {
        isOk: false,
        value: 27_003n,
      },
      shutdownDeposits: false,
      shutdownInitWithdraw: false,
      shutdownWithdraw: false,
      shutdownWithdrawIdle: false,
      treasury: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      withdrawFee: 0n,
      withdrawIdleFee: 100n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stacking-dao-core-ststxbtc-v1",
  },
  stackingDaoCoreStstxbtcV2: {
    functions: {
      deposit: {
        name: "deposit",
        access: "public",
        args: [
          { name: "stx-amount", type: "uint128" },
          { name: "min-shares-out", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          stxAmount: TypedAbiArg<number | bigint, "stxAmount">,
          minSharesOut: TypedAbiArg<number | bigint, "minSharesOut">,
        ],
        Response<bigint, bigint>
      >,
      initWithdraw: {
        name: "init-withdraw",
        access: "public",
        args: [{ name: "ststxbtc-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">],
        Response<bigint, bigint>
      >,
      setFeeExempt: {
        name: "set-fee-exempt",
        access: "public",
        args: [
          { name: "who", type: "principal" },
          { name: "exempt", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          who: TypedAbiArg<string, "who">,
          exempt: TypedAbiArg<boolean, "exempt">,
        ],
        Response<boolean, bigint>
      >,
      setShutdownDeposits: {
        name: "set-shutdown-deposits",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownInitWithdraw: {
        name: "set-shutdown-init-withdraw",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownWithdraw: {
        name: "set-shutdown-withdraw",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownWithdrawIdle: {
        name: "set-shutdown-withdraw-idle",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setTreasury: {
        name: "set-treasury",
        access: "public",
        args: [{ name: "new-treasury", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newTreasury: TypedAbiArg<string, "newTreasury">],
        Response<boolean, bigint>
      >,
      setWithdrawFee: {
        name: "set-withdraw-fee",
        access: "public",
        args: [{ name: "fee", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [fee: TypedAbiArg<number | bigint, "fee">],
        Response<boolean, bigint>
      >,
      setWithdrawIdleFee: {
        name: "set-withdraw-idle-fee",
        access: "public",
        args: [{ name: "fee", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [fee: TypedAbiArg<number | bigint, "fee">],
        Response<boolean, bigint>
      >,
      withdraw: {
        name: "withdraw",
        access: "public",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "stx-fee", type: "uint128" },
                  { name: "stx-user", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        Response<
          {
            stxFee: bigint;
            stxUser: bigint;
          },
          bigint
        >
      >,
      withdrawIdle: {
        name: "withdraw-idle",
        access: "public",
        args: [{ name: "ststxbtc-amount", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "stx-fee", type: "uint128" },
                  { name: "stx-user", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">],
        Response<
          {
            stxFee: bigint;
            stxUser: bigint;
          },
          bigint
        >
      >,
      getShutdownDeposits: {
        name: "get-shutdown-deposits",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownInitWithdraw: {
        name: "get-shutdown-init-withdraw",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownWithdraw: {
        name: "get-shutdown-withdraw",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownWithdrawIdle: {
        name: "get-shutdown-withdraw-idle",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getTreasury: {
        name: "get-treasury",
        access: "read_only",
        args: [],
        outputs: { type: "principal" },
      } as TypedAbiFunction<[], string>,
      getWithdrawFee: {
        name: "get-withdraw-fee",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawIdleFee: {
        name: "get-withdraw-idle-fee",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      isFeeExempt: {
        name: "is-fee-exempt",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {
      feeExempt: {
        name: "fee-exempt",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
    },
    variables: {
      DENOMINATOR_BPS: {
        name: "DENOMINATOR_BPS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_GET_OWNER: {
        name: "ERR_GET_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INSUFFICIENT_IDLE: {
        name: "ERR_INSUFFICIENT_IDLE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_FEE: {
        name: "ERR_INVALID_FEE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_MIN_SHARES: {
        name: "ERR_MIN_SHARES",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SHUTDOWN: {
        name: "ERR_SHUTDOWN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAW_LOCKED: {
        name: "ERR_WITHDRAW_LOCKED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAW_NOT_NFT_OWNER: {
        name: "ERR_WITHDRAW_NOT_NFT_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      shutdownDeposits: {
        name: "shutdown-deposits",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownInitWithdraw: {
        name: "shutdown-init-withdraw",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownWithdraw: {
        name: "shutdown-withdraw",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownWithdrawIdle: {
        name: "shutdown-withdraw-idle",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      treasury: {
        name: "treasury",
        type: "principal",
        access: "variable",
      } as TypedAbiVariable<string>,
      withdrawFee: {
        name: "withdraw-fee",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      withdrawIdleFee: {
        name: "withdraw-idle-fee",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      DENOMINATOR_BPS: 10_000n,
      ERR_GET_OWNER: {
        isOk: false,
        value: 27_005n,
      },
      ERR_INSUFFICIENT_IDLE: {
        isOk: false,
        value: 27_006n,
      },
      ERR_INVALID_FEE: {
        isOk: false,
        value: 27_008n,
      },
      ERR_MIN_SHARES: {
        isOk: false,
        value: 27_007n,
      },
      ERR_SHUTDOWN: {
        isOk: false,
        value: 27_001n,
      },
      ERR_WITHDRAW_LOCKED: {
        isOk: false,
        value: 27_002n,
      },
      ERR_WITHDRAW_NOT_NFT_OWNER: {
        isOk: false,
        value: 27_003n,
      },
      shutdownDeposits: false,
      shutdownInitWithdraw: false,
      shutdownWithdraw: false,
      shutdownWithdrawIdle: false,
      treasury: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      withdrawFee: 0n,
      withdrawIdleFee: 100n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stacking-dao-core-ststxbtc-v2",
  },
  stackingDaoCoreStxV1: {
    functions: {
      deposit: {
        name: "deposit",
        access: "public",
        args: [
          { name: "stx-amount", type: "uint128" },
          { name: "min-shares-out", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          stxAmount: TypedAbiArg<number | bigint, "stxAmount">,
          minSharesOut: TypedAbiArg<number | bigint, "minSharesOut">,
        ],
        Response<bigint, bigint>
      >,
      initWithdraw: {
        name: "init-withdraw",
        access: "public",
        args: [{ name: "ststx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">],
        Response<bigint, bigint>
      >,
      setFeeExempt: {
        name: "set-fee-exempt",
        access: "public",
        args: [
          { name: "who", type: "principal" },
          { name: "exempt", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          who: TypedAbiArg<string, "who">,
          exempt: TypedAbiArg<boolean, "exempt">,
        ],
        Response<boolean, bigint>
      >,
      setShutdownDeposits: {
        name: "set-shutdown-deposits",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownInitWithdraw: {
        name: "set-shutdown-init-withdraw",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownWithdraw: {
        name: "set-shutdown-withdraw",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownWithdrawIdle: {
        name: "set-shutdown-withdraw-idle",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setWithdrawFee: {
        name: "set-withdraw-fee",
        access: "public",
        args: [{ name: "fee", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [fee: TypedAbiArg<number | bigint, "fee">],
        Response<boolean, bigint>
      >,
      setWithdrawIdleFee: {
        name: "set-withdraw-idle-fee",
        access: "public",
        args: [{ name: "fee", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [fee: TypedAbiArg<number | bigint, "fee">],
        Response<boolean, bigint>
      >,
      withdraw: {
        name: "withdraw",
        access: "public",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "stx-fee", type: "uint128" },
                  { name: "stx-user", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        Response<
          {
            stxFee: bigint;
            stxUser: bigint;
          },
          bigint
        >
      >,
      withdrawIdle: {
        name: "withdraw-idle",
        access: "public",
        args: [{ name: "ststx-amount", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "stx-fee", type: "uint128" },
                  { name: "stx-user", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">],
        Response<
          {
            stxFee: bigint;
            stxUser: bigint;
          },
          bigint
        >
      >,
      getShutdownDeposits: {
        name: "get-shutdown-deposits",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownInitWithdraw: {
        name: "get-shutdown-init-withdraw",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownWithdraw: {
        name: "get-shutdown-withdraw",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownWithdrawIdle: {
        name: "get-shutdown-withdraw-idle",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getWithdrawFee: {
        name: "get-withdraw-fee",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawIdleFee: {
        name: "get-withdraw-idle-fee",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      isFeeExempt: {
        name: "is-fee-exempt",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {
      feeExempt: {
        name: "fee-exempt",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
    },
    variables: {
      DEAD_SHARES: {
        name: "DEAD_SHARES",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      dENOMINATOR_6: {
        name: "DENOMINATOR_6",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      DENOMINATOR_BPS: {
        name: "DENOMINATOR_BPS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_GET_OWNER: {
        name: "ERR_GET_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INSUFFICIENT_IDLE: {
        name: "ERR_INSUFFICIENT_IDLE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_FEE: {
        name: "ERR_INVALID_FEE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_MIN_SHARES: {
        name: "ERR_MIN_SHARES",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SHUTDOWN: {
        name: "ERR_SHUTDOWN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAW_LOCKED: {
        name: "ERR_WITHDRAW_LOCKED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAW_NOT_NFT_OWNER: {
        name: "ERR_WITHDRAW_NOT_NFT_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      shutdownDeposits: {
        name: "shutdown-deposits",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownInitWithdraw: {
        name: "shutdown-init-withdraw",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownWithdraw: {
        name: "shutdown-withdraw",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownWithdrawIdle: {
        name: "shutdown-withdraw-idle",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      withdrawFee: {
        name: "withdraw-fee",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      withdrawIdleFee: {
        name: "withdraw-idle-fee",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      DEAD_SHARES: 1_000n,
      dENOMINATOR_6: 1_000_000n,
      DENOMINATOR_BPS: 10_000n,
      ERR_GET_OWNER: {
        isOk: false,
        value: 26_005n,
      },
      ERR_INSUFFICIENT_IDLE: {
        isOk: false,
        value: 26_006n,
      },
      ERR_INVALID_FEE: {
        isOk: false,
        value: 26_008n,
      },
      ERR_MIN_SHARES: {
        isOk: false,
        value: 26_007n,
      },
      ERR_SHUTDOWN: {
        isOk: false,
        value: 26_001n,
      },
      ERR_WITHDRAW_LOCKED: {
        isOk: false,
        value: 26_002n,
      },
      ERR_WITHDRAW_NOT_NFT_OWNER: {
        isOk: false,
        value: 26_003n,
      },
      shutdownDeposits: false,
      shutdownInitWithdraw: false,
      shutdownWithdraw: false,
      shutdownWithdrawIdle: false,
      withdrawFee: 0n,
      withdrawIdleFee: 100n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stacking-dao-core-stx-v1",
  },
  stackingDaoCoreStxV2: {
    functions: {
      deposit: {
        name: "deposit",
        access: "public",
        args: [
          { name: "stx-amount", type: "uint128" },
          { name: "min-shares-out", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          stxAmount: TypedAbiArg<number | bigint, "stxAmount">,
          minSharesOut: TypedAbiArg<number | bigint, "minSharesOut">,
        ],
        Response<bigint, bigint>
      >,
      initWithdraw: {
        name: "init-withdraw",
        access: "public",
        args: [{ name: "ststx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">],
        Response<bigint, bigint>
      >,
      setFeeExempt: {
        name: "set-fee-exempt",
        access: "public",
        args: [
          { name: "who", type: "principal" },
          { name: "exempt", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          who: TypedAbiArg<string, "who">,
          exempt: TypedAbiArg<boolean, "exempt">,
        ],
        Response<boolean, bigint>
      >,
      setShutdownDeposits: {
        name: "set-shutdown-deposits",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownInitWithdraw: {
        name: "set-shutdown-init-withdraw",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownWithdraw: {
        name: "set-shutdown-withdraw",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setShutdownWithdrawIdle: {
        name: "set-shutdown-withdraw-idle",
        access: "public",
        args: [{ name: "shutdown", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [shutdown: TypedAbiArg<boolean, "shutdown">],
        Response<boolean, bigint>
      >,
      setWithdrawFee: {
        name: "set-withdraw-fee",
        access: "public",
        args: [{ name: "fee", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [fee: TypedAbiArg<number | bigint, "fee">],
        Response<boolean, bigint>
      >,
      setWithdrawIdleFee: {
        name: "set-withdraw-idle-fee",
        access: "public",
        args: [{ name: "fee", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [fee: TypedAbiArg<number | bigint, "fee">],
        Response<boolean, bigint>
      >,
      withdraw: {
        name: "withdraw",
        access: "public",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "stx-fee", type: "uint128" },
                  { name: "stx-user", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        Response<
          {
            stxFee: bigint;
            stxUser: bigint;
          },
          bigint
        >
      >,
      withdrawIdle: {
        name: "withdraw-idle",
        access: "public",
        args: [{ name: "ststx-amount", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "stx-fee", type: "uint128" },
                  { name: "stx-user", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">],
        Response<
          {
            stxFee: bigint;
            stxUser: bigint;
          },
          bigint
        >
      >,
      getShutdownDeposits: {
        name: "get-shutdown-deposits",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownInitWithdraw: {
        name: "get-shutdown-init-withdraw",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownWithdraw: {
        name: "get-shutdown-withdraw",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getShutdownWithdrawIdle: {
        name: "get-shutdown-withdraw-idle",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getWithdrawFee: {
        name: "get-withdraw-fee",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawIdleFee: {
        name: "get-withdraw-idle-fee",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      isFeeExempt: {
        name: "is-fee-exempt",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {
      feeExempt: {
        name: "fee-exempt",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
    },
    variables: {
      DEAD_SHARES: {
        name: "DEAD_SHARES",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      dENOMINATOR_6: {
        name: "DENOMINATOR_6",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      DENOMINATOR_BPS: {
        name: "DENOMINATOR_BPS",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_GET_OWNER: {
        name: "ERR_GET_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INSUFFICIENT_IDLE: {
        name: "ERR_INSUFFICIENT_IDLE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_FEE: {
        name: "ERR_INVALID_FEE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_MIN_SHARES: {
        name: "ERR_MIN_SHARES",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SHUTDOWN: {
        name: "ERR_SHUTDOWN",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAW_LOCKED: {
        name: "ERR_WITHDRAW_LOCKED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_WITHDRAW_NOT_NFT_OWNER: {
        name: "ERR_WITHDRAW_NOT_NFT_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      shutdownDeposits: {
        name: "shutdown-deposits",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownInitWithdraw: {
        name: "shutdown-init-withdraw",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownWithdraw: {
        name: "shutdown-withdraw",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      shutdownWithdrawIdle: {
        name: "shutdown-withdraw-idle",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      withdrawFee: {
        name: "withdraw-fee",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      withdrawIdleFee: {
        name: "withdraw-idle-fee",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      DEAD_SHARES: 1_000n,
      dENOMINATOR_6: 1_000_000n,
      DENOMINATOR_BPS: 10_000n,
      ERR_GET_OWNER: {
        isOk: false,
        value: 26_005n,
      },
      ERR_INSUFFICIENT_IDLE: {
        isOk: false,
        value: 26_006n,
      },
      ERR_INVALID_FEE: {
        isOk: false,
        value: 26_008n,
      },
      ERR_MIN_SHARES: {
        isOk: false,
        value: 26_007n,
      },
      ERR_SHUTDOWN: {
        isOk: false,
        value: 26_001n,
      },
      ERR_WITHDRAW_LOCKED: {
        isOk: false,
        value: 26_002n,
      },
      ERR_WITHDRAW_NOT_NFT_OWNER: {
        isOk: false,
        value: 26_003n,
      },
      shutdownDeposits: false,
      shutdownInitWithdraw: false,
      shutdownWithdraw: false,
      shutdownWithdrawIdle: false,
      withdrawFee: 0n,
      withdrawIdleFee: 100n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stacking-dao-core-stx-v2",
  },
  stbtcReserve: {
    functions: {
      getSbtc: {
        name: "get-sbtc",
        access: "public",
        args: [
          { name: "requested-sbtc", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestedSbtc: TypedAbiArg<number | bigint, "requestedSbtc">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      lockSbtcForWithdrawal: {
        name: "lock-sbtc-for-withdrawal",
        access: "public",
        args: [{ name: "sbtc-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [sbtcAmount: TypedAbiArg<number | bigint, "sbtcAmount">],
        Response<bigint, bigint>
      >,
      paySbtcFromIdle: {
        name: "pay-sbtc-from-idle",
        access: "public",
        args: [
          { name: "sbtc-amount", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          sbtcAmount: TypedAbiArg<number | bigint, "sbtcAmount">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      requestSbtcForWithdrawal: {
        name: "request-sbtc-for-withdrawal",
        access: "public",
        args: [
          { name: "requested-sbtc", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestedSbtc: TypedAbiArg<number | bigint, "requestedSbtc">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      requestSbtcToStack: {
        name: "request-sbtc-to-stack",
        access: "public",
        args: [{ name: "requested-sbtc", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [requestedSbtc: TypedAbiArg<number | bigint, "requestedSbtc">],
        Response<bigint, bigint>
      >,
      returnSbtcFromStacking: {
        name: "return-sbtc-from-stacking",
        access: "public",
        args: [{ name: "sbtc-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [sbtcAmount: TypedAbiArg<number | bigint, "sbtcAmount">],
        Response<bigint, bigint>
      >,
      unlockSbtcFromWithdrawal: {
        name: "unlock-sbtc-from-withdrawal",
        access: "public",
        args: [{ name: "sbtc-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [sbtcAmount: TypedAbiArg<number | bigint, "sbtcAmount">],
        Response<bigint, bigint>
      >,
      getSbtcAvailable: {
        name: "get-sbtc-available",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getSbtcBalance: {
        name: "get-sbtc-balance",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getSbtcForWithdrawals: {
        name: "get-sbtc-for-withdrawals",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getSbtcStaking: {
        name: "get-sbtc-staking",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getTotalSbtc: {
        name: "get-total-sbtc",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      ERR_RESERVED: {
        name: "ERR_RESERVED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      sbtcForWithdrawals: {
        name: "sbtc-for-withdrawals",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      sbtcStaking: {
        name: "sbtc-staking",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_RESERVED: {
        isOk: false,
        value: 22_001n,
      },
      sbtcForWithdrawals: 0n,
      sbtcStaking: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stbtc-reserve",
  },
  stbtcStakerTemplateV1: {
    functions: {
      bondSbtc: {
        name: "bond-sbtc",
        access: "public",
        args: [
          { name: "bond-index", type: "uint128" },
          { name: "signer-manager", type: "trait_reference" },
          { name: "sats", type: "uint128" },
          { name: "amount-ustx", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          signerManager: TypedAbiArg<string, "signerManager">,
          sats: TypedAbiArg<number | bigint, "sats">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      recallSbtc: {
        name: "recall-sbtc",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "sats", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          sats: TypedAbiArg<number | bigint, "sats">,
        ],
        Response<boolean, bigint>
      >,
      returnStx: {
        name: "return-stx",
        access: "public",
        args: [{ name: "amount-ustx", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [amountUstx: TypedAbiArg<number | bigint, "amountUstx">],
        Response<boolean, bigint>
      >,
      rolloverBond: {
        name: "rollover-bond",
        access: "public",
        args: [
          { name: "new-bond-index", type: "uint128" },
          { name: "signer-manager", type: "trait_reference" },
          { name: "new-sats", type: "uint128" },
          { name: "amount-ustx", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          newBondIndex: TypedAbiArg<number | bigint, "newBondIndex">,
          signerManager: TypedAbiArg<string, "signerManager">,
          newSats: TypedAbiArg<number | bigint, "newSats">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
    },
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stbtc-staker-template-v1",
  },
  stbtcStakerTrait: {
    functions: {},
    maps: {},
    variables: {},
    constants: {},
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stbtc-staker-trait",
  },
  stbtcToken: {
    functions: {
      burn: {
        name: "burn",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<boolean, bigint>
      >,
      burnForProtocol: {
        name: "burn-for-protocol",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
        ],
        Response<boolean, bigint>
      >,
      mintForProtocol: {
        name: "mint-for-protocol",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      setTokenUri: {
        name: "set-token-uri",
        access: "public",
        args: [{ name: "value", type: { "string-utf8": { length: 256 } } }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [value: TypedAbiArg<string, "value">],
        Response<boolean, bigint>
      >,
      transfer: {
        name: "transfer",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
          { name: "recipient", type: "principal" },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<string, "recipient">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
        ],
        Response<boolean, bigint>
      >,
      getBalance: {
        name: "get-balance",
        access: "read_only",
        args: [{ name: "account", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [account: TypedAbiArg<string, "account">],
        Response<bigint, null>
      >,
      getDecimals: {
        name: "get-decimals",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getName: {
        name: "get-name",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 17 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getSymbol: {
        name: "get-symbol",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 5 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getTokenUri: {
        name: "get-token-uri",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: {
              ok: { optional: { "string-utf8": { length: 256 } } },
              error: "none",
            },
          },
        },
      } as TypedAbiFunction<[], Response<string | null, null>>,
      getTotalSupply: {
        name: "get-total-supply",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
    },
    maps: {},
    variables: {
      ERR_NOT_AUTHORIZED: {
        name: "ERR_NOT_AUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      tokenUri: {
        name: "token-uri",
        type: {
          optional: {
            "string-utf8": {
              length: 256,
            },
          },
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_NOT_AUTHORIZED: {
        isOk: false,
        value: 4n,
      },
      tokenUri: null,
    },
    non_fungible_tokens: [],
    fungible_tokens: [{ name: "stbtc" }],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stbtc-token",
  },
  stbtcWithdrawNft: {
    functions: {
      burnForProtocol: {
        name: "burn-for-protocol",
        access: "public",
        args: [{ name: "token-id", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [tokenId: TypedAbiArg<number | bigint, "tokenId">],
        Response<boolean, bigint>
      >,
      mintForProtocol: {
        name: "mint-for-protocol",
        access: "public",
        args: [{ name: "recipient", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [recipient: TypedAbiArg<string, "recipient">],
        Response<bigint, bigint>
      >,
      setTokenUri: {
        name: "set-token-uri",
        access: "public",
        args: [{ name: "value", type: { "string-ascii": { length: 256 } } }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [value: TypedAbiArg<string, "value">],
        Response<boolean, bigint>
      >,
      transfer: {
        name: "transfer",
        access: "public",
        args: [
          { name: "token-id", type: "uint128" },
          { name: "sender", type: "principal" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          tokenId: TypedAbiArg<number | bigint, "tokenId">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      getLastTokenId: {
        name: "get-last-token-id",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getOwner: {
        name: "get-owner",
        access: "read_only",
        args: [{ name: "token-id", type: "uint128" }],
        outputs: {
          type: { response: { ok: { optional: "principal" }, error: "none" } },
        },
      } as TypedAbiFunction<
        [tokenId: TypedAbiArg<number | bigint, "tokenId">],
        Response<string | null, null>
      >,
      getTokenUri: {
        name: "get-token-uri",
        access: "read_only",
        args: [{ name: "token-id", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: { optional: { "string-ascii": { length: 256 } } },
              error: "none",
            },
          },
        },
      } as TypedAbiFunction<
        [tokenId: TypedAbiArg<number | bigint, "tokenId">],
        Response<string | null, null>
      >,
    },
    maps: {},
    variables: {
      ERR_GET_OWNER: {
        name: "ERR_GET_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_AUTHORIZED: {
        name: "ERR_NOT_AUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      lastId: {
        name: "last-id",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      tokenUri: {
        name: "token-uri",
        type: {
          optional: {
            "string-ascii": {
              length: 256,
            },
          },
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_GET_OWNER: {
        isOk: false,
        value: 15_002n,
      },
      ERR_NOT_AUTHORIZED: {
        isOk: false,
        value: 15_001n,
      },
      lastId: 1n,
      tokenUri: null,
    },
    non_fungible_tokens: [{ name: "withdraw-nft", type: "uint128" }],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stbtc-withdraw-nft",
  },
  strategyV6: {
    functions: {
      initialize: {
        name: "initialize",
        access: "public",
        args: [{ name: "the-manager", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [theManager: TypedAbiArg<string, "theManager">],
        Response<boolean, bigint>
      >,
      performBond: {
        name: "perform-bond",
        access: "public",
        args: [
          { name: "staker", type: "trait_reference" },
          { name: "bond-index", type: "uint128" },
          { name: "signer-manager", type: "trait_reference" },
          { name: "sats", type: "uint128" },
          { name: "amount-ustx", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          bondIndex: TypedAbiArg<number | bigint, "bondIndex">,
          signerManager: TypedAbiArg<string, "signerManager">,
          sats: TypedAbiArg<number | bigint, "sats">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      performRecall: {
        name: "perform-recall",
        access: "public",
        args: [
          { name: "staker", type: "trait_reference" },
          { name: "signer-manager", type: "trait_reference" },
          { name: "sats", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          signerManager: TypedAbiArg<string, "signerManager">,
          sats: TypedAbiArg<number | bigint, "sats">,
        ],
        Response<boolean, bigint>
      >,
      performReturnConsensusStx: {
        name: "perform-return-consensus-stx",
        access: "public",
        args: [
          { name: "staker", type: "trait_reference" },
          { name: "ststx-amount", type: "uint128" },
          { name: "ststxbtc-amount", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">,
          ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">,
        ],
        Response<boolean, bigint>
      >,
      performReturnStx: {
        name: "perform-return-stx",
        access: "public",
        args: [
          { name: "staker", type: "trait_reference" },
          { name: "amount-ustx", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
        ],
        Response<boolean, bigint>
      >,
      performRollover: {
        name: "perform-rollover",
        access: "public",
        args: [
          { name: "staker", type: "trait_reference" },
          { name: "new-bond-index", type: "uint128" },
          { name: "signer-manager", type: "trait_reference" },
          { name: "new-sats", type: "uint128" },
          { name: "amount-ustx", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          newBondIndex: TypedAbiArg<number | bigint, "newBondIndex">,
          signerManager: TypedAbiArg<string, "signerManager">,
          newSats: TypedAbiArg<number | bigint, "newSats">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      performStake: {
        name: "perform-stake",
        access: "public",
        args: [
          { name: "staker", type: "trait_reference" },
          { name: "signer-manager", type: "trait_reference" },
          { name: "amount-ustx", type: "uint128" },
          { name: "ststxbtc-amount", type: "uint128" },
          { name: "num-cycles", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          signerManager: TypedAbiArg<string, "signerManager">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">,
          numCycles: TypedAbiArg<number | bigint, "numCycles">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      performStakeUpdate: {
        name: "perform-stake-update",
        access: "public",
        args: [
          { name: "staker", type: "trait_reference" },
          { name: "signer-manager", type: "trait_reference" },
          { name: "old-signer-manager", type: "trait_reference" },
          { name: "cycles-to-extend", type: "uint128" },
          { name: "amount-increase", type: "uint128" },
          { name: "ststxbtc-increase", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          signerManager: TypedAbiArg<string, "signerManager">,
          oldSignerManager: TypedAbiArg<string, "oldSignerManager">,
          cyclesToExtend: TypedAbiArg<number | bigint, "cyclesToExtend">,
          amountIncrease: TypedAbiArg<number | bigint, "amountIncrease">,
          ststxbtcIncrease: TypedAbiArg<number | bigint, "ststxbtcIncrease">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      performUnstake: {
        name: "perform-unstake",
        access: "public",
        args: [
          { name: "staker", type: "trait_reference" },
          { name: "old-signer-manager", type: "trait_reference" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          oldSignerManager: TypedAbiArg<string, "oldSignerManager">,
        ],
        Response<boolean, bigint>
      >,
      setApprovedSignerManager: {
        name: "set-approved-signer-manager",
        access: "public",
        args: [
          { name: "signer-manager", type: "principal" },
          { name: "approved", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          approved: TypedAbiArg<boolean, "approved">,
        ],
        Response<boolean, bigint>
      >,
      setManager: {
        name: "set-manager",
        access: "public",
        args: [{ name: "new-manager", type: "principal" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [newManager: TypedAbiArg<string, "newManager">],
        Response<boolean, bigint>
      >,
      getManager: {
        name: "get-manager",
        access: "read_only",
        args: [],
        outputs: { type: { optional: "principal" } },
      } as TypedAbiFunction<[], string | null>,
      isApprovedSignerManager: {
        name: "is-approved-signer-manager",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {
      approvedSignerManagers: {
        name: "approved-signer-managers",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
    },
    variables: {
      ERR_ALREADY_INITIALIZED: {
        name: "ERR_ALREADY_INITIALIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_MANAGER: {
        name: "ERR_NOT_MANAGER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_SIGNER_MANAGER_NOT_APPROVED: {
        name: "ERR_SIGNER_MANAGER_NOT_APPROVED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      manager: {
        name: "manager",
        type: {
          optional: "principal",
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_ALREADY_INITIALIZED: {
        isOk: false,
        value: 32_002n,
      },
      ERR_NOT_MANAGER: {
        isOk: false,
        value: 32_001n,
      },
      ERR_SIGNER_MANAGER_NOT_APPROVED: {
        isOk: false,
        value: 32_003n,
      },
      manager: null,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "strategy-v6",
  },
  ststxToken: {
    functions: {
      burn: {
        name: "burn",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<boolean, bigint>
      >,
      burnForProtocol: {
        name: "burn-for-protocol",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
        ],
        Response<boolean, bigint>
      >,
      mintForProtocol: {
        name: "mint-for-protocol",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      setTokenUri: {
        name: "set-token-uri",
        access: "public",
        args: [{ name: "value", type: { "string-utf8": { length: 256 } } }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [value: TypedAbiArg<string, "value">],
        Response<boolean, bigint>
      >,
      transfer: {
        name: "transfer",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
          { name: "recipient", type: "principal" },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<string, "recipient">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
        ],
        Response<boolean, bigint>
      >,
      getBalance: {
        name: "get-balance",
        access: "read_only",
        args: [{ name: "account", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [account: TypedAbiArg<string, "account">],
        Response<bigint, null>
      >,
      getDecimals: {
        name: "get-decimals",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getName: {
        name: "get-name",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 17 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getSymbol: {
        name: "get-symbol",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 5 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getTokenUri: {
        name: "get-token-uri",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: {
              ok: { optional: { "string-utf8": { length: 256 } } },
              error: "none",
            },
          },
        },
      } as TypedAbiFunction<[], Response<string | null, null>>,
      getTotalSupply: {
        name: "get-total-supply",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
    },
    maps: {},
    variables: {
      ERR_NOT_AUTHORIZED: {
        name: "ERR_NOT_AUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      tokenUri: {
        name: "token-uri",
        type: {
          optional: {
            "string-utf8": {
              length: 256,
            },
          },
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_NOT_AUTHORIZED: {
        isOk: false,
        value: 4n,
      },
      tokenUri: null,
    },
    non_fungible_tokens: [],
    fungible_tokens: [{ name: "ststx" }],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "ststx-token",
  },
  ststxWithdrawNftV3: {
    functions: {
      burnForProtocol: {
        name: "burn-for-protocol",
        access: "public",
        args: [{ name: "token-id", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [tokenId: TypedAbiArg<number | bigint, "tokenId">],
        Response<boolean, bigint>
      >,
      mintForProtocol: {
        name: "mint-for-protocol",
        access: "public",
        args: [{ name: "recipient", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [recipient: TypedAbiArg<string, "recipient">],
        Response<bigint, bigint>
      >,
      setTokenUri: {
        name: "set-token-uri",
        access: "public",
        args: [{ name: "value", type: { "string-ascii": { length: 256 } } }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [value: TypedAbiArg<string, "value">],
        Response<boolean, bigint>
      >,
      transfer: {
        name: "transfer",
        access: "public",
        args: [
          { name: "token-id", type: "uint128" },
          { name: "sender", type: "principal" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          tokenId: TypedAbiArg<number | bigint, "tokenId">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      getLastTokenId: {
        name: "get-last-token-id",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getOwner: {
        name: "get-owner",
        access: "read_only",
        args: [{ name: "token-id", type: "uint128" }],
        outputs: {
          type: { response: { ok: { optional: "principal" }, error: "none" } },
        },
      } as TypedAbiFunction<
        [tokenId: TypedAbiArg<number | bigint, "tokenId">],
        Response<string | null, null>
      >,
      getTokenUri: {
        name: "get-token-uri",
        access: "read_only",
        args: [{ name: "token-id", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: { optional: { "string-ascii": { length: 256 } } },
              error: "none",
            },
          },
        },
      } as TypedAbiFunction<
        [tokenId: TypedAbiArg<number | bigint, "tokenId">],
        Response<string | null, null>
      >,
    },
    maps: {},
    variables: {
      ERR_GET_OWNER: {
        name: "ERR_GET_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_AUTHORIZED: {
        name: "ERR_NOT_AUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      lastId: {
        name: "last-id",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      tokenUri: {
        name: "token-uri",
        type: {
          optional: {
            "string-ascii": {
              length: 256,
            },
          },
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_GET_OWNER: {
        isOk: false,
        value: 15_002n,
      },
      ERR_NOT_AUTHORIZED: {
        isOk: false,
        value: 15_001n,
      },
      lastId: 1n,
      tokenUri: null,
    },
    non_fungible_tokens: [{ name: "withdraw-nft", type: "uint128" }],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "ststx-withdraw-nft-v3",
  },
  ststxbtcDataV1: {
    functions: {
      deleteWithdrawalsByNft: {
        name: "delete-withdrawals-by-nft",
        access: "public",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        Response<boolean, bigint>
      >,
      setWithdrawCooldownBlocks: {
        name: "set-withdraw-cooldown-blocks",
        access: "public",
        args: [{ name: "blocks", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [blocks: TypedAbiArg<number | bigint, "blocks">],
        Response<boolean, bigint>
      >,
      setWithdrawalsByNft: {
        name: "set-withdrawals-by-nft",
        access: "public",
        args: [
          { name: "nft-id", type: "uint128" },
          { name: "asset-amount", type: "uint128" },
          { name: "token-amount", type: "uint128" },
          { name: "unlock-burn-height", type: "uint128" },
          { name: "withdraw-fee", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          nftId: TypedAbiArg<number | bigint, "nftId">,
          assetAmount: TypedAbiArg<number | bigint, "assetAmount">,
          tokenAmount: TypedAbiArg<number | bigint, "tokenAmount">,
          unlockBurnHeight: TypedAbiArg<number | bigint, "unlockBurnHeight">,
          withdrawFee: TypedAbiArg<number | bigint, "withdrawFee">,
        ],
        Response<boolean, bigint>
      >,
      getWithdrawCooldownBlocks: {
        name: "get-withdraw-cooldown-blocks",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawUnlockBurnHeight: {
        name: "get-withdraw-unlock-burn-height",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawalsByNft: {
        name: "get-withdrawals-by-nft",
        access: "read_only",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: {
          type: {
            tuple: [
              { name: "asset-amount", type: "uint128" },
              { name: "token-amount", type: "uint128" },
              { name: "unlock-burn-height", type: "uint128" },
              { name: "withdraw-fee", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        {
          assetAmount: bigint;
          tokenAmount: bigint;
          unlockBurnHeight: bigint;
          withdrawFee: bigint;
        }
      >,
    },
    maps: {
      withdrawalsByNft: {
        name: "withdrawals-by-nft",
        key: "uint128",
        value: {
          tuple: [
            { name: "asset-amount", type: "uint128" },
            { name: "token-amount", type: "uint128" },
            { name: "unlock-burn-height", type: "uint128" },
            { name: "withdraw-fee", type: "uint128" },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          assetAmount: bigint;
          tokenAmount: bigint;
          unlockBurnHeight: bigint;
          withdrawFee: bigint;
        }
      >,
    },
    variables: {
      ERR_COOLDOWN_TOO_SHORT: {
        name: "ERR_COOLDOWN_TOO_SHORT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      withdrawCooldownBlocks: {
        name: "withdraw-cooldown-blocks",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_COOLDOWN_TOO_SHORT: {
        isOk: false,
        value: 24_001n,
      },
      withdrawCooldownBlocks: 10n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "ststxbtc-data-v1",
  },
  ststxbtcToken: {
    functions: {
      burnForProtocol: {
        name: "burn-for-protocol",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
        ],
        Response<boolean, bigint>
      >,
      mintForProtocol: {
        name: "mint-for-protocol",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      setTokenUri: {
        name: "set-token-uri",
        access: "public",
        args: [{ name: "value", type: { "string-utf8": { length: 256 } } }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [value: TypedAbiArg<string, "value">],
        Response<boolean, bigint>
      >,
      transfer: {
        name: "transfer",
        access: "public",
        args: [
          { name: "amount", type: "uint128" },
          { name: "sender", type: "principal" },
          { name: "recipient", type: "principal" },
          { name: "memo", type: { optional: { buffer: { length: 34 } } } },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          amount: TypedAbiArg<number | bigint, "amount">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<string, "recipient">,
          memo: TypedAbiArg<Uint8Array | null, "memo">,
        ],
        Response<boolean, bigint>
      >,
      getBalance: {
        name: "get-balance",
        access: "read_only",
        args: [{ name: "account", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<
        [account: TypedAbiArg<string, "account">],
        Response<bigint, null>
      >,
      getDecimals: {
        name: "get-decimals",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getName: {
        name: "get-name",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 21 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getSymbol: {
        name: "get-symbol",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: { ok: { "string-ascii": { length: 8 } }, error: "none" },
          },
        },
      } as TypedAbiFunction<[], Response<string, null>>,
      getTokenUri: {
        name: "get-token-uri",
        access: "read_only",
        args: [],
        outputs: {
          type: {
            response: {
              ok: { optional: { "string-utf8": { length: 256 } } },
              error: "none",
            },
          },
        },
      } as TypedAbiFunction<[], Response<string | null, null>>,
      getTotalSupply: {
        name: "get-total-supply",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
    },
    maps: {},
    variables: {
      ERR_NOT_AUTHORIZED: {
        name: "ERR_NOT_AUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      tokenUri: {
        name: "token-uri",
        type: {
          optional: {
            "string-utf8": {
              length: 256,
            },
          },
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_NOT_AUTHORIZED: {
        isOk: false,
        value: 4n,
      },
      tokenUri: null,
    },
    non_fungible_tokens: [],
    fungible_tokens: [{ name: "ststxbtc" }],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "ststxbtc-token",
  },
  ststxbtcTrackingV1: {
    functions: {
      addRewards: {
        name: "add-rewards",
        access: "public",
        args: [{ name: "amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [amount: TypedAbiArg<number | bigint, "amount">],
        Response<bigint, bigint>
      >,
      claimPendingRewards: {
        name: "claim-pending-rewards",
        access: "public",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<[], Response<bigint, bigint>>,
      refreshWallet: {
        name: "refresh-wallet",
        access: "public",
        args: [
          { name: "holder", type: "principal" },
          { name: "new-balance", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          holder: TypedAbiArg<string, "holder">,
          newBalance: TypedAbiArg<number | bigint, "newBalance">,
        ],
        Response<bigint, bigint>
      >,
      setClaimsEnabled: {
        name: "set-claims-enabled",
        access: "public",
        args: [{ name: "enabled", type: "bool" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [enabled: TypedAbiArg<boolean, "enabled">],
        Response<boolean, bigint>
      >,
      setExcluded: {
        name: "set-excluded",
        access: "public",
        args: [
          { name: "who", type: "principal" },
          { name: "is-ex", type: "bool" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [who: TypedAbiArg<string, "who">, isEx: TypedAbiArg<boolean, "isEx">],
        Response<boolean, bigint>
      >,
      getClaimsEnabled: {
        name: "get-claims-enabled",
        access: "read_only",
        args: [],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[], boolean>,
      getCummRewardPerToken: {
        name: "get-cumm-reward-per-token",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getHolderInfo: {
        name: "get-holder-info",
        access: "read_only",
        args: [{ name: "holder", type: "principal" }],
        outputs: {
          type: {
            tuple: [
              { name: "amount", type: "uint128" },
              { name: "cumm-reward-snapshot", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [holder: TypedAbiArg<string, "holder">],
        {
          amount: bigint;
          cummRewardSnapshot: bigint;
        }
      >,
      getPendingRewards: {
        name: "get-pending-rewards",
        access: "read_only",
        args: [{ name: "holder", type: "principal" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[holder: TypedAbiArg<string, "holder">], bigint>,
      getSavedRewards: {
        name: "get-saved-rewards",
        access: "read_only",
        args: [{ name: "holder", type: "principal" }],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[holder: TypedAbiArg<string, "holder">], bigint>,
      getTotalSupply: {
        name: "get-total-supply",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      isExcluded: {
        name: "is-excluded",
        access: "read_only",
        args: [{ name: "who", type: "principal" }],
        outputs: { type: "bool" },
      } as TypedAbiFunction<[who: TypedAbiArg<string, "who">], boolean>,
    },
    maps: {
      excluded: {
        name: "excluded",
        key: "principal",
        value: "bool",
      } as TypedAbiMap<string, boolean>,
      holderInfo: {
        name: "holder-info",
        key: "principal",
        value: {
          tuple: [
            { name: "amount", type: "uint128" },
            { name: "cumm-reward-snapshot", type: "uint128" },
          ],
        },
      } as TypedAbiMap<
        string,
        {
          amount: bigint;
          cummRewardSnapshot: bigint;
        }
      >,
      savedRewards: {
        name: "saved-rewards",
        key: "principal",
        value: "uint128",
      } as TypedAbiMap<string, bigint>,
    },
    variables: {
      ERR_ALREADY_EXCLUDED: {
        name: "ERR_ALREADY_EXCLUDED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_CLAIMS_DISABLED: {
        name: "ERR_CLAIMS_DISABLED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_HAS_BALANCE: {
        name: "ERR_HAS_BALANCE",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_REWARDS_CALC: {
        name: "ERR_REWARDS_CALC",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      REWARD_SCALE: {
        name: "REWARD_SCALE",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      claimsEnabled: {
        name: "claims-enabled",
        type: "bool",
        access: "variable",
      } as TypedAbiVariable<boolean>,
      cummRewardPerToken: {
        name: "cumm-reward-per-token",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      totalSupply: {
        name: "total-supply",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_ALREADY_EXCLUDED: {
        isOk: false,
        value: 39_003n,
      },
      ERR_CLAIMS_DISABLED: {
        isOk: false,
        value: 39_001n,
      },
      ERR_HAS_BALANCE: {
        isOk: false,
        value: 39_004n,
      },
      ERR_REWARDS_CALC: {
        isOk: false,
        value: 39_002n,
      },
      REWARD_SCALE: 10_000_000_000n,
      claimsEnabled: true,
      cummRewardPerToken: 0n,
      totalSupply: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "ststxbtc-tracking-v1",
  },
  ststxbtcWithdrawNftV2: {
    functions: {
      burnForProtocol: {
        name: "burn-for-protocol",
        access: "public",
        args: [{ name: "token-id", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [tokenId: TypedAbiArg<number | bigint, "tokenId">],
        Response<boolean, bigint>
      >,
      mintForProtocol: {
        name: "mint-for-protocol",
        access: "public",
        args: [{ name: "recipient", type: "principal" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [recipient: TypedAbiArg<string, "recipient">],
        Response<bigint, bigint>
      >,
      setTokenUri: {
        name: "set-token-uri",
        access: "public",
        args: [{ name: "value", type: { "string-ascii": { length: 256 } } }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [value: TypedAbiArg<string, "value">],
        Response<boolean, bigint>
      >,
      transfer: {
        name: "transfer",
        access: "public",
        args: [
          { name: "token-id", type: "uint128" },
          { name: "sender", type: "principal" },
          { name: "recipient", type: "principal" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          tokenId: TypedAbiArg<number | bigint, "tokenId">,
          sender: TypedAbiArg<string, "sender">,
          recipient: TypedAbiArg<string, "recipient">,
        ],
        Response<boolean, bigint>
      >,
      getLastTokenId: {
        name: "get-last-token-id",
        access: "read_only",
        args: [],
        outputs: { type: { response: { ok: "uint128", error: "none" } } },
      } as TypedAbiFunction<[], Response<bigint, null>>,
      getOwner: {
        name: "get-owner",
        access: "read_only",
        args: [{ name: "token-id", type: "uint128" }],
        outputs: {
          type: { response: { ok: { optional: "principal" }, error: "none" } },
        },
      } as TypedAbiFunction<
        [tokenId: TypedAbiArg<number | bigint, "tokenId">],
        Response<string | null, null>
      >,
      getTokenUri: {
        name: "get-token-uri",
        access: "read_only",
        args: [{ name: "token-id", type: "uint128" }],
        outputs: {
          type: {
            response: {
              ok: { optional: { "string-ascii": { length: 256 } } },
              error: "none",
            },
          },
        },
      } as TypedAbiFunction<
        [tokenId: TypedAbiArg<number | bigint, "tokenId">],
        Response<string | null, null>
      >,
    },
    maps: {},
    variables: {
      ERR_GET_OWNER: {
        name: "ERR_GET_OWNER",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_NOT_AUTHORIZED: {
        name: "ERR_NOT_AUTHORIZED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      lastId: {
        name: "last-id",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      tokenUri: {
        name: "token-uri",
        type: {
          optional: {
            "string-ascii": {
              length: 256,
            },
          },
        },
        access: "variable",
      } as TypedAbiVariable<string | null>,
    },
    constants: {
      ERR_GET_OWNER: {
        isOk: false,
        value: 15_002n,
      },
      ERR_NOT_AUTHORIZED: {
        isOk: false,
        value: 15_001n,
      },
      lastId: 1n,
      tokenUri: null,
    },
    non_fungible_tokens: [{ name: "withdraw-nft", type: "uint128" }],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "ststxbtc-withdraw-nft-v2",
  },
  stxReserve: {
    functions: {
      getStx: {
        name: "get-stx",
        access: "public",
        args: [
          { name: "requested-stx", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestedStx: TypedAbiArg<number | bigint, "requestedStx">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      lockStxForStstxbtc: {
        name: "lock-stx-for-ststxbtc",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      lockStxForWithdrawal: {
        name: "lock-stx-for-withdrawal",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      lockStxForWithdrawalStstxbtc: {
        name: "lock-stx-for-withdrawal-ststxbtc",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      payStxFromIdle: {
        name: "pay-stx-from-idle",
        access: "public",
        args: [
          { name: "stx-amount", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          stxAmount: TypedAbiArg<number | bigint, "stxAmount">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      payStxFromIdleStstxbtc: {
        name: "pay-stx-from-idle-ststxbtc",
        access: "public",
        args: [
          { name: "stx-amount", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          stxAmount: TypedAbiArg<number | bigint, "stxAmount">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      requestStxForStaking: {
        name: "request-stx-for-staking",
        access: "public",
        args: [
          { name: "ststx-amount", type: "uint128" },
          { name: "ststxbtc-amount", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">,
          ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">,
        ],
        Response<bigint, bigint>
      >,
      requestStxForWithdrawal: {
        name: "request-stx-for-withdrawal",
        access: "public",
        args: [
          { name: "requested-stx", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestedStx: TypedAbiArg<number | bigint, "requestedStx">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      requestStxForWithdrawalStstxbtc: {
        name: "request-stx-for-withdrawal-ststxbtc",
        access: "public",
        args: [
          { name: "requested-stx", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestedStx: TypedAbiArg<number | bigint, "requestedStx">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      requestStxToStack: {
        name: "request-stx-to-stack",
        access: "public",
        args: [{ name: "requested-stx", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [requestedStx: TypedAbiArg<number | bigint, "requestedStx">],
        Response<bigint, bigint>
      >,
      returnStxFromStacking: {
        name: "return-stx-from-stacking",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      returnStxFromStakingSplit: {
        name: "return-stx-from-staking-split",
        access: "public",
        args: [
          { name: "ststx-amount", type: "uint128" },
          { name: "ststxbtc-amount", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">,
          ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">,
        ],
        Response<bigint, bigint>
      >,
      unlockStxForStstxbtc: {
        name: "unlock-stx-for-ststxbtc",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      unlockStxFromWithdrawal: {
        name: "unlock-stx-from-withdrawal",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      getStxAvailable: {
        name: "get-stx-available",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxBalance: {
        name: "get-stx-balance",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxForStstxbtc: {
        name: "get-stx-for-ststxbtc",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxForStstxbtcIdle: {
        name: "get-stx-for-ststxbtc-idle",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxForWithdrawals: {
        name: "get-stx-for-withdrawals",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxForWithdrawalsStstxbtc: {
        name: "get-stx-for-withdrawals-ststxbtc",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxStaking: {
        name: "get-stx-staking",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getTotalStx: {
        name: "get-total-stx",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      ERR_RESERVED: {
        name: "ERR_RESERVED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      stxForStstxbtc: {
        name: "stx-for-ststxbtc",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      stxForStstxbtcIdle: {
        name: "stx-for-ststxbtc-idle",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      stxForWithdrawalsStstx: {
        name: "stx-for-withdrawals-ststx",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      stxForWithdrawalsStstxbtc: {
        name: "stx-for-withdrawals-ststxbtc",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      stxStaking: {
        name: "stx-staking",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_RESERVED: {
        isOk: false,
        value: 23_001n,
      },
      stxForStstxbtc: 0n,
      stxForStstxbtcIdle: 0n,
      stxForWithdrawalsStstx: 0n,
      stxForWithdrawalsStstxbtc: 0n,
      stxStaking: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stx-reserve",
  },
  stxReserveV2: {
    functions: {
      getStx: {
        name: "get-stx",
        access: "public",
        args: [
          { name: "requested-stx", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestedStx: TypedAbiArg<number | bigint, "requestedStx">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      lockStxForStstxbtc: {
        name: "lock-stx-for-ststxbtc",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      lockStxForWithdrawal: {
        name: "lock-stx-for-withdrawal",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      lockStxForWithdrawalStstxbtc: {
        name: "lock-stx-for-withdrawal-ststxbtc",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      payStxFromIdle: {
        name: "pay-stx-from-idle",
        access: "public",
        args: [
          { name: "stx-amount", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          stxAmount: TypedAbiArg<number | bigint, "stxAmount">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      payStxFromIdleStstxbtc: {
        name: "pay-stx-from-idle-ststxbtc",
        access: "public",
        args: [
          { name: "stx-amount", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          stxAmount: TypedAbiArg<number | bigint, "stxAmount">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      requestStxForStaking: {
        name: "request-stx-for-staking",
        access: "public",
        args: [
          { name: "ststx-amount", type: "uint128" },
          { name: "ststxbtc-amount", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">,
          ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">,
        ],
        Response<bigint, bigint>
      >,
      requestStxForWithdrawal: {
        name: "request-stx-for-withdrawal",
        access: "public",
        args: [
          { name: "requested-stx", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestedStx: TypedAbiArg<number | bigint, "requestedStx">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      requestStxForWithdrawalStstxbtc: {
        name: "request-stx-for-withdrawal-ststxbtc",
        access: "public",
        args: [
          { name: "requested-stx", type: "uint128" },
          { name: "receiver", type: "principal" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          requestedStx: TypedAbiArg<number | bigint, "requestedStx">,
          receiver: TypedAbiArg<string, "receiver">,
        ],
        Response<bigint, bigint>
      >,
      requestStxToStack: {
        name: "request-stx-to-stack",
        access: "public",
        args: [{ name: "requested-stx", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [requestedStx: TypedAbiArg<number | bigint, "requestedStx">],
        Response<bigint, bigint>
      >,
      returnStxFromStacking: {
        name: "return-stx-from-stacking",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      returnStxFromStakingSplit: {
        name: "return-stx-from-staking-split",
        access: "public",
        args: [
          { name: "ststx-amount", type: "uint128" },
          { name: "ststxbtc-amount", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">,
          ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">,
        ],
        Response<bigint, bigint>
      >,
      setStstxbtcEscrow: {
        name: "set-ststxbtc-escrow",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      unlockStxForStstxbtc: {
        name: "unlock-stx-for-ststxbtc",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      unlockStxFromWithdrawal: {
        name: "unlock-stx-from-withdrawal",
        access: "public",
        args: [{ name: "stx-amount", type: "uint128" }],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [stxAmount: TypedAbiArg<number | bigint, "stxAmount">],
        Response<bigint, bigint>
      >,
      getStxAvailable: {
        name: "get-stx-available",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxBalance: {
        name: "get-stx-balance",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxForStstxbtc: {
        name: "get-stx-for-ststxbtc",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxForStstxbtcEscrow: {
        name: "get-stx-for-ststxbtc-escrow",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxForStstxbtcIdle: {
        name: "get-stx-for-ststxbtc-idle",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxForWithdrawals: {
        name: "get-stx-for-withdrawals",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxForWithdrawalsStstxbtc: {
        name: "get-stx-for-withdrawals-ststxbtc",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getStxStaking: {
        name: "get-stx-staking",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getTotalStx: {
        name: "get-total-stx",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
    },
    maps: {},
    variables: {
      ERR_RESERVED: {
        name: "ERR_RESERVED",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      stxForStstxbtcEscrow: {
        name: "stx-for-ststxbtc-escrow",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      stxForStstxbtcIdle: {
        name: "stx-for-ststxbtc-idle",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      stxForWithdrawalsStstx: {
        name: "stx-for-withdrawals-ststx",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      stxForWithdrawalsStstxbtc: {
        name: "stx-for-withdrawals-ststxbtc",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
      stxStaking: {
        name: "stx-staking",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_RESERVED: {
        isOk: false,
        value: 23_001n,
      },
      stxForStstxbtcEscrow: 0n,
      stxForStstxbtcIdle: 0n,
      stxForWithdrawalsStstx: 0n,
      stxForWithdrawalsStstxbtc: 0n,
      stxStaking: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stx-reserve-v2",
  },
  stxStakerTemplateV1: {
    functions: {
      returnStx: {
        name: "return-stx",
        access: "public",
        args: [
          { name: "ststx-amount", type: "uint128" },
          { name: "ststxbtc-amount", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">,
          ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">,
        ],
        Response<boolean, bigint>
      >,
      stakeStx: {
        name: "stake-stx",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "amount-ustx", type: "uint128" },
          { name: "ststxbtc-amount", type: "uint128" },
          { name: "num-cycles", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">,
          numCycles: TypedAbiArg<number | bigint, "numCycles">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      stakeUpdateStx: {
        name: "stake-update-stx",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "old-signer-manager", type: "trait_reference" },
          { name: "cycles-to-extend", type: "uint128" },
          { name: "amount-increase", type: "uint128" },
          { name: "ststxbtc-increase", type: "uint128" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          oldSignerManager: TypedAbiArg<string, "oldSignerManager">,
          cyclesToExtend: TypedAbiArg<number | bigint, "cyclesToExtend">,
          amountIncrease: TypedAbiArg<number | bigint, "amountIncrease">,
          ststxbtcIncrease: TypedAbiArg<number | bigint, "ststxbtcIncrease">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, bigint>
      >,
      unstakeStx: {
        name: "unstake-stx",
        access: "public",
        args: [{ name: "old-signer-manager", type: "trait_reference" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [oldSignerManager: TypedAbiArg<string, "oldSignerManager">],
        Response<boolean, bigint>
      >,
    },
    maps: {},
    variables: {
      stakedAmount: {
        name: "staked-amount",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      stakedAmount: 0n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "stx-staker-template-v1",
  },
  swapStstxStstxbtcV3: {
    functions: {
      swapStstxForStstxbtc: {
        name: "swap-ststx-for-ststxbtc",
        access: "public",
        args: [
          { name: "ststx-amount", type: "uint128" },
          { name: "min-out", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">,
          minOut: TypedAbiArg<number | bigint, "minOut">,
        ],
        Response<bigint, bigint>
      >,
      swapStstxbtcForStstx: {
        name: "swap-ststxbtc-for-ststx",
        access: "public",
        args: [
          { name: "ststxbtc-amount", type: "uint128" },
          { name: "min-out", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">,
          minOut: TypedAbiArg<number | bigint, "minOut">,
        ],
        Response<bigint, bigint>
      >,
    },
    maps: {},
    variables: {
      dENOMINATOR_6: {
        name: "DENOMINATOR_6",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_FEE_NOT_EXEMPT: {
        name: "ERR_FEE_NOT_EXEMPT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_AMOUNT: {
        name: "ERR_INVALID_AMOUNT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_RATIO: {
        name: "ERR_INVALID_RATIO",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
    },
    constants: {
      dENOMINATOR_6: 1_000_000n,
      ERR_FEE_NOT_EXEMPT: {
        isOk: false,
        value: 28_002n,
      },
      ERR_INVALID_AMOUNT: {
        isOk: false,
        value: 28_001n,
      },
      ERR_INVALID_RATIO: {
        isOk: false,
        value: 28_003n,
      },
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "swap-ststx-ststxbtc-v3",
  },
  swapStstxStstxbtcV4: {
    functions: {
      swapStstxForStstxbtc: {
        name: "swap-ststx-for-ststxbtc",
        access: "public",
        args: [
          { name: "ststx-amount", type: "uint128" },
          { name: "min-out", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          ststxAmount: TypedAbiArg<number | bigint, "ststxAmount">,
          minOut: TypedAbiArg<number | bigint, "minOut">,
        ],
        Response<bigint, bigint>
      >,
      swapStstxbtcForStstx: {
        name: "swap-ststxbtc-for-ststx",
        access: "public",
        args: [
          { name: "ststxbtc-amount", type: "uint128" },
          { name: "min-out", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          ststxbtcAmount: TypedAbiArg<number | bigint, "ststxbtcAmount">,
          minOut: TypedAbiArg<number | bigint, "minOut">,
        ],
        Response<bigint, bigint>
      >,
    },
    maps: {},
    variables: {
      dENOMINATOR_6: {
        name: "DENOMINATOR_6",
        type: "uint128",
        access: "constant",
      } as TypedAbiVariable<bigint>,
      ERR_INVALID_AMOUNT: {
        name: "ERR_INVALID_AMOUNT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_INVALID_RATIO: {
        name: "ERR_INVALID_RATIO",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      ERR_MIN_SHARES: {
        name: "ERR_MIN_SHARES",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
    },
    constants: {
      dENOMINATOR_6: 1_000_000n,
      ERR_INVALID_AMOUNT: {
        isOk: false,
        value: 28_001n,
      },
      ERR_INVALID_RATIO: {
        isOk: false,
        value: 28_003n,
      },
      ERR_MIN_SHARES: {
        isOk: false,
        value: 28_004n,
      },
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "swap-ststx-ststxbtc-v4",
  },
  testPox5Signer: {
    functions: {
      claimRewards: {
        name: "claim-rewards",
        access: "public",
        args: [
          {
            name: "bond-periods",
            type: { list: { type: "uint128", length: 6 } },
          },
          { name: "reward-cycle", type: "uint128" },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  {
                    name: "bond-rewards",
                    type: {
                      list: {
                        type: {
                          tuple: [
                            { name: "bond-index", type: "uint128" },
                            { name: "earned", type: "uint128" },
                            { name: "rewards-per-token", type: "uint128" },
                          ],
                        },
                        length: 6,
                      },
                    },
                  },
                  { name: "bond-totals", type: "uint128" },
                  {
                    name: "stx-rewards",
                    type: {
                      tuple: [
                        { name: "earned", type: "uint128" },
                        { name: "rewards-per-token", type: "uint128" },
                      ],
                    },
                  },
                  { name: "total-rewards", type: "uint128" },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          bondPeriods: TypedAbiArg<number | bigint[], "bondPeriods">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
        ],
        Response<
          {
            bondRewards: {
              bondIndex: bigint;
              earned: bigint;
              rewardsPerToken: bigint;
            }[];
            bondTotals: bigint;
            stxRewards: {
              earned: bigint;
              rewardsPerToken: bigint;
            };
            totalRewards: bigint;
          },
          bigint
        >
      >,
      claimStakerRewards: {
        name: "claim-staker-rewards",
        access: "public",
        args: [
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: { response: { ok: "uint128", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        Response<bigint, bigint>
      >,
      registerSelf: {
        name: "register-self",
        access: "public",
        args: [
          { name: "signer-manager", type: "trait_reference" },
          { name: "signer-key", type: { buffer: { length: 33 } } },
          { name: "auth-id", type: "uint128" },
          { name: "signer-sig", type: { buffer: { length: 65 } } },
        ],
        outputs: {
          type: {
            response: {
              ok: {
                tuple: [
                  { name: "signer", type: "principal" },
                  { name: "signer-key", type: { buffer: { length: 33 } } },
                ],
              },
              error: "uint128",
            },
          },
        },
      } as TypedAbiFunction<
        [
          signerManager: TypedAbiArg<string, "signerManager">,
          signerKey: TypedAbiArg<Uint8Array, "signerKey">,
          authId: TypedAbiArg<number | bigint, "authId">,
          signerSig: TypedAbiArg<Uint8Array, "signerSig">,
        ],
        Response<
          {
            signer: string;
            signerKey: Uint8Array;
          },
          bigint
        >
      >,
      validateStake_x: {
        name: "validate-stake!",
        access: "public",
        args: [
          { name: "staker", type: "principal" },
          { name: "first-index", type: "uint128" },
          { name: "num-indexes", type: "uint128" },
          { name: "amount-ustx", type: "uint128" },
          { name: "amount-sats", type: "uint128" },
          { name: "is-bond", type: "bool" },
          {
            name: "signer-calldata",
            type: { optional: { buffer: { length: 500 } } },
          },
        ],
        outputs: { type: { response: { ok: "bool", error: "none" } } },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          firstIndex: TypedAbiArg<number | bigint, "firstIndex">,
          numIndexes: TypedAbiArg<number | bigint, "numIndexes">,
          amountUstx: TypedAbiArg<number | bigint, "amountUstx">,
          amountSats: TypedAbiArg<number | bigint, "amountSats">,
          isBond: TypedAbiArg<boolean, "isBond">,
          signerCalldata: TypedAbiArg<Uint8Array | null, "signerCalldata">,
        ],
        Response<boolean, null>
      >,
      getEarnedStakerRewards: {
        name: "get-earned-staker-rewards",
        access: "read_only",
        args: [
          { name: "staker", type: "principal" },
          { name: "reward-cycle", type: "uint128" },
          { name: "bond-index", type: { optional: "uint128" } },
        ],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<
        [
          staker: TypedAbiArg<string, "staker">,
          rewardCycle: TypedAbiArg<number | bigint, "rewardCycle">,
          bondIndex: TypedAbiArg<number | bigint | null, "bondIndex">,
        ],
        bigint
      >,
    },
    maps: {},
    variables: {
      ERR_NO_CLAIMABLE_REWARDS: {
        name: "ERR_NO_CLAIMABLE_REWARDS",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
    },
    constants: {
      ERR_NO_CLAIMABLE_REWARDS: {
        isOk: false,
        value: 1_001n,
      },
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "test-pox-5-signer",
  },
  withdrawDataStbtc: {
    functions: {
      deleteWithdrawalsByNft: {
        name: "delete-withdrawals-by-nft",
        access: "public",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        Response<boolean, bigint>
      >,
      setWithdrawCooldownBlocks: {
        name: "set-withdraw-cooldown-blocks",
        access: "public",
        args: [{ name: "blocks", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [blocks: TypedAbiArg<number | bigint, "blocks">],
        Response<boolean, bigint>
      >,
      setWithdrawalsByNft: {
        name: "set-withdrawals-by-nft",
        access: "public",
        args: [
          { name: "nft-id", type: "uint128" },
          { name: "asset-amount", type: "uint128" },
          { name: "token-amount", type: "uint128" },
          { name: "unlock-burn-height", type: "uint128" },
          { name: "withdraw-fee", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          nftId: TypedAbiArg<number | bigint, "nftId">,
          assetAmount: TypedAbiArg<number | bigint, "assetAmount">,
          tokenAmount: TypedAbiArg<number | bigint, "tokenAmount">,
          unlockBurnHeight: TypedAbiArg<number | bigint, "unlockBurnHeight">,
          withdrawFee: TypedAbiArg<number | bigint, "withdrawFee">,
        ],
        Response<boolean, bigint>
      >,
      getWithdrawCooldownBlocks: {
        name: "get-withdraw-cooldown-blocks",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawUnlockBurnHeight: {
        name: "get-withdraw-unlock-burn-height",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawalsByNft: {
        name: "get-withdrawals-by-nft",
        access: "read_only",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: {
          type: {
            tuple: [
              { name: "asset-amount", type: "uint128" },
              { name: "token-amount", type: "uint128" },
              { name: "unlock-burn-height", type: "uint128" },
              { name: "withdraw-fee", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        {
          assetAmount: bigint;
          tokenAmount: bigint;
          unlockBurnHeight: bigint;
          withdrawFee: bigint;
        }
      >,
    },
    maps: {
      withdrawalsByNft: {
        name: "withdrawals-by-nft",
        key: "uint128",
        value: {
          tuple: [
            { name: "asset-amount", type: "uint128" },
            { name: "token-amount", type: "uint128" },
            { name: "unlock-burn-height", type: "uint128" },
            { name: "withdraw-fee", type: "uint128" },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          assetAmount: bigint;
          tokenAmount: bigint;
          unlockBurnHeight: bigint;
          withdrawFee: bigint;
        }
      >,
    },
    variables: {
      ERR_COOLDOWN_TOO_SHORT: {
        name: "ERR_COOLDOWN_TOO_SHORT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      withdrawCooldownBlocks: {
        name: "withdraw-cooldown-blocks",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_COOLDOWN_TOO_SHORT: {
        isOk: false,
        value: 24_001n,
      },
      withdrawCooldownBlocks: 10n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "withdraw-data-stbtc",
  },
  withdrawDataStx: {
    functions: {
      deleteWithdrawalsByNft: {
        name: "delete-withdrawals-by-nft",
        access: "public",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        Response<boolean, bigint>
      >,
      setWithdrawCooldownBlocks: {
        name: "set-withdraw-cooldown-blocks",
        access: "public",
        args: [{ name: "blocks", type: "uint128" }],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [blocks: TypedAbiArg<number | bigint, "blocks">],
        Response<boolean, bigint>
      >,
      setWithdrawalsByNft: {
        name: "set-withdrawals-by-nft",
        access: "public",
        args: [
          { name: "nft-id", type: "uint128" },
          { name: "asset-amount", type: "uint128" },
          { name: "token-amount", type: "uint128" },
          { name: "unlock-burn-height", type: "uint128" },
          { name: "withdraw-fee", type: "uint128" },
        ],
        outputs: { type: { response: { ok: "bool", error: "uint128" } } },
      } as TypedAbiFunction<
        [
          nftId: TypedAbiArg<number | bigint, "nftId">,
          assetAmount: TypedAbiArg<number | bigint, "assetAmount">,
          tokenAmount: TypedAbiArg<number | bigint, "tokenAmount">,
          unlockBurnHeight: TypedAbiArg<number | bigint, "unlockBurnHeight">,
          withdrawFee: TypedAbiArg<number | bigint, "withdrawFee">,
        ],
        Response<boolean, bigint>
      >,
      getWithdrawCooldownBlocks: {
        name: "get-withdraw-cooldown-blocks",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawUnlockBurnHeight: {
        name: "get-withdraw-unlock-burn-height",
        access: "read_only",
        args: [],
        outputs: { type: "uint128" },
      } as TypedAbiFunction<[], bigint>,
      getWithdrawalsByNft: {
        name: "get-withdrawals-by-nft",
        access: "read_only",
        args: [{ name: "nft-id", type: "uint128" }],
        outputs: {
          type: {
            tuple: [
              { name: "asset-amount", type: "uint128" },
              { name: "token-amount", type: "uint128" },
              { name: "unlock-burn-height", type: "uint128" },
              { name: "withdraw-fee", type: "uint128" },
            ],
          },
        },
      } as TypedAbiFunction<
        [nftId: TypedAbiArg<number | bigint, "nftId">],
        {
          assetAmount: bigint;
          tokenAmount: bigint;
          unlockBurnHeight: bigint;
          withdrawFee: bigint;
        }
      >,
    },
    maps: {
      withdrawalsByNft: {
        name: "withdrawals-by-nft",
        key: "uint128",
        value: {
          tuple: [
            { name: "asset-amount", type: "uint128" },
            { name: "token-amount", type: "uint128" },
            { name: "unlock-burn-height", type: "uint128" },
            { name: "withdraw-fee", type: "uint128" },
          ],
        },
      } as TypedAbiMap<
        number | bigint,
        {
          assetAmount: bigint;
          tokenAmount: bigint;
          unlockBurnHeight: bigint;
          withdrawFee: bigint;
        }
      >,
    },
    variables: {
      ERR_COOLDOWN_TOO_SHORT: {
        name: "ERR_COOLDOWN_TOO_SHORT",
        type: {
          response: {
            ok: "none",
            error: "uint128",
          },
        },
        access: "constant",
      } as TypedAbiVariable<Response<null, bigint>>,
      withdrawCooldownBlocks: {
        name: "withdraw-cooldown-blocks",
        type: "uint128",
        access: "variable",
      } as TypedAbiVariable<bigint>,
    },
    constants: {
      ERR_COOLDOWN_TOO_SHORT: {
        isOk: false,
        value: 24_001n,
      },
      withdrawCooldownBlocks: 10n,
    },
    non_fungible_tokens: [],
    fungible_tokens: [],
    epoch: "Epoch40",
    clarity_version: "Clarity6",
    contractName: "withdraw-data-stx",
  },
} as const;

export const accounts = {
  deployer: {
    address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    balance: "100000000000000",
  },
  wallet_1: {
    address: "ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5",
    balance: "100000000000000",
  },
  wallet_10: {
    address: "ST3FFKYTTB975A3JC3F99MM7TXZJ406R3GKE6JV56",
    balance: "200000000000000",
  },
  wallet_2: {
    address: "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
    balance: "100000000000000",
  },
  wallet_3: {
    address: "ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC",
    balance: "100000000000000",
  },
  wallet_4: {
    address: "ST2NEB84ASENDXKYGJPQW86YXQCEFEX2ZQPG87ND",
    balance: "100000000000000",
  },
  wallet_5: {
    address: "ST2REHHS5J3CERCRBEPMGH7921Q6PYKAADT7JP2VB",
    balance: "100000000000000",
  },
  wallet_6: {
    address: "ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0",
    balance: "100000000000000",
  },
  wallet_7: {
    address: "ST3PF13W7Z0RRM42A8VZRVFQ75SV1K26RXEP8YGKJ",
    balance: "100000000000000",
  },
  wallet_8: {
    address: "ST3NBRSFKX28FQ2ZJ1MAKX58HKHSDGNV5N7R21XCP",
    balance: "100000000000000",
  },
  wallet_9: {
    address: "STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6",
    balance: "100000000000000",
  },
} as const;

export const identifiers = {
  commissionSbtcV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.commission-sbtc-v1",
  consensusStakerTrait:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.consensus-staker-trait",
  dao: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.dao",
  dataPoolsStbtcV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-pools-stbtc-v1",
  dataStbtcV1: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-stbtc-v1",
  dataStxV1: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-stx-v1",
  dataStxV2: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-stx-v2",
  nativePoolSignerManager:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.native-pool-signer-manager",
  nativePoolV1: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.native-pool-v1",
  pox5: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox-5",
  rewardSplitCalculatorV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.reward-split-calculator-v1",
  rewardsPox5V1: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rewards-pox5-v1",
  rewardsStxV1: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rewards-stx-v1",
  rewardsStxV2: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rewards-stx-v2",
  sbtcDeposit: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit",
  sbtcRegistry: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-registry",
  sbtcToken: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token",
  sbtcWithdrawal: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-withdrawal",
  sdaoStakingSbtcV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sdao-staking-sbtc-v1",
  sdaoToken: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sdao-token",
  signerAdminV1: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-admin-v1",
  signerManagerV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-manager-v1",
  signerPayoutV1: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-payout-v1",
  signerRegistryV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-registry-v1",
  sip010TraitFtStandard:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-010-trait-ft-standard",
  sip09Trait: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-09-trait",
  stackingDaoCoreStbtcV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-stbtc-v1",
  stackingDaoCoreStstxbtcV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-ststxbtc-v1",
  stackingDaoCoreStstxbtcV2:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-ststxbtc-v2",
  stackingDaoCoreStxV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-stx-v1",
  stackingDaoCoreStxV2:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-stx-v2",
  stbtcReserve: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-reserve",
  stbtcStakerTemplateV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-staker-template-v1",
  stbtcStakerTrait:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-staker-trait",
  stbtcToken: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-token",
  stbtcWithdrawNft:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-withdraw-nft",
  strategyV6: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.strategy-v6",
  ststxToken: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststx-token",
  ststxWithdrawNftV3:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststx-withdraw-nft-v3",
  ststxbtcDataV1: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-data-v1",
  ststxbtcToken: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-token",
  ststxbtcTrackingV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-tracking-v1",
  ststxbtcWithdrawNftV2:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-withdraw-nft-v2",
  stxReserve: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stx-reserve",
  stxReserveV2: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stx-reserve-v2",
  stxStakerTemplateV1:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stx-staker-template-v1",
  swapStstxStstxbtcV3:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.swap-ststx-ststxbtc-v3",
  swapStstxStstxbtcV4:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.swap-ststx-ststxbtc-v4",
  testPox5Signer: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.test-pox-5-signer",
  withdrawDataStbtc:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.withdraw-data-stbtc",
  withdrawDataStx:
    "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.withdraw-data-stx",
} as const;

export const simnet = {
  accounts,
  contracts,
  identifiers,
} as const;

export const deployments = {
  commissionSbtcV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.commission-sbtc-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.commission-sbtc-v1",
    testnet: null,
    mainnet: null,
  },
  consensusStakerTrait: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.consensus-staker-trait",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.consensus-staker-trait",
    testnet: null,
    mainnet: null,
  },
  dao: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.dao",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.dao",
    testnet: null,
    mainnet: null,
  },
  dataPoolsStbtcV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-pools-stbtc-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-pools-stbtc-v1",
    testnet: null,
    mainnet: null,
  },
  dataStbtcV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-stbtc-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-stbtc-v1",
    testnet: null,
    mainnet: null,
  },
  dataStxV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-stx-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-stx-v1",
    testnet: null,
    mainnet: null,
  },
  dataStxV2: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-stx-v2",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.data-stx-v2",
    testnet: null,
    mainnet: null,
  },
  nativePoolSignerManager: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.native-pool-signer-manager",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.native-pool-signer-manager",
    testnet: null,
    mainnet: null,
  },
  nativePoolV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.native-pool-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.native-pool-v1",
    testnet: null,
    mainnet: null,
  },
  pox5: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox-5",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox-5",
    testnet: null,
    mainnet: null,
  },
  rewardSplitCalculatorV1: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.reward-split-calculator-v1",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.reward-split-calculator-v1",
    testnet: null,
    mainnet: null,
  },
  rewardsPox5V1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rewards-pox5-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rewards-pox5-v1",
    testnet: null,
    mainnet: null,
  },
  rewardsStxV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rewards-stx-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rewards-stx-v1",
    testnet: null,
    mainnet: null,
  },
  rewardsStxV2: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rewards-stx-v2",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.rewards-stx-v2",
    testnet: null,
    mainnet: null,
  },
  sbtcDeposit: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-deposit",
    simnet: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit",
    testnet: null,
    mainnet: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-deposit",
  },
  sbtcRegistry: {
    devnet: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-registry",
    simnet: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-registry",
    testnet: null,
    mainnet: null,
  },
  sbtcToken: {
    devnet: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token",
    simnet: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token",
    testnet: null,
    mainnet: null,
  },
  sbtcWithdrawal: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-withdrawal",
    simnet: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-withdrawal",
    testnet: null,
    mainnet: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-withdrawal",
  },
  sdaoStakingSbtcV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sdao-staking-sbtc-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sdao-staking-sbtc-v1",
    testnet: null,
    mainnet: null,
  },
  sdaoToken: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sdao-token",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sdao-token",
    testnet: null,
    mainnet: null,
  },
  signerAdminV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-admin-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-admin-v1",
    testnet: null,
    mainnet: null,
  },
  signerManagerV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-manager-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-manager-v1",
    testnet: null,
    mainnet: null,
  },
  signerPayoutV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-payout-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-payout-v1",
    testnet: null,
    mainnet: null,
  },
  signerRegistryV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-registry-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.signer-registry-v1",
    testnet: null,
    mainnet: null,
  },
  sip010TraitFtStandard: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-010-trait-ft-standard",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-010-trait-ft-standard",
    testnet: null,
    mainnet: null,
  },
  sip09Trait: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-09-trait",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sip-09-trait",
    testnet: null,
    mainnet: null,
  },
  stackingDaoCoreStbtcV1: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-stbtc-v1",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-stbtc-v1",
    testnet: null,
    mainnet: null,
  },
  stackingDaoCoreStstxbtcV1: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-ststxbtc-v1",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-ststxbtc-v1",
    testnet: null,
    mainnet: null,
  },
  stackingDaoCoreStstxbtcV2: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-ststxbtc-v2",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-ststxbtc-v2",
    testnet: null,
    mainnet: null,
  },
  stackingDaoCoreStxV1: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-stx-v1",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-stx-v1",
    testnet: null,
    mainnet: null,
  },
  stackingDaoCoreStxV2: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-stx-v2",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stacking-dao-core-stx-v2",
    testnet: null,
    mainnet: null,
  },
  stbtcReserve: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-reserve",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-reserve",
    testnet: null,
    mainnet: null,
  },
  stbtcStakerTemplateV1: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-staker-template-v1",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-staker-template-v1",
    testnet: null,
    mainnet: null,
  },
  stbtcStakerTrait: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-staker-trait",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-staker-trait",
    testnet: null,
    mainnet: null,
  },
  stbtcToken: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-token",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-token",
    testnet: null,
    mainnet: null,
  },
  stbtcWithdrawNft: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-withdraw-nft",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stbtc-withdraw-nft",
    testnet: null,
    mainnet: null,
  },
  strategyV6: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.strategy-v6",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.strategy-v6",
    testnet: null,
    mainnet: null,
  },
  ststxToken: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststx-token",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststx-token",
    testnet: null,
    mainnet: null,
  },
  ststxWithdrawNftV3: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststx-withdraw-nft-v3",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststx-withdraw-nft-v3",
    testnet: null,
    mainnet: null,
  },
  ststxbtcDataV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-data-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-data-v1",
    testnet: null,
    mainnet: null,
  },
  ststxbtcToken: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-token",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-token",
    testnet: null,
    mainnet: null,
  },
  ststxbtcTrackingV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-tracking-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-tracking-v1",
    testnet: null,
    mainnet: null,
  },
  ststxbtcWithdrawNftV2: {
    devnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-withdraw-nft-v2",
    simnet:
      "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.ststxbtc-withdraw-nft-v2",
    testnet: null,
    mainnet: null,
  },
  stxReserve: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stx-reserve",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stx-reserve",
    testnet: null,
    mainnet: null,
  },
  stxReserveV2: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stx-reserve-v2",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stx-reserve-v2",
    testnet: null,
    mainnet: null,
  },
  stxStakerTemplateV1: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stx-staker-template-v1",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.stx-staker-template-v1",
    testnet: null,
    mainnet: null,
  },
  swapStstxStstxbtcV3: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.swap-ststx-ststxbtc-v3",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.swap-ststx-ststxbtc-v3",
    testnet: null,
    mainnet: null,
  },
  swapStstxStstxbtcV4: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.swap-ststx-ststxbtc-v4",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.swap-ststx-ststxbtc-v4",
    testnet: null,
    mainnet: null,
  },
  testPox5Signer: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.test-pox-5-signer",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.test-pox-5-signer",
    testnet: null,
    mainnet: null,
  },
  withdrawDataStbtc: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.withdraw-data-stbtc",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.withdraw-data-stbtc",
    testnet: null,
    mainnet: null,
  },
  withdrawDataStx: {
    devnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.withdraw-data-stx",
    simnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.withdraw-data-stx",
    testnet: null,
    mainnet: null,
  },
} as const;

export const project = {
  contracts,
  deployments,
} as const;
