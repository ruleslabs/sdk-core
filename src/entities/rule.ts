import { Tier, Season } from '../constants'

export class Rule {
  public readonly supply: number
  public readonly name: string
  public readonly season: Season
  public readonly scarcity: Tier

  protected constructor(supply: number, name: string, season: Season, scarcity: Tier) {
    this.supply = supply
    this.name = name
    this.season = season
    this.scarcity = scarcity
  }
}
