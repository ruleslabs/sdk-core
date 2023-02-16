import { C_SCORE_CARD_MODELS_COUNT_SHIFT } from '@/constants'

export interface ParsedCScore {
  cardModelsCount: number,
  lowestSerialsTotal: number
}

export function parseCScore(cScore: number): ParsedCScore {
	return {
    cardModelsCount: Math.floor(cScore / C_SCORE_CARD_MODELS_COUNT_SHIFT),
    lowestSerialsTotal: cScore % C_SCORE_CARD_MODELS_COUNT_SHIFT,
  }
}

export function formatCScore(parsedCScore: ParsedCScore): number {
  return parsedCScore.cardModelsCount
    ? (parsedCScore.cardModelsCount + 1) * C_SCORE_CARD_MODELS_COUNT_SHIFT - parsedCScore.lowestSerialsTotal
    : 0
}
