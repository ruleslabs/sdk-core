import { Drop } from '../constants'

export class Pack {
  public readonly supply: number
  public readonly drop: Drop
  public readonly season: number

  protected constructor(supply: number, drop: Drop, season: number) {
    this.supply = supply
    this.drop = drop
    this.season = season
  }
}
