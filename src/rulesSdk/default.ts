import { AlchemyProvider } from 'ethers'
import { Account, ProviderInterface, SequencerProvider, constants } from 'starknet'

import { NetworkInfos, RulesSdkOptions, FullBlock } from '../types'
import { RulesSdkInterface } from './interface'
import { ACCOUNTS, RulesAccount, SN_NETWORKS_INFOS, StarknetNetworkName } from '../constants'

export function buildAccount(
  provider: ProviderInterface,
  addresses: string | string[],
  pks: string | string[] = []
): Account[] {
  addresses = Array.isArray(addresses) ? addresses : [addresses]
  pks = Array.isArray(pks) ? pks : [pks]

  return addresses.map((address, index) => new Account(provider, address, pks[index] ?? ''))
}

export class ExtendedSequencerProvider extends SequencerProvider {
  public async getFullBlock(blockIdentifier: Parameters<ProviderInterface['getBlock']>[0]): Promise<FullBlock> {
    return this.fetchEndpoint('get_block', { blockIdentifier }) as FullBlock
  }
}

export class RulesSdk implements RulesSdkInterface {

  readonly networkInfos: NetworkInfos

  readonly starknetAccounts!: { [name in RulesAccount]: Account[] }

  readonly alchemyProvider?: AlchemyProvider

  readonly starknet: ExtendedSequencerProvider

  constructor(networkName: StarknetNetworkName, options: RulesSdkOptions = {}) {
    this.networkInfos = SN_NETWORKS_INFOS[networkName]

    // starknet provider
    this.starknet = new ExtendedSequencerProvider({ network: networkName as any as constants.NetworkName })

    // alchemy
    if (options.alchemyApiKey) {
      this.alchemyProvider = new AlchemyProvider(this.networkInfos.ethereumChainId, options.alchemyApiKey)
    }

    // built properties
    Object.defineProperties(this, {
      starknetAccounts: { enumerable: true, writable: false, value: {} },
    })

    // starknet accounts
    for (const rulesAccount of Object.keys(ACCOUNTS[this.networkInfos.starknetChainId]) as RulesAccount[]) {
      Object.defineProperty(this.starknetAccounts, rulesAccount, {
        enumerable: true,
        writable: false,
        value: buildAccount(
          this.starknet,
          ACCOUNTS[this.networkInfos.starknetChainId][rulesAccount],
          options.pks?.[rulesAccount]
        ),
      })
    }
  }
}
