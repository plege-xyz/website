import { router } from "../../trpc";

import { getAll } from "./getAll";
import { get } from "./get";
import { getTiers } from "./getTiers";
import { feed } from "./feed";

export const apps = router({
  getAll,
  get,
  getTiers,
  feed,
});
