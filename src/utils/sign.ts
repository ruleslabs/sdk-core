import { ec, num } from 'starknet'

import { Signature } from '../types'

export async function isHashSignatureValid(hash: string, signature: Signature, publicKey: string) {
  return ec.starkCurve.verify(
    new ec.starkCurve.Signature(num.toBigInt(signature.r), num.toBigInt(signature.s)),
    hash,
    publicKey
  )
}
