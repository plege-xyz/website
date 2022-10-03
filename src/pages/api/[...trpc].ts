// src/pages/api/trpc/[trpc].ts
import { createOpenApiNextHandler } from "trpc-openapi";
import { appRouter } from "../../server/trpc/router";
import { createContext } from "../../server/trpc/context";
import { NextApiRequest, NextApiResponse } from "next";
import cors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Setup CORS
  await cors(req, res);

  // Handle incoming OpenAPI requests
  return createOpenApiNextHandler({
    router: appRouter,
    createContext,  
  })(req, res);
};

export default handler;

export const config = {
  runtime: 'experimental-edge',
}