function asciiToHex(str: string): string {
	return str.split('').map(c => Number(c.charCodeAt(0)).toString(16)).join('')
}

export function getStarknetCardId(artistName: string, season: number, scarcity: number, serialNumber: number): string {
  const hexArtistName = asciiToHex(artistName)
  const low = hexArtistName.substring(0, 32).padStart(32, '0')
  const high = hexArtistName.substring(32, 54).padStart(22, '0')

	const hexSeason = season.toString(16).padStart(2, '0')
	const hexScarcity = scarcity.toString(16).padStart(2, '0')
	const hexSerialNumber = serialNumber.toString(16).padStart(6, '0')

  return `0x${hexSerialNumber}${hexSeason}${hexScarcity}${high}${low}`
}
