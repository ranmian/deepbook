import type {
  Transaction,
  TransactionArgument,
  TransactionObjectArgument
} from '@mysten/sui/transactions'
import { DEEPBOOK_V3_PACKAGE } from './config'

export function deepbook_v3_deposit(
  tx: Transaction,
  balanceManager: string,
  coin: TransactionArgument,
  coinType: string
) {
  tx.moveCall({
    target: `${DEEPBOOK_V3_PACKAGE}::balance_manager::deposit`,
    arguments: [tx.object(balanceManager), coin],
    typeArguments: [coinType]
  })
}

export function deepbook_v3_withdraw(
  tx: Transaction,
  balanceManager: string,
  amount: string | number,
  coinType: string
) {
  return tx.moveCall({
    target: `${DEEPBOOK_V3_PACKAGE}::balance_manager::withdraw`,
    arguments: [tx.object(balanceManager), tx.pure.u64(amount)],
    typeArguments: [coinType]
  })
}
