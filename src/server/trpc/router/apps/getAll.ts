import { publicProcedure } from "../../trpc";
import { z } from "zod";
import { Keypair, PublicKey } from "@solana/web3.js";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { getApps as getAppsQuery } from "@/hooks/getApps";
import { TRPCError } from "@trpc/server";

export const getAll = publicProcedure
  .input(
    z.object({
      session: z.string(),
    })
  )
  .mutation(async ({ ctx: { prisma }, input: { session } }) => {
    const developer = await prisma.developer.findUnique({
      where: {
        session,
      },
      select: {
        publicKey: true,
      },
    });

    if (!developer)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });

    return await getAppsQuery(new PublicKey(developer.publicKey));
  });
