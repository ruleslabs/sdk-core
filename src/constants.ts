import JSBI from 'jsbi'

export type BigintIsh = number | string | JSBI
export const MaxUint256 = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

export const ScarcityName = ['Common', 'Platinium', 'Halloween']

export const Seasons: {
  [key: number]: {
    name: string,
    scarcitiesMaxSupplies: {
      [key: number]: number
    }
  }
} = {
  [1]: {
    name: "Season 1",
    scarcitiesMaxSupplies: {
      [1]: 350,
      [2]: 2175,
    },
  },
}

// Signer escape

export const MINIMUM_ETH_BALANCE_TO_ESCAPE_SIGNER = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(15)) // 0.001 ETH
export const ESCAPE_SECURITY_PERIOD = 7 * 24 * 60 * 60 // 7 days

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
}

// C-Score

export const C_SCORE_CARD_MODELS_COUNT_SHIFT = 1_000_000
