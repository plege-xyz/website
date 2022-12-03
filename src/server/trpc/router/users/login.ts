import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import cuid from "cuid";
import { TRPCError } from "@trpc/server";

export const login = publicProcedure
  .input(
    z.object({
      publicKey: z.string(),
      pda: z.string().optional(),
    })
  )
  .mutation(async ({ ctx: { prisma }, input: { publicKey, pda } }) => {
    const user = await prisma.developer.findUnique({
      where: {
        publicKey,
      },
    });

    const session = cuid();
    // expires in 15 minutes
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    if (!user) {
      await prisma.developer.create({
        data: {
          publicKey,
          session,
          sessionExpiry: expiry,
          pda,
        },
      });
    } else {
      await prisma.developer.update({
        where: {
          publicKey,
        },
        data: {
          session,
          sessionExpiry: expiry,
          pda,
        },
      });
    }

    return {
      session,
      expiry: expiry.getTime(),
      pda: user?.pda || pda,
    };
  });
