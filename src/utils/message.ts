import { WITHDRAW_MESSAGE } from '../constants'
import { MessageContext, ParsedMessage } from '../types'
import { uint256HexToStrHex } from './uint256'

export function parseMessage(context: MessageContext, payload: string[]): ParsedMessage | null {
  switch (context) {
    case 'starkgate':
      if (payload[0] !== WITHDRAW_MESSAGE) return null

      return {
        type: 'withdraw',
        l1Recipient: payload[1],
        amount: uint256HexToStrHex({ low: payload[2], high: payload[3] }),
      }
  }

  return null
}
