import JSBI from 'jsbi'
import _Big from 'big.js'
import toFormat from 'toformat'
import invariant from 'tiny-invariant'

import { BigintIsh } from '../constants'

const Big = toFormat(_Big)

export default class Fraction {
  public readonly numerator: JSBI
  public readonly denominator: JSBI

  public constructor(numerator: BigintIsh, denominator: BigintIsh = JSBI.BigInt(1)) {
    this.numerator = JSBI.BigInt(numerator)
    this.denominator = JSBI.BigInt(denominator)
  }

  private static tryParseFraction(fractionish: BigintIsh | Fraction): Fraction {
    if (fractionish instanceof JSBI || typeof fractionish === 'number' || typeof fractionish === 'string')
      return new Fraction(fractionish)

    if ('numerator' in fractionish && 'denominator' in fractionish) return fractionish
    throw new Error('Could not parse fraction')
  }

  // performs floor division
  public get quotient(): JSBI {
    return JSBI.divide(this.numerator, this.denominator)
  }

  public divide(other: Fraction | BigintIsh): Fraction {
    const otherParsed = Fraction.tryParseFraction(other)
    return new Fraction(
      JSBI.multiply(this.numerator, otherParsed.denominator),
      JSBI.multiply(this.denominator, otherParsed.numerator)
    )
  }

  public multiply(other: Fraction | BigintIsh): Fraction {
    const otherParsed = Fraction.tryParseFraction(other)
    return new Fraction(
      JSBI.multiply(this.numerator, otherParsed.numerator),
      JSBI.multiply(this.denominator, otherParsed.denominator)
    )
  }

  public toFixed(
    decimalPlaces: number,
    format: object = { groupSeparator: '' },
  ): string {
    invariant(Number.isInteger(decimalPlaces), `${decimalPlaces} is not an integer.`)
    invariant(decimalPlaces >= 0, `${decimalPlaces} is negative.`)

    Big.DP = decimalPlaces
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format)
  }
}
