import { SUI_DECIMALS, SUI_TYPE_ARG } from '@mysten/sui/utils'
import type { CoinInfo } from '../types/coin'

export const COIN: Record<string, CoinInfo> = {
  SUI: {
    name: 'SUI',
    type: SUI_TYPE_ARG,
    decimals: SUI_DECIMALS
  },
  DEEP: {
    name: 'DEEP',
    type: '0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP',
    decimals: 6
  },
  USDC: {
    name: 'USDC',
    type: '0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC',
    decimals: 6
  },
  WUSDC: {
    name: 'WUSDC',
    type: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',
    decimals: 6
  }
}
