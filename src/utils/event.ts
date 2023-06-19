import { encode } from '..'
import { ETH_ADDRESSES, EventKeys, ItemType, RULES_TOKENS_ADDRESSES, StarknetChainId } from '../constants'
import { ParsedEvent, TransferSingleEvent } from '../types'
import { uint256 } from 'starknet'

const nullAddressFilter = (addresses: string[]): string[] => addresses.filter((address) => address !== '0x0')

export function parseEvent(chainId: StarknetChainId, key: string, data: string[]): [ParsedEvent, string[]] | [] {
  switch (key) {
    case EventKeys.TRANSFER_SINGLE:
      return [
        {
          key: EventKeys.TRANSFER_SINGLE,
          operator: data[0],
          from: data[1],
          to: data[2],
          tokenId: encode.encodeUint256({ low: data[3], high: data[4] }),
          amount: uint256.uint256ToBN({ low: data[5], high: data[6] }),
          type: Number(data[3]) * Number(data[4]) ? 'card' : 'pack', // if low and high are both != 0, it's a card
        },
        nullAddressFilter([data[0], data[1], data[2]]),
      ]

    case EventKeys.TRANSFER_BATCH:
      const parsedEvents: TransferSingleEvent[] = []
      const involvedAddresses: string[] = []

      for (let i = 0, l = Number(data[3]); i < l; ++i) {
        const [parsedEvent, addresses] = parseEvent(
          chainId,
          EventKeys.TRANSFER_SINGLE,
          [
            data[0],
            data[1],
            data[2],
            data[4 + i * 2],
            data[5 + i * 2],
            data[5 + l * 2 + i * 2],
            data[6 + l * 2 + i * 2],
          ]
        )
        parsedEvents.push(parsedEvent as TransferSingleEvent)
        involvedAddresses.push(...(addresses as string[]))
      }

      return [parsedEvents, involvedAddresses]

    case EventKeys.TRANSFER:
      return [
        {
          key: EventKeys.TRANSFER,
          from: data[0],
          to: data[1],
          value: encode.encodeUint256({ low: data[2], high: data[3] }),
          type: 'eth',
        },
        nullAddressFilter([data[0], data[1]]),
      ]

    case EventKeys.SIGNER_PUBLIC_KEY_CHANGED:
      return [
        {
          key: EventKeys.SIGNER_PUBLIC_KEY_CHANGED,
          newPublicKey: data[0],
        },
        [],
      ]

    case EventKeys.FULLFILL_ORDER: {
      const offerItemOffset = 3
      const considerationItemOffset = isRulesOrder(chainId, data, offerItemOffset)
      if (!considerationItemOffset) {
        return []
      }

      const offerItemType = +data[offerItemOffset]

      const tokenIdOffset = (offerItemType === ItemType.ERC_1155 ? offerItemOffset : considerationItemOffset) + 2
      const amountOffset = tokenIdOffset + 2
      const priceOffset = (offerItemType === ItemType.ERC_20 ? offerItemOffset : considerationItemOffset) + 2

      return [
        {
          key: EventKeys.FULLFILL_ORDER,
          hash: data[0],
          offerer: data[1],
          offeree: data[2],
          tokenId: encode.encodeUint256({ low: data[tokenIdOffset], high: data[tokenIdOffset + 1] }),
          amount: +encode.encodeUint256({ low: data[amountOffset], high: data[amountOffset + 1] }),
          price: encode.encodeUint256({ low: data[priceOffset], high: data[priceOffset + 1] }),
        },
        [],
      ]
    }

    case EventKeys.CANCEL_ORDER:
      const offerItemOffset = 2
      const considerationItemOffset = isRulesOrder(chainId, data, offerItemOffset)
      if (!considerationItemOffset) {
        return []
      }

      return [
        {
          key: EventKeys.CANCEL_ORDER,
          hash: data[0],
        },
        [],
      ]
  }

  return []
}

function isRulesOrder(chainId: StarknetChainId, rawEventData: string[], offerItemOffset: number): number {
  const offerItemType = +rawEventData[offerItemOffset]

  let considerationItemOffset = offerItemOffset

  switch (offerItemType) {
    case ItemType.ERC_20:
      if (rawEventData[offerItemOffset + 1] !== ETH_ADDRESSES[chainId]) {
        return 0
      }

      considerationItemOffset += 4
      break

    case ItemType.ERC_1155:
      if (rawEventData[offerItemOffset + 1] !== RULES_TOKENS_ADDRESSES[chainId]) {
        return 0
      }

      considerationItemOffset += 6
      break

    default: return 0
  }

  const considerationItemType = +rawEventData[considerationItemOffset]

  switch (considerationItemType) {
    case ItemType.ERC_20:
      if (offerItemType !== ItemType.ERC_1155 || rawEventData[considerationItemOffset + 1] !== ETH_ADDRESSES[chainId]) {
        return 0
      }

      break

    case ItemType.ERC_1155:
      if (
        offerItemType !== ItemType.ERC_20 ||
        rawEventData[considerationItemOffset + 1] !== RULES_TOKENS_ADDRESSES[chainId]
      ) {
        return 0
      }

      break
  }

  return considerationItemOffset
}
