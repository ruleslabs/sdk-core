import { AccountMaps, AddressMap, SupportedChainId } from '../types'
import { StarknetChainId, EthereumChainId } from './networks'

// Contracts

function constructSameAddressMap(address: string, chainIds: SupportedChainId[]): AddressMap {
  return chainIds.reduce<AddressMap>((acc, chainId) => {
    acc[chainId] = address
    return acc
  }, {} as any)
}

const constructSameEthereumAddressMap = (address: string): AddressMap =>
  constructSameAddressMap(address, Object.values(EthereumChainId) as EthereumChainId[])

const constructSameStarknetAddressMap = (address: string): AddressMap =>
  constructSameAddressMap(address, Object.values(StarknetChainId) as StarknetChainId[])

/* Kass contract Addresses */
export const KASS_ADDRESSES: AddressMap = {
  ...constructSameEthereumAddressMap('0xdead'),
  ...constructSameStarknetAddressMap('0xdead'),
}

/* Rules */
export const RULES_TOKENS_ADDRESSES = {
  [StarknetChainId.GOERLI]: '0x5f5c553e2bfb3ac1cd11a286fb6bc1deb286b97b17f9d61a1793c1d956827c4',
  [StarknetChainId.MAINNET]: '0x46bfa580e4fa55a38eaa7f51a3469f86b336eed59a6136a07b7adcd095b0eb2',
}

/* Starknet ETH */
export const ETH_ADDRESSES: AddressMap = {
  [StarknetChainId.GOERLI]: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  [StarknetChainId.MAINNET]: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
}

/* Marketplace */
export const MARKETPLACE_ADDRESSES: AddressMap = {
  [StarknetChainId.GOERLI]: '0xc56773d8708c7146e127d7c20e7e4321279db15731ebb1c6dbd1b46b5d0f27',
  [StarknetChainId.MAINNET]: '0x63a4b3b0122cdaa6ba244739add94aed1d31e3330458cda833a8d119f28cbe8',
}

/* Starkgate contract addresses */
export const STARKGATE_ADDRESSES: AddressMap = {
  [EthereumChainId.GOERLI]: '0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e',
  [EthereumChainId.MAINNET]: '0xae0Ee0A63A2cE6BaeEFFE56e7714FB4EFE48D419',
  ...constructSameStarknetAddressMap('0x73314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82'),
}

/* Multicall */
export const MULTICALL_ADDRESSES: AddressMap = {
  [StarknetChainId.GOERLI]: '0x042a12c5a641619a6c58e623d5735273cdfb0e13df72c4bacb4e188892034bd6',
  [StarknetChainId.MAINNET]: '0x0740a7a14618bb7e4688d10059bc42104d22c315bb647130630c77d3b6d3ee50',
  [EthereumChainId.GOERLI]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [EthereumChainId.MAINNET]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
}

/* UCD */
export const UCD_ADDRESSES: AddressMap = {
  [StarknetChainId.GOERLI]: '0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf',
  [StarknetChainId.MAINNET]: '0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf',
}

/* Tax reserve */
export const TAX_RESERVE_ADDRESSES: AddressMap = {
  [StarknetChainId.GOERLI]: '0x7c936b2c29e54b1aa24e1f33f36d1b2ce3c7755f87a5a837c924fc56bde7d86',
  [StarknetChainId.MAINNET]: '0x5abca3aa491806315a8cadebee93a8a167a4c0ac1a56b924429a891970e0b8d',
}

/* Accounts */
export enum RulesAccount {
  VOUCHER_SIGNER = 'VOUCHER_SIGNER',
}

export const ACCOUNTS: AccountMaps = {
  [StarknetChainId.MAINNET]: {
    [RulesAccount.VOUCHER_SIGNER]: '0xdead',
  },
  [StarknetChainId.GOERLI]: {
    [RulesAccount.VOUCHER_SIGNER]: '0x666cd8bd54848d52fac2bba6391a5b6abed75ddad2c113c1746ffa9fd541d8b',
  },
}
