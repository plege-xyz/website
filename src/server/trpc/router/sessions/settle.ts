import { t } from "../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getConnection } from "@/utils/getConnection";
import { Transaction } from "@solana/web3.js";

export const settle = t.procedure
  .input(
    z.object({
      id: z.string(),
      transaction: z.string(),
      payer: z.string(),
    })
  )
  .output(z.any())
  .mutation(async ({ input, ctx }) => {
    const session = await ctx.prisma.session.findUnique({
      where: {
        publicId: input.id,
      },
      select: {
        appId: true,
        transfer: {
          select: {
            network: true,
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

    try {
      const connection = getConnection(session.transfer!.network);
      const transaction = await connection.sendRawTransaction(
        Buffer.from(input.transaction, "base64")
      );

      const user = await ctx.prisma.user.upsert({
        where: {
          publicKey: input.payer,
        },
        create: {
          publicKey: input.payer,
        },
        update: {},
        select: {
          id: true,
        },
      });

      await ctx.prisma.session.update({
        where: {
          publicId: input.id,
        },
        data: {
          transfer: {
            update: {
              payer: input.payer,
              user: {
                connect: {
                  id: user.id,
                },
              },
              transaction: {
                create: {
                  network: session.transfer!.network,
                  hash: transaction,
                  app: {
                    connect: {
                      id: session.appId,
                    },
                  },
                  user: {
                    connect: {
                      id: user.id,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return {
        hash: transaction,
      };
    } catch (err) {
      console.log(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while sending the transaction",
      });
    }
  });
