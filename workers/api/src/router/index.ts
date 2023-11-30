import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

// example router
export const exampleRouter = createTRPCRouter({
  sayHello: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx: { db, userId }, input }) => {
      const company = await db.company.findFirst({})

      return {
        greeting: `Hello ${company?.name}`,
      }
    }),
})

// app router
export const appRouter = createTRPCRouter({
  example: exampleRouter,
})

export type AppRouter = typeof appRouter
