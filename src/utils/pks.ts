import { ACCOUNTS, RulesAccount, StarknetChainId } from '../constants'
import { AccountMap } from '../types'

export function buildPksFromEnv(env: { [key: string]: string }): AccountMap {
  const pks = ACCOUNTS[StarknetChainId.GOERLI]

  for (const rulesAccount of Object.keys(pks) as RulesAccount[]) {
    pks[rulesAccount] = env[`${rulesAccount}_PK`]?.split(',') ?? []
  }

  return pks
}
