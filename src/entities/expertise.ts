import invariant from 'tiny-invariant'

import { Skill } from './skill'
import { Style } from '../constants'

export class Expertise {
  public readonly skill: Skill
  public readonly styles: Style[]

  public constructor(skill: Skill, styles: Style[]) {
    styles.forEach((style) => invariant(skill.validStyles.includes(style), 'STYLE'))

    this.skill = skill
    this.styles = styles.filter((style, index) => styles.indexOf(style) === index)
  }
}
