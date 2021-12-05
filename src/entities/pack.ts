import invariant from 'tiny-invariant'

import { Season } from '../constants'
import { Expertise } from './expertise'

export class Pack {
  public readonly supply: number
  public readonly season: Season
  public readonly expertises: Expertise[]
  public readonly classic: boolean

  public constructor(supply: number, season: Season, expertises: Expertise[], classic: boolean) {
    invariant(supply > 0, 'INVARIANT')

    this.supply = supply
    this.season = season
    this.expertises = expertises
    this.classic = classic
  }
}
