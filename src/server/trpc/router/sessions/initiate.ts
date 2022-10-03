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
      network: z.enum(["MAINNET", "TESTNET", "DEVNET"]).default("MAINNET"),
      recipient: z.string(),
      token: z.string(),
      amount: z.number().gt(0),
      reference: z.string().optional(),
      returnUrl: z.string().url(),
    })
  )
  .output(z.object({ id: z.string(), url: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const appId = ctx.appId;

    // check if all transfer networks are the same
    const network = input.network;

    if (!isPublicKeyValid(input.recipient)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `Invalid recipient: ${input.recipient}`,
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


    const session = await ctx.prisma.session.create({
      data: {
        appId,
        returnUrl: input.returnUrl,
        transfer: {
          create: {
            network: input.network,
            recipient: input.recipient,
            reference: input.reference,
            referencePublicKey,
            amount: input.amount,
            tokenId: token.id,
            appId,
          }
        }
      },
      select: {
        publicId: true,
      }
    })

    return {
      id: session.publicId,
      url: `${
        process.env.NODE_ENV === "production"
          ? "https://www.plege.xyz"
          : "http://localhost:3000"
      }/checkout/${session.publicId}`,
    };
  });
