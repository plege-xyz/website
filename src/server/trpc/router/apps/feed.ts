import { publicProcedure } from "../../trpc";
import { z } from "zod";

import { getApp } from "@/hooks/getApp";
import { TRPCError } from "@trpc/server";
import { getTiers } from "@/hooks/getTiers";
import { getSubscriptions } from "@/hooks/getSubscriptions";

import plege from "@plege/subscriptions";
import { Keypair, PublicKey } from "@solana/web3.js";
import { getProgram } from "@/hooks/getProgram";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

export const feed = publicProcedure
  .input(
    z.object({
      session: z.string(),
      app: z.string(),
    })
  )
  .mutation(async ({ ctx: { prisma }, input: { session, app } }) => {
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

    const appPDA = await getApp(app);

    if (!appPDA)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid app",
      });

    if (appPDA.auth.toBase58() !== developer.publicKey)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });

    const program = getProgram(new NodeWallet(Keypair.generate()));

    const tiers = await program.account.tier.all([
      { memcmp: { offset: 8, bytes: app } },
    ]);

    const subscriptions = await program.account.subscription.all([
      { memcmp: { offset: 8, bytes: app } },
    ]);

    return {
      tiers: tiers.map((tier) => ({
        ...tier,
        account: {
          ...tier.account,
          price: tier.account.price.toNumber(),
        },
      })),
      subscriptions,
    };
  });
