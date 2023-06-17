export * from './addresses'
export * from './networks'

import JSBI from 'jsbi'
import { hash } from 'starknet'

export const MaxUint256 = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

export enum ScarcityName {
  COMMON = 'common',
  PLATINIUM = 'platinium',
  HALLOWEEN = 'halloween',
}

export const Seasons: {
  [key: number]: Array<{
    name: ScarcityName,
    maxSupply?: number
    maxLowSerial: number
    cScoreCoeff?: number
  }>
} = {
  [1]: [
    {
      name: ScarcityName.COMMON,
      maxLowSerial: 100,
    },
    {
      name: ScarcityName.PLATINIUM,
      maxSupply: 350,
      maxLowSerial: 20,
      cScoreCoeff: 10,
    },
    {
      name: ScarcityName.HALLOWEEN,
      maxSupply: 2175,
      maxLowSerial: 100,
      cScoreCoeff: 2.5,
    },
  ],
}

// Signer escape

export const MINIMUM_ETH_BALANCE_TO_ESCAPE_SIGNER = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(15)) // 0.001 ETH
export const ESCAPE_SECURITY_PERIOD = 3 * 24 * 60 * 60 // 3 days

// Version

export const LATEST_ACCOUNT_VERSION = '0.2.0'

// tx actions

export enum StarknetTransactionAction {
  ACCOUNT_DEPLOYMENT = 'account-deployment',
  PACKS_DELIVERY = 'packs-delivery',
  PACKS_OPENING_PREPARATION = 'packs-opening-preparation',
  PACKS_OPENING = 'packs-opening',
  WALLET_UPGRADE = 'wallet-upgrade',
  SIGNER_ESCAPE_TRIGGERED = 'signer-escape-triggered',
  SIGNER_ESCAPED = 'signer-escaped',
  WITHDRAW = 'withdraw',
  CARD_TRANSFER = 'card-transfer',
  OFFER_CREATION = 'offer-creation',
  OFFER_CANCELLATION = 'offer-cancellation',
  OFFER_ACCEPTANCE = 'offer-acceptance',
  LIVE_REWARDS_DELIVERY = 'live-rewards-delivery',
}

// wallet lock

export enum StarknetWalletLockingReason {
  SIGNER_ESCAPE = 'SIGNER_ESCAPE',
  FORCED_UPGRADE = 'FORCED_UPGRADE',
  MAINTENANCE = 'MAINTENANCE',
}

// C-Score

export const C_SCORE_GLOBAL_MULTIPLICATOR = 1_000

// IPFS

export const CAIRO_FIELD_PRIME_CID = 'QmNssyH6oBvgZBcS7pB8v7hUbBx2ntxfd5NdBY6kyFtHje' // 0x1220 - CAIRO_FIELD_PRIME

// EVENTS

export const EventKeys = {
  TRANSFER_SINGLE: hash.getSelectorFromName('TransferSingle'),
  TRANSFER_BATCH: hash.getSelectorFromName('TransferBatch'),

  ACCOUNT_INITIALIZED: hash.getSelectorFromName('AccountInitialized'),
  ACCOUNT_UPGRADED: hash.getSelectorFromName('AccountUpgraded'),

  SIGNER_ESCAPE_TRIGGERED: hash.getSelectorFromName('SignerEscapeTriggered'),
  SIGNER_ESCAPED: hash.getSelectorFromName('SignerEscaped'),
  SIGNER_PUBLIC_KEY_CHANGED: hash.getSelectorFromName('SignerPublicKeyChanged'),

  OFFER_CREATED: hash.getSelectorFromName('OfferCreated'),
  OFFER_CANCELED: hash.getSelectorFromName('OfferCanceled'),
  OFFER_ACCEPTED: hash.getSelectorFromName('OfferAccepted'),

  APPROVAL_FOR_ALL: hash.getSelectorFromName('ApprovalForAll'),

  TRANSFER: hash.getSelectorFromName('Transfer'),
}

export const WITHDRAW_MESSAGE = '0x0'

// PKS

export const DUMMY_PK = '0xB00B135'

// Class hashes

export const ACCOUNT_CLASS_HASH = '0x1c644efdf255bffbac0bc7915e969edac4c0bcae5f162dc47382c2fd4fff4ab'
export const RULES_TOKENS_CLASS_HASH = '0x7aeabbf026b49574a44d0b0b759275f8774189bc2ebbb0f38db225fb3482cb0'
export const MARKETPLACE_CLASS_HASH = '0x9a53196037550a56cb163bf8c495f4c6c2c8d4f2cd4f30f1857cf39aff66ba'
