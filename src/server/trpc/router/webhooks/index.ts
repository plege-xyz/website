import { router } from "../../trpc";

import { get } from "./get";
import { create } from "./create";

export const webhooks = router({
  get,
  create,
});
