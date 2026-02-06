// src/errors.ts

export type SimulationError =
  | {
      type: "REVERT";
      reason: string;
    }
  | {
      type: "PANIC";
      code: string;
      description: string;
    }
  | {
      type: "RPC_ERROR";
      message: string;
    }
  | {
      type: "UNKNOWN";
      raw: unknown;
    };

/**
 * Normalize errors thrown by eth_call / simulation.
 * The goal is to surface meaningful failure reasons instead of opaque RPC errors.
 */
export function parseSimulationError(err: any): SimulationError {
  // viem / ethers style revert reason
  const reason =
    err?.cause?.reason ??
    err?.reason ??
    err?.message;

  if (typeof reason === "string") {
    // Solidity panic codes (0x01, 0x11, ...)
    if (reason.startsWith("Panic(")) {
      const code = reason.match(/\((0x[0-9a-fA-F]+)\)/)?.[1] ?? "unknown";
      return {
        type: "PANIC",
        code,
        description: describePanic(code),
      };
    }

    return {
      type: "REVERT",
      reason,
    };
  }

  if (err?.code) {
    return {
      type: "RPC_ERROR",
      message: String(err.code),
    };
  }

  return {
    type: "UNKNOWN",
    raw: err,
  };
}

/**
 * Map Solidity panic codes to human-readable descriptions.
 * Reference: https://docs.soliditylang.org/en/latest/control-structures.html#panic-via-assert-and-error-via-require
 */
function describePanic(code: string): string {
  switch (code) {
    case "0x01":
      return "Assertion violated";
    case "0x11":
      return "Arithmetic overflow or underflow";
    case "0x12":
      return "Division by zero";
    case "0x21":
      return "Invalid enum value";
    case "0x22":
      return "Storage byte array incorrectly encoded";
    case "0x31":
      retu
