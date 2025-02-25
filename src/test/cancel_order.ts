import { Transaction } from '@mysten/sui/transactions'
import { PRIVATE_KEY } from '../config/wallet'
import { getSuiClient, OFFICIAL_MAINET } from '../utils/sui/client'
import { getKeyPair } from '../utils/sui/keypair'
import { deepbook_v3_cancel_order } from '../libs/deepbookv3/order'
import {
  CETUS_BALANCE_MANAGER,
  DEEPBOOK_V3_POOLS
} from '../libs/deepbookv3/config'
import { dryRun } from '../utils/sui/read'
import { executeTx } from '../utils/sui/write'

const keypair = getKeyPair(PRIVATE_KEY)
const sender = keypair.toSuiAddress()
console.log('sender:', sender)

async function cancel_order(orderId: string) {
  const client = getSuiClient(OFFICIAL_MAINET)
  const tx = new Transaction()
  tx.setSender(sender)

  deepbook_v3_cancel_order(
    tx,
    DEEPBOOK_V3_POOLS.DEEP_SUI,
    CETUS_BALANCE_MANAGER,
    orderId
  )

  // await dryRun(client, tx)
  await executeTx(client, tx, keypair)
}

async function run() {
  await cancel_order('170141184075668146589900850109484436343')
}

run().catch(console.log)
