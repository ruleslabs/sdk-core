import { uint256HexToStrHex } from './uint256'

export const MessageContext = {
  STARKGATE: 'starkgate',
}

export const WITHDRAW_MESSAGE = '0x0'

// parsed messages interfaces

// Withdraws

export interface WithdrawMessage {
  type: 'withdraw'
  l1Recipient: string
  amount: string
}

// messages parser

type ParsedMessage = WithdrawMessage

export function parseMessage(context: string, payload: string[]): ParsedMessage | null {
  switch (context) {
    case MessageContext.STARKGATE:
      if (payload[0] !== WITHDRAW_MESSAGE) return null

      return {
        type: 'withdraw',
        l1Recipient: payload[1],
        amount: uint256HexToStrHex({ low: payload[2], high: payload[3] }),
      }
  }

  return null
}
