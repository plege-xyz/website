import { publicProcedure } from "../../trpc";
import { z } from "zod";

import { getApp } from "@/hooks/getApp";
import { TRPCError } from "@trpc/server";
import { getTiers } from "@/hooks/getTiers";
import { getSubscriptions } from "@/hooks/getSubscriptions";

import plege from "@plege/subscriptions";
import { PublicKey } from "@solana/web3.js";

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

    const tiers = await plege.app.get.tiers
      .all(new PublicKey(appPDA))
      .then((tiers) => {
        return tiers.map((tier) => ({
          publicKey: tier.publicKey.toBase58(),
          name: tier.account.name,
        }));
      })
      .catch((err) => {
        console.log(err);
        return [];
      });

    const subscriptions = await plege.app.get.subscriptions
      .all(new PublicKey(appPDA))
      .then((subscriptions) => {
        return subscriptions.map((subscription) => ({
          publicKey: subscription.publicKey.toBase58(),
          tier: subscription.account.tier.toBase58(),
          user: subscription.account.subscriber.toBase58(),
          price: subscription.account.price,
        }));
      });

    console.log(tiers, subscriptions);

    return {
      tiers,
      subscriptions,
    };
  });
