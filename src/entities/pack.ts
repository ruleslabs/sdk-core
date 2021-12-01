import { Drop, Season } from '../constants'

export class Pack {
  public readonly supply: number
  public readonly drop: Drop
  public readonly season: Season

  protected constructor(supply: number, drop: Drop, season: Season) {
    this.supply = supply
    this.drop = drop
    this.season = season
  }
}
