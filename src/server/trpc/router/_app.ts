import { router } from "../trpc";
import { webhooks } from "./webhooks";

export const appRouter = router({
  webhooks,
});

// export type definition of API
export type AppRouter = typeof appRouter;
