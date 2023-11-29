import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

// context holds data that all of your tRPC procedures will have access to
export const createContext = async (options: FetchCreateContextFnOptions) => {
  return {};
};

// initialize tRPC
const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
