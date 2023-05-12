export function isEthereumAddress(address: string = '') {
  return address.match(/^0x[0-9a-fA-F]{40}$/)
}

export function isStarknetAddress(address: string = '') {
  return address.match(/^0x[0-9a-fA-F]{64}$/)
}
