import { Tier, Season } from '../constants'
import { Creator } from './creator'

export class Rule {
  public readonly supply: number
  public readonly creator: Creator
  public readonly season: Season
  public readonly tier: Tier
  public readonly classic: boolean

  public constructor(creator: Creator, supply: number, season: Season, tier: Tier, classic: boolean) {
    this.supply = supply
    this.creator = creator
    this.season = season
    this.tier = tier
    this.classic = classic
  }
}
