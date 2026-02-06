// src/index.ts

import { simulateTx } from "./simulator";
import { formatResult } from "./formatter";

/**
 * Entry point for the transaction simulator.
 * This file intentionally contains minimal logic and no domain rules.
 */
async function main() {
  console.log("Starting Somnia transaction simulator...");

  /**
   * Example transaction payload.
   * In a real setup, this would come from a CLI, API, or config.
   */
  const tx = {
    to: "0x0000000000000000000000000000000000000000",
    data: "0x",
    value: 0n,
  };

  const result = await simulateTx(tx);

  const output = formatResult(result, { verbose: true });
  console.log(output);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
