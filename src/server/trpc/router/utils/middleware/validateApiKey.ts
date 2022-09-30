import { t } from "@/server/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const validateApiKey = t.middleware(async ({ rawInput, ctx, next }) => {
  const apiKeySchema = z.object({
    apiKey: z.string(),
  });

  const res = apiKeySchema.safeParse(rawInput);

  if (!res.success) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid API key",
    });
  }

  const { apiKey } = res.data;

  const app = await ctx.prisma.app.findUnique({
    where: {
      apiKey,
    },
    select: {
      id: true,
    },
  });

  if (!app) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid API key",
    });
  }

  return next({
    ctx: {
      ...ctx,
      appId: app.id,
    },
  });
});
