export interface Uint256 {
  low: string
  high: string
}

function asciiToHex(str: string): string {
  return str.split('').map((c) => c[0].charCodeAt(0).toString(16)).join('')
}

export function uint256HexToStrHex(uint256: Uint256) {
  return `${uint256.high}${uint256.low.substring(2)}`
}

// convert the first 32 characters of a string to starknet uint256
export function strToUint256(str: string): Uint256 {
  const low = asciiToHex(str.substring(0, 16))
  const high = asciiToHex(str.substring(16, 32))

  return {
    low: low.length ? `0x${low}` : '0',
    high: high.length ? `0x${high}` : '0',
  }
}
