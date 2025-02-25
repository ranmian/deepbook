import type { Keypair } from '@mysten/sui/cryptography'
import type { Transaction } from '@mysten/sui/transactions'
import type { SuiClient } from '@mysten/sui/client'

export async function executeTx(
  client: SuiClient,
  tx: Transaction,
  signer: Keypair
) {
  tx.setGasPrice(750)
  tx.setGasBudget(100_000_000)

  const { bytes, signature } = await tx.sign({
    client,
    signer
  })

  const res = await client.executeTransactionBlock({
    transactionBlock: bytes,
    signature,
    requestType: 'WaitForEffectsCert'
  })

  console.log('digest:', res.digest)
}
