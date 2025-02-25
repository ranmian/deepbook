import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'

export const NETWORK_MAINET = getFullnodeUrl("mainnet")
export const NETWORK_LOCAL = "http://127.0.0.1:9000"

export const SUI_CLIENT_MAINNET = getSuiClient(NETWORK_MAINET)
export const SUI_CLIENT_LOCAL = getSuiClient(NETWORK_LOCAL)


export function getSuiClient(url: string) {
  return new SuiClient({url})
}
