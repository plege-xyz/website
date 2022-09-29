import { t } from "../../trpc";

import { create } from "./create";

export const sessions = t.router({
  create,
});
