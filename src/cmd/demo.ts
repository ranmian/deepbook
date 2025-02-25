import { DeepBookClient } from "@mysten/deepbook-v3"
import { SUI_CLIENT_MAINNET } from "../utils/sui/client"

async function run() {
  const dbClient = new DeepBookClient({
    address: "0x5239ca59ef9048df1783f847316a70d14e2bae7de4f4162c3f87a5f95eb8921e",
    env: "mainnet",
    client: SUI_CLIENT_MAINNET,
  })

  console.time()
  let res = await dbClient.getLevel2Range(
    "NS_SUI",
    0.01,
    0.1,
    true,
  );
  console.timeEnd()
}

run().catch(error => console.log(error))