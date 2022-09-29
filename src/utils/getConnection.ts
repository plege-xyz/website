import { Connection, clusterApiUrl } from "@solana/web3.js";

export const getConnection = (network: "MAINNET" | "TESTNET" | "DEVNET") => {
  if (network === "TESTNET") {
    return new Connection(clusterApiUrl("testnet"), "confirmed");
  } else if (network === "DEVNET") {
    return new Connection(
      "https://hidden-sleek-haze.solana-devnet.discover.quiknode.pro/3e85aefa088db554d67f6e632694dcc10f320b58/"
    );
  }

  return new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
};
