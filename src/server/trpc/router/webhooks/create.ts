import { publicProcedure } from "../../trpc";
import { z } from "zod";

export const create = publicProcedure
  .input(
    z.object({
      publicKey: z.string(),
      app: z.string(),
      url: z.string(),
    })
  )
  .mutation(async ({ ctx: { prisma }, input: { app, url } }) => {
    await prisma.webhook.create({
      data: {
        url: url,
        app: {
          connect: {
            publicKey: app,
          },
        },
      },
    });
  });
