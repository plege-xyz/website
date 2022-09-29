// src/server/router/index.ts
import { t } from "../trpc";

import { sessions } from "../router/sessions";

export const appRouter = t.router({
  sessions,
});

// export type definition of API
export type AppRouter = typeof appRouter;
