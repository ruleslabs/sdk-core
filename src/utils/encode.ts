import { encode } from 'starknet'

export function encodeShortString(str: string): string {
  return encode.addHexPrefix(str.split('').map(c => Number(c.charCodeAt(0)).toString(16)).join(''))
}
