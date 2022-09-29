import { t } from "../../trpc";
import { z } from "zod";

export const create = t.procedure
  .meta({
    openapi: {
      enabled: true,
      method: "POST",
      path: "/sessions/create",
    },
  })
  .input(z.object({}))
  .output(z.string())
  .mutation(async ({ input, ctx }) => {
    return "1";
  });
