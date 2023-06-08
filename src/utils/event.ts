import { uint256HexToStrHex } from './uint256'
import { EventKeys } from '../constants'
import { ParsedEvent, TransferSingleEvent } from '../types'
import { num, uint256 } from 'starknet'

const nullAddressFilter = (addresses: string[]): string[] => addresses.filter((address) => address !== '0x0')

export function parseEvent(key: string, data: string[]): [ParsedEvent, string[]] | [] {
  switch (key) {
    case EventKeys.TRANSFER_SINGLE:
      return [
        {
          key: EventKeys.TRANSFER_SINGLE,
          operator: data[0],
          from: data[1],
          to: data[2],
          tokenId: num.toHex(uint256.uint256ToBN({ low: data[3], high: data[4] })),
          amount: uint256.uint256ToBN({ low: data[5], high: data[6] }),
          type: Number(data[3]) * Number(data[4]) ? 'card' : 'pack', // if low and high are both != 0, it's a card
        } as TransferSingleEvent,
        nullAddressFilter([data[0], data[1], data[2]]),
      ]

    case EventKeys.TRANSFER_BATCH:
      const parsedEvents: TransferSingleEvent[] = []
      const involvedAddresses: string[] = []

      for (let i = 0, l = Number(data[3]); i < l; ++i) {
        const [parsedEvent, addresses] = parseEvent(
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

    case EventKeys.OFFER_CREATED:
      return [
        {
          key: EventKeys.OFFER_CREATED,
          tokenId: uint256HexToStrHex({ low: data[0], high: data[1] }),
          seller: data[2],
          price: data[3],
        },
        nullAddressFilter([data[2]]),
      ]

    case EventKeys.OFFER_CANCELED:
      return [
        {
          key: EventKeys.OFFER_CANCELED,
          tokenId: uint256HexToStrHex({ low: data[0], high: data[1] }),
        },
        [],
      ]

    case EventKeys.OFFER_ACCEPTED:
      return [
        {
          key: EventKeys.OFFER_ACCEPTED,
          tokenId: uint256HexToStrHex({ low: data[0], high: data[1] }),
          buyer: data[2],
        },
        nullAddressFilter([data[2]]),
      ]

    case EventKeys.APPROVAL_FOR_ALL:
      return [
        {
          key: EventKeys.APPROVAL_FOR_ALL,
          owner: data[0],
          operator: data[1],
          approved: data[2] !== '0x0',
        },
        nullAddressFilter([data[0], data[1]]),
      ]

    case EventKeys.TRANSFER:
      return [
        {
          key: EventKeys.TRANSFER,
          from: data[0],
          to: data[1],
          value: uint256HexToStrHex({ low: data[2], high: data[3] }),
          type: 'eth',
        },
        nullAddressFilter([data[0], data[1]]),
      ]

    case EventKeys.ACCOUNT_INITIALIZED:
      return [
        {
          key: EventKeys.ACCOUNT_INITIALIZED,
          signerPublicKey: data[0],
          guardianPublicKey: data[1],
        },
        [],
      ]

    case EventKeys.SIGNER_PUBLIC_KEY_CHANGED:
      return [
        {
          key: EventKeys.SIGNER_PUBLIC_KEY_CHANGED,
          newPublicKey: data[0],
        },
        [],
      ]
  }

  return []
}
