import { publicProcedure } from "../../trpc";
import { z } from "zod";

import { getApp } from "@/hooks/getApp";
import { TRPCError } from "@trpc/server";

export const get = publicProcedure
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

    return appPDA;
  });
