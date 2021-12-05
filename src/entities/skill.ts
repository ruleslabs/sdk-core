import { Style } from '../constants'
import { Expertise } from './expertise'

export class Skill {
  public readonly name: string
  public readonly validStyles: Style[]

  protected constructor(name: string, validStyles: Style[]) {
    this.name = name
    this.validStyles = validStyles
  }

  public withStyles(styles: Style[]): Expertise {
    return new Expertise(this, styles)
  }

  static RAPPER: Skill = new Skill('Rapper', [Style.LOFI, Style.DRILL, Style.LYRICIST])
  static BEATMAKER: Skill = new Skill('Beatmaker', [Style.LOFI, Style.DRILL])
  static VIDEOMAKER: Skill = new Skill('Videomaker', [])
}
