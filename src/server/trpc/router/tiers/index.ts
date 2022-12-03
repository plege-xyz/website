import { router } from "../../trpc";

import { get } from "./get";
export const tiers = router({
  get,
});
