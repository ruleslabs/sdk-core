import { Account, SequencerProvider } from 'starknet'
import { Alchemy } from 'alchemy-sdk'

import { RulesAccount } from '../constants'
import { NetworkInfos } from '../types'

export abstract class RulesSdkInterface {

  readonly networkInfos!: NetworkInfos

  readonly starknetAccounts!: { [name in RulesAccount]: Account[] }

  readonly alchemy!: Alchemy

  readonly starknet!: SequencerProvider
}
