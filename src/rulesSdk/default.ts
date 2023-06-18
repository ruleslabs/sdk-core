import { AlchemyProvider } from 'ethers'
import { Account, ProviderInterface, SequencerProvider, constants, stark, typedData, uint256 } from 'starknet'

import { NetworkInfos, RulesSdkOptions, FullBlock } from '../types'
import { RulesSdkInterface } from './interface'
import {
  ACCOUNTS,
  DUMMY_PK,
  ETH_ADDRESSES,
  ItemType,
  RULES_TOKENS_ADDRESSES,
  RulesAccount,
  SN_NETWORKS_INFOS,
  StarknetNetworkName,
} from '../constants'
import { formatSignature } from '../utils/sign'

export function buildAccount(
  provider: ProviderInterface,
  addresses: string | string[],
  pks: string | string[] = []
): Account[] {
  addresses = Array.isArray(addresses) ? addresses : [addresses]
  pks = Array.isArray(pks) ? pks : [pks]

  return addresses.map((address, index) => new Account(provider, address, pks[index] ?? DUMMY_PK, '1'))
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

  public async signVoucherFor(receiver: string, tokenId: string, salt: string) {
    const data = {
      message: {
        receiver,
        tokenId: uint256.bnToUint256(tokenId),
        amount: {
          low: 1,
          high: 0,
        },
        salt,
      },
      domain: {
        name: "Rules",
        chainId: this.networkInfos.starknetChainId,
        version: "1.1",
      },
      types: {
        // IMPORTANT: Do not change StarkNetDomain to StarknetDomain
        StarkNetDomain: [
          { name: "name", type: "felt252" },
          { name: "chainId", type: "felt252" },
          { name: "version", type: "felt252" },
        ],
        Voucher: [
          { name: "receiver", type: "felt252" },
          { name: "tokenId", type: "u256" },
          { name: "amount", type: "u256" },
          { name: "salt", type: "felt252" },
        ],
        u256: [
          { name: 'low', type: 'felt252' },
          { name: 'high', type: 'felt252' },
        ],
      },
      primaryType: "Voucher",
    }

    const voucherSigner = this.starknetAccounts.VOUCHER_SIGNER[0]

    const signature = await voucherSigner.signMessage(data)

    return formatSignature(signature)
  }

  public async computeListingOrderHash(offerer: string, tokenId: string, amount: number, price: string, salt?: string) {
    const data = {
      message: {
        offerItem: {
          token: RULES_TOKENS_ADDRESSES[this.networkInfos.starknetChainId],
          identifier: uint256.bnToUint256(tokenId),
          amount: uint256.bnToUint256(amount),
          itemType: ItemType.ERC_1155,
        },
        considerationItem: {
          token: ETH_ADDRESSES[this.networkInfos.starknetChainId],
          identifier: uint256.bnToUint256(0),
          amount: uint256.bnToUint256(price),
          itemType: ItemType.ERC_20,
        },
        endTime: 0,
        salt: salt ?? stark.randomAddress(),
      },
      domain: {
        name: "Rules Marketplace",
        chainId: this.networkInfos.starknetChainId,
        version: "1.0",
      },
      types: {
        // IMPORTANT: Do not change StarkNetDomain to StarknetDomain
        StarkNetDomain: [
          { name: "name", type: "felt252" },
          { name: "chainId", type: "felt252" },
          { name: "version", type: "felt252" },
        ],
        Order: [
          { name: "offerItem", type: "Item" },
          { name: "considerationItem", type: "Item" },
          { name: "endTime", type: "felt252" },
          { name: "salt", type: "felt252" },
        ],
        Item: [
          { name: "token", type: "felt252" },
          { name: "identifier", type: "u256" },
          { name: "amount", type: "u256" },
          { name: "itemType", type: "felt252" },
        ],
        u256: [
          { name: 'low', type: 'felt252' },
          { name: 'high', type: 'felt252' },
        ],
      },
      primaryType: "Order",
    }

    return typedData.getMessageHash(data, offerer)
  }
}
