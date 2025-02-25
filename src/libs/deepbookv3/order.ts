import type { Transaction } from '@mysten/sui/transactions'
import {
  CETUS_BALANCE_MANAGER_INDEXER,
  CETUS_GLOBAL_CONFIG,
  DEEPBOOK_V3_CETUS_PACKAGE,
  DEEPBOOK_V3_POOL_DEEP_SUI
} from './config'
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'
import type { DeepBookPool } from '../../types/pool'
import Decimal from 'decimal.js'
import BN from "bn.js"

export function deepbook_v3_place_limit_order(
  tx: Transaction,
  pool: DeepBookPool,
  balanceManager: string,
  price: string | number,
  amount: number,
  isBid: boolean
) {
  const priceArg = new Decimal(price)
    .mul(1_000_000_000_000)
    .toFixed(0)
    .toString()

  tx.moveCall({
    target: `${DEEPBOOK_V3_CETUS_PACKAGE}::deepbookv3_utils::place_limit_order`,
    arguments: [
      tx.object(CETUS_GLOBAL_CONFIG),
      tx.object(CETUS_BALANCE_MANAGER_INDEXER),
      tx.object(pool.id),
      tx.object(balanceManager),
      tx.pure.u8(0),
      tx.pure.u8(0),
      tx.pure.u64(priceArg),
      tx.pure.u64(amount),
      tx.pure.bool(isBid),
      tx.pure.bool(true),
      tx.pure.u64(4883138386850),
      tx.object(SUI_CLOCK_OBJECT_ID)
    ],
    typeArguments: [pool.baseCoin, pool.quoteCoin]
  })
}

export function deepbook_v3_cancel_order(
  tx: Transaction,
  pool: DeepBookPool,
  balanceManager: string,
  orderId: string
) {
  tx.moveCall({
    target: `${DEEPBOOK_V3_CETUS_PACKAGE}::deepbookv3_utils::cancel_order`,
    arguments: [
      tx.object(CETUS_GLOBAL_CONFIG),
      tx.object(balanceManager),
      tx.object(pool.id),
      tx.pure.u128(orderId),
      tx.object(SUI_CLOCK_OBJECT_ID)
    ],
    typeArguments: [pool.baseCoin, pool.quoteCoin]
  })
}
