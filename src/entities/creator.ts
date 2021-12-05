import invariant from 'tiny-invariant'
import { Expertise } from './expertise'

export class Creator {
  public readonly name: string
  public readonly expertises: Expertises[]

  public constructor(name: string, expertises: Expertise[]) {
    invariant(expertises.length > 0, 'EXPERTISES')

    this.name = name
    this.expertises = expertises
  }
}
