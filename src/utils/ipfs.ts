import { CID } from 'multiformats/cid'
import { Uint256 } from './uint256'

export interface Metadata {
  hash: Uint256
  multihashIdentifier: number
}

function buf2hex(buffer: Uint8Array) {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
}

export async function parseIpfsCid(ipfsCid: string): Promise<Metadata> {
  const v0 = CID.parse(ipfsCid)
  if (v0.multihash.size !== 32) throw 'wrong metadata ipfs hash format'

  const strHash = buf2hex(v0.multihash.digest)
  const uint256Hash: Uint256 = {
    low: strHash.substring(0, 32),
    high: strHash.substring(32, 64),
  }

  return {
    hash: uint256Hash,
    multihashIdentifier: v0.multihash.code << 8 | v0.multihash.size
  }
}
