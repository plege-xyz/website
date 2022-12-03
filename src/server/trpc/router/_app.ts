import { router } from "../trpc";

import { users } from "./users";
import { apps } from "./apps";
import { tiers } from "./tiers";

export const appRouter = router({
  users,
  apps,
  tiers,
});

// export type definition of API
export type AppRouter = typeof appRouter;
