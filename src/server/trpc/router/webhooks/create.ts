import { publicProcedure } from "../../trpc";
import { z } from "zod";

const create = publicProcedure.input(
  z.object({
    publicKey: z.string(),
    app: z.string(),
    url: z.string(),
  })
);
