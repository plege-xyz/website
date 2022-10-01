import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../../trpc";

import { initiate } from "./initiate";
import { get } from "./get";
import { create } from "./create";
import { settle } from "./settle";

export const sessions = t.router({
  initiate,
  get,
  create,
  settle,
});
