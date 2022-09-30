import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { t } from "../../trpc";

import { create } from "./create";
import { get } from "./get";

export const sessions = t.router({
  create,
  get,
});
