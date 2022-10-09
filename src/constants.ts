import JSBI from 'jsbi'

export type BigintIsh = number | string | JSBI
export const MaxUint256 = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

export const ScarcityName = ['Common', 'Platinium']

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
      [1]: 350
    }
  }
}

// Signer escape

export const MINIMUM_ETH_BALANCE_TO_ESCAPE_SIGNER = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(15)) // 0.001 ETH
export const ESCAPE_SECURITY_PERIOD = 7 * 24 * 60 * 60 // 7 days

// Version

export const LATEST_ACCOUNT_VERSION = '0.2.0'
