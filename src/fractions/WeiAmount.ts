import JSBI from 'jsbi'
import _Big from 'big.js'
import toFormat from 'toformat'
import invariant from 'tiny-invariant'

import { BigintIsh, MaxUint256 } from '../constants'
import { Fraction } from './Fraction'

const Big = toFormat(_Big)

export class WeiAmount extends Fraction {
  public readonly decimalScale: JSBI
  public static readonly decimals = 18

  public static fromRawAmount(rawAmount: BigintIsh): WeiAmount {
    return new WeiAmount(rawAmount)
  }

  public static fromEtherAmount(etherAmount: number): WeiAmount {
    const rawAmount = WeiAmount.rawAmountFromEtherAmount(etherAmount)
    return new WeiAmount(rawAmount)
  }

  private static rawAmountFromEtherAmount(etherAmount: number): BigintIsh {
    return Big(etherAmount).mul(Big(10).pow(WeiAmount.decimals)).toString()
  }

  protected constructor(numerator: BigintIsh, denominator?: BigintIsh) {
    super(numerator, denominator)
    invariant(JSBI.lessThanOrEqual(this.quotient, MaxUint256), 'AMOUNT')

    this.decimalScale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(WeiAmount.decimals))
  }

  public multiply(other: Fraction | BigintIsh): WeiAmount {
    Big
    const multiplied = super.multiply(other)
    return new WeiAmount(multiplied.numerator, multiplied.denominator)
  }

  public toSignificant(
    significantDigits: number = 6,
    roundingMode?: number,
    format?: object,
  ): string {
    return super.divide(this.decimalScale).toSignificant(significantDigits, roundingMode, format)
  }

  public toFixed(
    decimalPlaces: number = WeiAmount.decimals,
    roundingMode?: number,
    format?: object,
  ): string {
    invariant(decimalPlaces <= WeiAmount.decimals, 'DECIMALS')
    return super.divide(this.decimalScale).toFixed(decimalPlaces, roundingMode, format)
  }
}
