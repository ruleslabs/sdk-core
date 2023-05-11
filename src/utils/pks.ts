import { ACCOUNTS, DEFAULT_NETWORK_NAME, RulesAccount } from '../constants'
import { AccountMap } from '../types'

export function buildPksFromEnv(env: { [key: string]: string }): AccountMap {
  const pks = ACCOUNTS[DEFAULT_NETWORK_NAME]

  for (const rulesAccount of Object.keys(pks) as RulesAccount[]) {
    pks[rulesAccount] = env[`${rulesAccount}_PK`]?.split(',') ?? []
  }

  return pks
}
