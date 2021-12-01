import { Scarcity } from '../constants'

export class Rule {
  public readonly supply: number
  public readonly name: string
  public readonly season: number
  public readonly scarcity: Scarcity

  protected constructor(supply: number, name: string, season: number, scarcity: Scarcity) {
    this.supply = supply
    this.name = name
    this.season = season
    this.scarcity = scarcity
  }
}
