import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'

export const OFFICIAL_MAINET = getFullnodeUrl("mainnet")

export const SUI_CLIENT_MAINNET = getSuiClient(OFFICIAL_MAINET)

export function getSuiClient(url: string) {
  return new SuiClient({url})
}
