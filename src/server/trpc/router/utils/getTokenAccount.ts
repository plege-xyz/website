import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

export const getTokenAccount = (
  publicKey: string,
  mint: string,
  connection: Connection
) => {
  try {
    return getAssociatedTokenAddressSync(
      new PublicKey(mint),
      new PublicKey(publicKey)
    );
  } catch {
    return undefined;
  }
};
