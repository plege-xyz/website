import { t } from "../../trpc";
import { z } from "zod";
import { validateApiKey } from "../utils/middleware/validateApiKey";
import { TRPCError } from "@trpc/server";

export const get = t.procedure
  .meta({
    openapi: {
      enabled: true,
      method: "GET",
      path: "/sessions/{id}",
    },
  })
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(z.any())
  .mutation(async ({ input, ctx }) => {
    const session = await ctx.prisma.session.findUnique({
      where: {
        publicId: input.id,
      },
      select: {
        returnUrl: true,
        transfers: {
          select: {
            amount: true,
            token: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!session) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Session not found",
      });
    }

    return session;
  });
