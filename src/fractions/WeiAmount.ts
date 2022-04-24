import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
import Big from 'big.js'

import { BigintIsh, MaxUint256 } from '../constants'
import Fraction from './Fraction'

export default class WeiAmount extends Fraction {
  public readonly decimalScale: JSBI
  public static readonly decimals = 18

  public static fromRawAmount(rawAmount: BigintIsh): WeiAmount {
    return new WeiAmount(rawAmount)
  }

  public static fromEtherAmount(etherAmount: number): WeiAmount {
    const rawAmount = Big(etherAmount).mul(Big(10).pow(WeiAmount.decimals)).toString()
    return new WeiAmount(rawAmount)
  }

  protected constructor(numerator: BigintIsh, denominator?: BigintIsh) {
    super(numerator, denominator)
    invariant(JSBI.lessThanOrEqual(this.quotient, MaxUint256), 'AMOUNT')

    this.decimalScale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(WeiAmount.decimals))
  }

  public multiply(other: Fraction | BigintIsh): WeiAmount {
    const multiplied = super.multiply(other)
    return new WeiAmount(multiplied.numerator, multiplied.denominator)
  }

  public toFixed(
    decimalPlaces: number = WeiAmount.decimals,
    format?: object,
  ): string {
    invariant(decimalPlaces <= WeiAmount.decimals, 'DECIMALS')
    return super.divide(this.decimalScale).toFixed(decimalPlaces, format)
  }
}
