import JSBI from 'jsbi'

import { EthereumChainId, RulesAccount, StarknetChainId } from '../constants'

export type SupportedChainId = EthereumChainId | StarknetChainId

export interface NetworkInfos {
  starknetChainId: StarknetChainId
  ethereumChainId: EthereumChainId
  blockTime: number
  maxBlockSyncingPerExecution: number
}

export type AddressMap = { [chainId in SupportedChainId]?: string }

export type AccountMap = { [account in RulesAccount]: string | Array<string> }

export type AccountMaps = { [chainId in StarknetChainId]: AccountMap }

export type BigintIsh = number | string | JSBI

export interface RulesSdkOptions {
  alchemyApiKey?: string
  pks?: AccountMap
}
