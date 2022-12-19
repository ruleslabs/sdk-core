import { C_SCORE_CARD_MODELS_COUNT_SHIFT } from '@/constants'

export interface ParsedCScore {
  cardModelsCount: number,
  cardsCount: number
}

export function parseCScore(cScore: number): ParsedCScore {
	return {
    cardModelsCount: Math.floor(cScore / C_SCORE_CARD_MODELS_COUNT_SHIFT),
    cardsCount: cScore % C_SCORE_CARD_MODELS_COUNT_SHIFT,
  }
}

export function formatCScore(parsedCScore: ParsedCScore): number {
  return parsedCScore.cardModelsCount * C_SCORE_CARD_MODELS_COUNT_SHIFT + parsedCScore.cardsCount
}
