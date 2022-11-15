import { router } from "../../trpc";

import { login } from "./login";

export const users = router({
  login,
});
