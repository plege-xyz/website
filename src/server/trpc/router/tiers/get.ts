import { publicProcedure } from "../../trpc";
import { z } from "zod";

import { getApp } from "@/hooks/getApp";
import { TRPCError } from "@trpc/server";
import { getTier } from "@/hooks/getTier";

export const get = publicProcedure
  .input(
    z.object({
      tier: z.string(),
    })
  )
  .mutation(async ({ ctx: { prisma }, input: { tier } }) => {
    try {
      return getTier(tier);
    } catch {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tier not found",
      });
    }
  });
