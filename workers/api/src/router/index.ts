import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// example router
export const exampleRouter = createTRPCRouter({
  sayHello: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}`,
      };
    }),
});

// app router
export const appRouter = createTRPCRouter({
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
