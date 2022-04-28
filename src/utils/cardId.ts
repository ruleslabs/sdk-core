import { keccak256 } from '@ethersproject/keccak256'

function asciiToHex(str: string): string {
	return str.split('').map(c => Number(c.charCodeAt(0)).toString(16)).join('')
}

function switchHexEndianness(hex: string): string {
  const arr = []

  for (var i = 0, l = hex.length; i < l; i += 2) arr.push(hex.substring(i, i + 2))
  return arr.reverse().join('')
}

function switchHexEndiannessByWords(hex: string, wordLen: number): string {
  const arr = []

  for (var i = 0, l = hex.length; i < l; i += wordLen) arr.push(switchHexEndianness(hex.substring(i, i + wordLen)))
  return arr.join('')
}

export function getStarknetCardId(artistName: string, season: number, scarcity: number, serialNumber: number): string {
  const littleEndianHexArtistName = switchHexEndianness(asciiToHex(artistName))
  const words: string[] = []

  for (var i = 3 * 16; i >= 0; i -= 16) words.push(littleEndianHexArtistName.substring(i, i + 16).padEnd(16, '0'))

  words.push(switchHexEndianness(
    (((season & 0xffff) * 2 ** 40) + ((scarcity & 0xff) * 2 ** 32) + (serialNumber & 0xffffffff)).toString(16)
    .padStart(14, '0')
  ))

  const keccackOutput = keccak256(`0x${words.join('')}`)

  return `0x${switchHexEndiannessByWords(keccackOutput.substring(2), 16)}`
}
