interface EventBase {
  key: string
}

// Approve

export interface ApprovalForAllEvent extends EventBase {
  owner: string
  operator: string
  approved: boolean
}

export interface ApprovalEvent extends EventBase {
  owner: string
  operator: string
  tokenId: string
  amount: number
  type: 'pack' | 'card'
}

// Offers

export interface OfferAcceptedEvent extends EventBase {
  tokenId: string
  buyer: string
}

export interface OfferCanceledEvent extends EventBase {
  tokenId: string
}

export interface OfferCreatedEvent extends EventBase {
  tokenId: string
  seller: string
  price: string
}

// Transfers

export interface TransferSingleEvent extends EventBase {
  operator: string
  from: string
  to: string
  tokenId: string
  amount: number
  type: 'pack' | 'card'
}

export interface TransferEvent extends EventBase {
  from: string
  to: string
  value: string
  type: 'eth'
}

// Account

export interface AccountInitializedEvent extends EventBase {
  signerPublicKey: string
  guardianPublicKey: string
}

export interface SignerPublicKeyChangedEvent extends EventBase {
  newPublicKey: string
}

// events parser

export type ParsedEvent =
  ApprovalForAllEvent |
  ApprovalEvent |
  OfferAcceptedEvent |
  OfferCanceledEvent |
  OfferCreatedEvent |
  TransferSingleEvent |
  TransferSingleEvent[] |
  TransferEvent |
  AccountInitializedEvent |
  SignerPublicKeyChangedEvent

// parsed messages interfaces

// Withdraws

export interface WithdrawMessage {
  type: 'withdraw'
  l1Recipient: string
  amount: string
}

// messages parser

export type ParsedMessage = WithdrawMessage
