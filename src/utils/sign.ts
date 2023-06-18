import { Signature as StarknetSignature, ec, num } from 'starknet'

import { Signature } from '../types'

export async function isHashSignatureValid(hash: string, signature: Signature, publicKey: string) {
  return ec.starkCurve.verify(
    new ec.starkCurve.Signature(num.toBigInt(signature.r), num.toBigInt(signature.s)),
    hash,
    publicKey
  )
}

export function signHash(hash: string, pk: string) {
  return formatSignature(ec.starkCurve.sign(hash, pk))
}

export function formatSignature(signature: StarknetSignature) {
  return Array.isArray(signature)
    ? {
      r: signature[0],
      s: signature[0],
    }
    : {
      r: signature.r.toString(),
      s: signature.s.toString(),
    }
}
