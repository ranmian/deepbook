import { COIN } from '../../config/coin'
import type { DeepBookPool } from '../../types/pool'

export const DEEPBOOK_V3_PACKAGE =
  '0x2c8d603bc51326b8c13cef9dd07031a408a48dddb541963357661df5d3204809'

export const DEEPBOOK_V3_CETUS_PACKAGE =
  '0x624a80998bfca8118a794c71cccca771c351158eecd425661e07056f4ed94683'

export const CETUS_GLOBAL_CONFIG =
  '0xff1141ef80e7baf206c7930c274b465600e64884d8167f90d4cdb60197925163'

export const CETUS_BALANCE_MANAGER_INDEXER =
  '0x5c1a039f97ed1cbd84d54b5d633bdffd681086acc38961b1d366c4ecf680d150'

export const DEEPBOOK_V3_POOL_DEEP_SUI =
  '0xb663828d6217467c8a1838a03793da896cbe745b150ebd57d82f814ca579fc22'

export const CETUS_BALANCE_MANAGER =
  '0x87759d171af57ef59d5953fa02280450b7a8a152c49a4df705f9a7f6a3523977'

export const DEEPBOOK_V3_POOLS: Record<string, DeepBookPool> = {
  DEEP_SUI: {
    id: '0xb663828d6217467c8a1838a03793da896cbe745b150ebd57d82f814ca579fc22',
    baseCoin: COIN.DEEP.type,
    quoteCoin: COIN.SUI.type
  }
}
