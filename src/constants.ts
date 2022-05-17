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
      [1]: 999
    }
  }
}
