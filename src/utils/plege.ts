import { default as P } from "../../../plege_xyz/sdk";
import type { AnchorWallet } from "@solana/wallet-adapter-react";

export const Plege = (wallet: AnchorWallet) => {
  return new P({
    env: "devnet",
    wallet,
  });
};
