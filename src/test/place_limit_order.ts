import { Transaction } from '@mysten/sui/transactions'
import { PRIVATE_KEY } from '../config/wallet'
import { getSuiClient, OFFICIAL_MAINET } from '../utils/sui/client'
import { getKeyPair } from '../utils/sui/keypair'
import { deepbook_v3_place_limit_order } from '../libs/deepbookv3/order'
import {
  CETUS_BALANCE_MANAGER,
  DEEPBOOK_V3_POOLS
} from '../libs/deepbookv3/config'
import { dryRun } from '../utils/sui/read'
import { executeTx } from '../utils/sui/write'
import type { DeepBookPool } from '../types/pool'

const keypair = getKeyPair(PRIVATE_KEY)
const sender = keypair.toSuiAddress()
console.log('sender:', sender)

async function place_limit_order(
  pool: DeepBookPool,
  balanceManager: string,
  price: number,
  amount: number,
  buyOrSell: boolean
) {
  const client = getSuiClient(OFFICIAL_MAINET)
  const tx = new Transaction()
  tx.setSender(sender)

  deepbook_v3_place_limit_order(
    tx,
    pool,
    balanceManager,
    price,
    amount,
    buyOrSell
  )

  //   await dryRun(client, tx)
  await executeTx(client, tx, keypair)
}

async function buy(
  pool: DeepBookPool,
  balanceManager: string,
  price: number,
  amount: number
) {
  await place_limit_order(pool, balanceManager, price, amount, true)
}

async function sell(
  pool: DeepBookPool,
  balanceManager: string,
  price: number,
  amount: number
) {
  await place_limit_order(pool, balanceManager, price, amount, false)
}

async function buy_and_sell(
  pool: DeepBookPool,
  balanceManager: string,
  buyPrice: number,
  sellPrice: number,
  amount: number
) {
  if (sellPrice <= buyPrice) {
    throw new Error('sell price must higher than buy price')
  }

  const client = getSuiClient(OFFICIAL_MAINET)
  const tx = new Transaction()
  tx.setSender(sender)

  deepbook_v3_place_limit_order(
    tx,
    pool,
    balanceManager,
    buyPrice,
    amount,
    true
  )
  deepbook_v3_place_limit_order(
    tx,
    pool,
    balanceManager,
    sellPrice,
    amount,
    false
  )

  //   await dryRun(client, tx)
  await executeTx(client, tx, keypair)
}

async function run() {
    // await buy(
    //   DEEPBOOK_V3_POOLS.DEEP_SUI,
    //   CETUS_BALANCE_MANAGER,
    //   0.03221,
    //   1000_000_000
    // )
    // await buy(
    //   DEEPBOOK_V3_POOLS.DEEP_SUI,
    //   CETUS_BALANCE_MANAGER,
    //   0.03290,
    //   1_000_000_000
    // )
    // await buy(
    //   DEEPBOOK_V3_POOLS.DEEP_SUI,
    //   CETUS_BALANCE_MANAGER,
    //   0.03090,
    //   1_000_000_000
    // )
    // await buy(
    //   DEEPBOOK_V3_POOLS.DEEP_SUI,
    //   CETUS_BALANCE_MANAGER,
    //   0.03500,
    //   1_000_000_000
    // )
    // await buy(
    //   DEEPBOOK_V3_POOLS.DEEP_SUI,
    //   CETUS_BALANCE_MANAGER,
    //   0.03734,
    //   1_000_000_000
    // )
    // await buy(
    //   DEEPBOOK_V3_POOLS.DEEP_SUI,
    //   CETUS_BALANCE_MANAGER,
    //   0.03674,
    //   1_000_000_000
    // )
  // await buy_and_sell(
  //   DEEPBOOK_V3_POOLS.DEEP_SUI,
  //   CETUS_BALANCE_MANAGER,
  //   0.03479,
  //   0.03596,
  //   2000_000_000
  // )
  await sell(
      DEEPBOOK_V3_POOLS.DEEP_SUI,
      CETUS_BALANCE_MANAGER,
      0.03495,
      2000_000_000
    )
}

run().catch(console.log)
