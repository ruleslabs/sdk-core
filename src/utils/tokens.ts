import { hash, shortString, uint256 } from 'starknet'

import { Uint256 } from '../types'

interface CardModel {
  artistName: string
  season: number
  scarcity: number
}

interface Card extends CardModel {
  serialNumber: number
}

export function getCardTokenId({ artistName, season, scarcity, serialNumber }: Card): Uint256 {
  return {
    low: getCardModelId({ artistName, season, scarcity }).toString(),
    high: `${serialNumber}`,
  }
}

export function getCardModelId({ artistName, season, scarcity }: CardModel) {
  const fullId = hash.computeHashOnElements([shortString.encodeShortString(artistName), season, scarcity])

  return uint256.bnToUint256(fullId).low
}
