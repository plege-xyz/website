import { router } from "../trpc";

import { users } from "./users";

export const appRouter = router({
  users,
});

// export type definition of API
export type AppRouter = typeof appRouter;
