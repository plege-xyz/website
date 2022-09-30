import { t } from "../../../trpc";
import { z } from "zod";
import { validateApiKey } from "../../utils/middleware/validateApiKey";
import { TRPCError } from "@trpc/server";
import { isPublicKeyValid } from "../../utils/isPublicKeyValid";
import { Keypair } from "@solana/web3.js";

export const create = t.procedure
  .meta({
    openapi: {
      enabled: true,
      method: "POST",
      path: "/sessions/create",
    },
  })
  .use(validateApiKey)
  .input(
    z.object({
      network: z.enum(["MAINNET", "TESTNET", "DEVNET"]).default("MAINNET"),
      recipient: z.string(),
      token: z.string(),
      amount: z.number().gt(0),
      reference: z.string().optional(),
      returnUrl: z.string().url(),
    })
  )
  .output(z.object({ url: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const appId = ctx.appId;

    if (!isPublicKeyValid(input.recipient)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid recipient",
      });
    }

    const token = await ctx.prisma.token.findUnique({
      where: {
        symbol: input.token,
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

    const transfer = await ctx.prisma.transfer.create({
      data: {
        network: input.network,
        recipient: input.recipient,
        reference: input.reference,
        amount: input.amount,
        tokenId: token.id,
        appId: appId,
        referencePublicKey,
      },
      select: {
        id: true,
      },
    });

    const session = await ctx.prisma.session.create({
      data: {
        appId,
        returnUrl: input.returnUrl,
        transfers: {
          connect: {
            id: transfer.id,
          },
        },
      },
      select: {
        publicId: true,
      },
    });

    return {
      url: `${
        process.env.NODE_ENV === "production"
          ? "https://www.plege.xyz"
          : "http://localhost:3000"
      }/checkout/${session.publicId}`,
    };
  });
