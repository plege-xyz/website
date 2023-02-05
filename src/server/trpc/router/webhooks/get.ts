import { publicProcedure } from "../../trpc";
import { z } from "zod";

export const get = publicProcedure
  .input(
    z.object({
      app: z.string(),
    })
  )
  .mutation(async ({ ctx: { prisma }, input: { app } }) => {
    const webhooks = await prisma.app.findUnique({
      where: {
        publicKey: app,
      },
      select: {
        webhook: {
          select: {
            url: true,
          },
        },
      },
    });

    return webhooks?.webhook ? webhooks.webhook : [];
  });
