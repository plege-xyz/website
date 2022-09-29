import { getMint } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { TRPCError } from "@trpc/server";

export const getToken = async (mint: string, connection: Connection) => {
  try {
    const splToken = await getMint(connection, new PublicKey(mint));
    if (!splToken.isInitialized) throw new Error();
    return {
      decimals: splToken.decimals,
    };
  } catch (e) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Invalid mint`,
    });
  }
};
