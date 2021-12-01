import invariant from 'tiny-invariant'
import { Rule } from './rule'

export class RuleNFT<T extends Rule> {
  public readonly rule: T
  public readonly serial: number

  protected constructor(rule: T, serial: number) {
    invariant(serial > 0 && serial <= rule.supply, 'SERIAL')
    this.rule = rule
    this.serial = serial
  }
}
