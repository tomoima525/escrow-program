import BN from 'bn.js';
export class EscrowInitdata {
  amount: BN;
  fee: BN;

  constructor(amount: BN, fee: BN) {
    this.amount = amount;
    this.fee = fee;
  }
}

export class Escrowdata {
  amount: BN;

  constructor(amount: BN) {
    this.amount = amount;
  }
}

export class InitEscrowdataArgs {
  instruction = 0;
  data: EscrowInitdata;

  constructor(args: { data: EscrowInitdata }) {
    this.data = args.data;
  }
}

export const INIT_ESCROW_SCHEMA = new Map<any, any>([
  [
    InitEscrowdataArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['data', EscrowInitdata],
      ],
    },
  ],
  [
    EscrowInitdata,
    {
      kind: 'struct',
      fields: [
        ['amount', 'u64'],
        ['fee', 'u64'],
      ],
    },
  ],
]);

export class TradeEscrowdataArgs {
  instruction = 1;
  data: Escrowdata;

  constructor(args: { data: Escrowdata }) {
    this.data = args.data;
  }
}

export const TRADE_ESCROW_SCHEMA = new Map<any, any>([
  [
    TradeEscrowdataArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['data', Escrowdata],
      ],
    },
  ],
  [
    Escrowdata,
    {
      kind: 'struct',
      fields: [['amount', 'u64']],
    },
  ],
]);

export class CancelEscrowdataArgs {
  instruction = 2;
}

export const CANCEL_ESCROW_SCHEMA = new Map<any, any>([
  [
    CancelEscrowdataArgs,
    {
      kind: 'struct',
      fields: [['instruction', 'u8']],
    },
  ],
]);
