// src/formatter.ts

import { SimulationError } from "./errors";

export type SimulationResult =
  | {
      success: true;
      gasUsed?: bigint;
      returnData?: string;
    }
  | {
      success: false;
      error: SimulationError;
    };

export interface FormatOptions {
  verbose?: boolean;
}

/**
 * Format simulation result into a human-readable output.
 * This layer intentionally contains no business logic.
 */
export function formatResult(
  result: SimulationResult,
  options: FormatOptions = {}
): string {
  if (result.success) {
    return formatSuccess(result, options);
  }

  return formatFailure(result.error, options);
}

function formatSuccess(
  result: Extract<SimulationResult, { success: true }>,
  options: FormatOptions
): string {
  const lines: string[] = [];

  lines.push("Simulation: SUCCESS");

  if (result.gasUsed !== undefined) {
    lines.push(`Gas used: ${result.gasUsed.toString()}`);
  }

  if (options.verbose && result.returnData) {
    lines.push("Return data:");
    lines.push(result.returnData);
  }

  return lines.join("\n");
}

function formatFailure(
  error: SimulationError,
  options: FormatOptions
): string {
  const lines: string[] = [];

  lines.push("Simulation: FAILED");

  switch (error.type) {
    case "REVERT":
      lines.push(`Reason: ${error.reason}`);
      break;

    case "PANIC":
      lines.push(`Panic code: ${error.code}`);
      lines.push(`Description: ${error.description}`);
      b
