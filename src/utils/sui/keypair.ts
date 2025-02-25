import {
  decodeSuiPrivateKey,
  encodeSuiPrivateKey
} from '@mysten/sui/cryptography'
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { fromHex } from '@mysten/sui/utils'

export function getKeyPair(privateKey: string) {
  if (privateKey.trim().length === 0) {
    throw new Error('please set PRIVATE_KEY')
  }

  if (privateKey.startsWith('suiprivkey')) {
    return Ed25519Keypair.fromSecretKey(
      decodeSuiPrivateKey(privateKey).secretKey
    )
  }

  return Ed25519Keypair.fromSecretKey(
    decodeSuiPrivateKey(encodeSuiPrivateKey(fromHex(privateKey), 'ED25519'))
      .secretKey
  )
}
