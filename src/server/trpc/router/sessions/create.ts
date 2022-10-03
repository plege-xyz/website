import { t } from "../../trpc";
import { z } from "zod";
import { validateApiKey } from "../utils/middleware/validateApiKey";
import { TRPCError } from "@trpc/server";
import { isPublicKeyValid } from "../utils/isPublicKeyValid";
import { splTokenTransfer } from "../utils/splTokenTransfer";

export const create = t.procedure
  .meta({
    openapi: {
      enabled: true,
      method: "POST",
      path: "/sessions/create",
    },
  })
  .input(
    z.object({
      id: z.string(),
      payer: z.string(),
    })
  )
  .output(
    z.object({
      transaction: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    if (!isPublicKeyValid(input.payer)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid payer",
      });
    }

    const session = await ctx.prisma.session.findUnique({
      where: {
        publicId: input.id,
      },
      select: {
        returnUrl: true,
        transfer: {
          select: {
            network: true,
            recipient: true,
            referencePublicKey: true,
            amount: true,
            token: {
              select: {
                mint: true,
                decimals: true,
              },
            },
            transactionId: true,
          },
        },
      },
    });

    if (!session) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Session not found",
      });
    }

    if (session?.transfer?.transactionId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Transfer already completed",
      });
    }

    const tx = await splTokenTransfer({
      payer: input.payer,
      transfers: [session.transfer!],
    });

    return {
      transaction: tx,
    };
  });
