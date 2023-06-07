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
  ACCOUNT_DEPLOYER = 'ACCOUNT_DEPLOYER',
  AIRDROP_MINTER = 'AIRDROP_MINTER',
  PACKS_MINTER = 'PACKS_MINTER',
  PACKS_OPENER = 'PACKS_OPENER',
  LIVE_REWARDS_MINTER = 'LIVE_REWARDS_MINTER',
}

export const ACCOUNTS: AccountMaps = {
  [StarknetChainId.MAINNET]: {
    [RulesAccount.ACCOUNT_DEPLOYER]: '0x135faa783a11cee068cf6424db10f59f252941c4067c243495c7b76ea327b60',
    [RulesAccount.AIRDROP_MINTER]: '0x43d0424a8a2689b38cd33ce74c4a34c600461320379598e5a3c2a59713f0aa2',
    [RulesAccount.PACKS_MINTER]: [
      '0x53877052f990547ec7ca9dedec3a33ca321d3d45d2ca0790a1bb34bae52956e',
      '0x67c0629e69455d67b2e139139d435943c27bd6fb6e4782a7584ef5ec4a2ef33',
      '0x748555ac6aba95f0b0830d7ee32bdb7d34494b13b53cc97d9b3a861ab5eab8',
      '0x16f896bb74ea70a191b309a394c9340eb99d574cc740b5b04683ce1f03db10c',
      '0x8ac7efe481d90e5f5f9178a6e1b8703f8425ea7dbbee97fb0fcbebbd308b69',
      '0x5202fa0cc255dac6e6546fe0f8511a30ba6938be79c6417027b36c1b8b66913',
    ],
    [RulesAccount.PACKS_OPENER]: [
      '0x18c71bcf1ecd11ca3d05962795012c7ab478db766425ab88886f2f663e1d533',
      '0xd90fd6aa27edd344c5cbe1fe999611416b268658e866a54265aaf50d9cf28d',
      '0x15df630d10ce0fb9344ca325843d38fa2dee39cd66ac0fa776a53274fdb59bf',
      '0x38240162a8eea5142d507ba750385497465a1bb55d4ca014bd34c8fdd5f63d8',
      '0x7518a3810c8204fb4377de22df74ed80857368795b936a99ca70bb0fda8bdd',
      '0x10486092a74377efcc93fe088cd52d977c2e0fef53b5d69b314a9fb6522c4ab',
    ],
    [RulesAccount.LIVE_REWARDS_MINTER]: '0x6fe7a3f5e48d8466fa55a8f0624926d3ce57fde88000b05687a4d3bdd61ff2d',
  },
  [StarknetChainId.GOERLI]: {
    [RulesAccount.ACCOUNT_DEPLOYER]: '0x424132074cba8835d04d72db60b42968f0fdb3458d284d4d3f8136f85abd3c6',
    [RulesAccount.AIRDROP_MINTER]: '0x7fbb88af467e48e163b43667b4254faee9b18a6d193fd4b4a47cc39044b4025',
    [RulesAccount.PACKS_MINTER]: '0x6044489665acefda5884fcf2d95fd4aeb81ae22c5dd5816911eedbcdb0f517b',
    [RulesAccount.PACKS_OPENER]: '0x631e1fc9e21497cdc20845b6e80b2ff72daa01aecbd521ed5cf317e4a967859',
    [RulesAccount.LIVE_REWARDS_MINTER]: '0xdead',
  },
}
