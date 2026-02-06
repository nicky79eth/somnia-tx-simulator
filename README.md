# Somnia Transaction Simulator

A pre-flight transaction simulation tool for the Somnia network.

This project focuses on evaluating transaction behavior before submission,
helping developers identify potential reverts, gas issues, or unexpected
state interactions.

## Motivation

Transaction failures are costly for both users and developers.
Pre-flight simulation provides early feedback and improves reliability
across applications and tooling.

## What this tool does

- Simulates transactions using eth_call
- Detects potential reverts and error reasons
- Estimates gas usage and fee impact
- Produces structured, human-readable output

No transactions are broadcast to the network.

## Architecture

- `simulator`  
  Executes dry-run transaction calls.

- `estimator`  
  Derives gas usage and fee projections.

- `errors`  
  Handles revert reason extraction and decoding.

- `formatter`  
  Normalizes output for logs or CLI usage.

- `index`  
  Execution entry point.

## Tech stack

- TypeScript
- Node.js
- viem
- Somnia RPC

## Usage

```bash
npm install
npm run dev
