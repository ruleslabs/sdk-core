export interface Uint256 {
  low: string
  high: string
}

function asciiToHex(str: string): string {
  return str.split('').map((c) => c[0].charCodeAt(0).toString(16)).join('')
}

export function uint256HexToStrHex(uint256: Uint256) {
  return `0x${uint256.high.replace('0x', '').padStart(32, '0')}${uint256.low.replace('0x', '').padStart(32, '0')}`
}

export function uint256HexFromStrHex(str: string): Uint256 {
  const formatedStr = str.replace('0x', '').padStart(64, '0')

  return {
    low: `0x${formatedStr.substring(32, 64)}`,
    high: `0x${formatedStr.substring(0, 32)}`,
  }
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
