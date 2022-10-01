import { t } from "../../trpc";
import { z } from "zod";
import { validateApiKey } from "../utils/middleware/validateApiKey";
import { TRPCError } from "@trpc/server";
import { isPublicKeyValid } from "../utils/isPublicKeyValid";
import { Keypair } from "@solana/web3.js";

export const initiate = t.procedure
  .meta({
    openapi: {
      enabled: true,
      method: "POST",
      path: "/sessions/initiate",
    },
  })
  .use(validateApiKey)
  .input(
    z.object({
      transfers: z
        .object({
          network: z.enum(["MAINNET", "TESTNET", "DEVNET"]).default("MAINNET"),
          recipient: z.string(),
          token: z.string(),
          amount: z.number().gt(0),
          reference: z.string().optional(),
        })
        .array()
        .min(1),
      returnUrl: z.string().url(),
    })
  )
  .output(z.object({ id: z.string(), url: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const appId = ctx.appId;

    // check if all transfer networks are the same
    const network = input.transfers[0]!.network;
    if (input.transfers.some((transfer) => transfer.network !== network)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "All transfers must be on the same network",
      });
    }

    const transferIds: number[] = [];

    for await (const transfer of input.transfers) {
      if (!isPublicKeyValid(transfer.recipient)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid recipient: ${transfer.recipient}`,
        });
      }

      const token = await ctx.prisma.token.findUnique({
        where: {
          symbol: transfer.token,
        },
        select: {
          id: true,
        },
      });

      if (!token) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid token",
        });
      }

      const referencePublicKey = Keypair.generate().publicKey.toString();

      const _transfer = await ctx.prisma.transfer.create({
        data: {
          network: transfer.network,
          recipient: transfer.recipient,
          reference: transfer.reference,
          amount: transfer.amount,
          tokenId: token.id,
          appId: appId,
          referencePublicKey,
        },
        select: {
          id: true,
        },
      });

      transferIds.push(_transfer.id);
    }

    console.log(transferIds);

    const session = await ctx.prisma.session.create({
      data: {
        appId,
        returnUrl: input.returnUrl,
        transfers: {
          connect: transferIds.map((id) => ({ id })),
        },
      },
      include: {
        transfers: {
          select: {
            id: true,
          },
        },
      },
    });

    console.log(session);

    return {
      id: session.publicId,
      url: `${
        process.env.NODE_ENV === "production"
          ? "https://www.plege.xyz"
          : "http://localhost:3000"
      }/checkout/${session.publicId}`,
    };
  });
