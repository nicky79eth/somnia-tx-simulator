```ts
import { client } from "./client";

export async function simulateTx(tx: any) {
  try {
    const result = await client.call(tx);
    return { success: true, result };
  } catch (err: any) {
    return {
      success: false,
      reason: err?.cause?.reason ?? "Unknown revert",
    };
  }
}
