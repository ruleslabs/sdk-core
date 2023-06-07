import { hash, shortString } from 'starknet'

import { Uint256 } from '../types'

interface Card {
  artistName: string
  season: number
  scarcity: number
  serialNumber: number
}

export function getCardTokenId({ artistName, season, scarcity, serialNumber }: Card): Uint256 {
  return {
    low: hash.computeHashOnElements([shortString.encodeShortString(artistName), season, scarcity]),
    high: `${serialNumber}`,
  }
}
