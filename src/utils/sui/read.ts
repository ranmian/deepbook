import { SuiClient } from '@mysten/sui/client'
import type { Transaction } from '@mysten/sui/transactions'

export async function getCoinObjects(
  client: SuiClient,
  owner: string,
  coinType: string
) {
  const res = await client.getCoins({ owner, coinType })

  return res.data
}

export async function getMainCoinObject(
  client: SuiClient,
  owner: string,
  coinType: string
) {
  const objects = await getCoinObjects(client, owner, coinType)

  if (objects.length === 0) {
    return null
  }

  return objects.reduce((prev, curr) => {
    return curr.balance > prev.balance ? curr : prev
  })
}

export async function dryRun(client: SuiClient, tx: Transaction) {
  const transactionBlock = await tx.build({ client })

  const res = await client.dryRunTransactionBlock({ transactionBlock })

  console.dir(res, { depth: 10 })
}
