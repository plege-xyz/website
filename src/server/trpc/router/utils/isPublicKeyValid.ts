import { PublicKey } from "@solana/web3.js";
import { TRPCError } from "@trpc/server";

export const isPublicKeyValid = (publicKey: string) => {
  try {
    if (!PublicKey.isOnCurve(new PublicKey(publicKey))) return false;
    return true;
  } catch {
    return false;
  }
};
