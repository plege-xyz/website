import { Connection, clusterApiUrl } from "@solana/web3.js";

export const getConnection = (network: "MAINNET" | "TESTNET" | "DEVNET") => {
  if (network === "TESTNET") {
    return new Connection(clusterApiUrl("testnet"), "confirmed");
  } else if (network === "DEVNET") {
    return new Connection(clusterApiUrl("devnet"), "confirmed");
  }

  return new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
};
