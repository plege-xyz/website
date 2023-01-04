import { default as P } from "plege";
import type { AnchorWallet } from "@solana/wallet-adapter-react";

export const Plege = (wallet: AnchorWallet) => {
  return new P({
    env: "devnet",
    wallet,
  });
};
