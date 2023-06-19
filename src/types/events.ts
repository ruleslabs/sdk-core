import { EventKeys } from '../constants'

interface EventBase {
  key: EventKeys
}

// Transfers

export interface TransferSingleEvent extends EventBase {
  key: EventKeys.TRANSFER_SINGLE
  operator: string
  from: string
  to: string
  tokenId: string
  amount: bigint
  type: 'pack' | 'card'
}

export interface TransferEvent extends EventBase {
  key: EventKeys.TRANSFER
  from: string
  to: string
  value: string
  type: 'eth'
}

// Account

export interface SignerPublicKeyChangedEvent extends EventBase {
  key: EventKeys.SIGNER_PUBLIC_KEY_CHANGED
  newPublicKey: string
}

// Orders

export interface FulfillOrderEvent extends EventBase {
  key: EventKeys.FULLFILL_ORDER
  hash: string
  offerer: string
  offeree: string
  tokenId: string
  amount: number
  price: string
}

export interface CancelOrderEvent extends EventBase {
  key: EventKeys.CANCEL_ORDER
  hash: string
}

// events parser

export type ParsedEvent =
  | TransferSingleEvent
  | TransferSingleEvent[]
  | TransferEvent
  | SignerPublicKeyChangedEvent
  | FulfillOrderEvent
  | CancelOrderEvent

// parsed messages interfaces

// Withdraws

export interface WithdrawMessage {
  type: 'withdraw'
  l1Recipient: string
  amount: string
}

// messages parser

export type ParsedMessage = WithdrawMessage
