import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// example router
export const exampleRouter = createTRPCRouter({
  sayHello: protectedProcedure
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
