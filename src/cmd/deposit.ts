import { Transaction } from '@mysten/sui/transactions'
import { PRIVATE_KEY } from '../config/wallet'
import { getKeyPair } from '../utils/sui/keypair'
import { COIN } from '../config/coin'
import type { CoinInfo } from '../types/coin'
import { deepbook_v3_deposit } from '../libs/deepbookv3/balance'
import { CETUS_BALANCE_MANAGER } from '../libs/deepbookv3/config'
import { getSuiClient, NETWORK_MAINET } from '../utils/sui/client'
import { dryRun, getCoinObjects } from '../utils/sui/read'
import { executeTx } from '../utils/sui/write'

const keypair = getKeyPair(PRIVATE_KEY)
const sender = keypair.toSuiAddress()
console.log('sender:', sender)

async function deposit(coinInfo: CoinInfo, coinAmount: number) {
  const client = getSuiClient(NETWORK_MAINET)
  const tx = new Transaction()
  tx.setSenderIfNotSet(sender)

  const objects = await getCoinObjects(client, sender, coinInfo.type)
  if (objects.length === 0) {
    throw new Error(`${coinInfo.name} object not found`)
  }
  const objectId = objects[0].coinObjectId
  if (objects.length > 1) {
    tx.mergeCoins(
      tx.object(objectId),
      objects.slice(1).map((item) => item.coinObjectId)
    )
  }

  const depositAmount = coinAmount * Math.pow(10, coinInfo.decimals)

  const depositCoin = tx.splitCoins(tx.object(objectId), [
    tx.pure.u64(depositAmount)
  ])

  deepbook_v3_deposit(tx, CETUS_BALANCE_MANAGER, depositCoin, coinInfo.type)

  console.time()
  // await dryRun(client, tx )
  await executeTx(client, tx, keypair)
  console.timeEnd()
}

async function run() {
  await deposit(COIN.DEEP, 5000)
}

run().catch(console.log)
