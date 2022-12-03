import { router } from "../../trpc";

import { getAll } from "./getAll";
import { get } from "./get";
import { getTiers } from "./getTiers";
export const apps = router({
  getAll,
  get,
  getTiers,
});
