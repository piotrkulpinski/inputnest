import { voteRelationSchema } from "@repo/database"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const votesRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(voteRelationSchema)
    .query(async ({ ctx: { db }, input: { postId } }) => {
      return await db.vote.findMany({
        where: { postId },
        orderBy: { createdAt: "asc" },
        include: { author: true },
      })
    }),

  get: protectedProcedure
    .input(voteRelationSchema)
    .query(async ({ ctx: { db }, input: { postId } }) => {
      return await db.vote.findFirst({
        where: { postId },
        orderBy: { createdAt: "asc" },
      })
    }),

  create: protectedProcedure
    .input(voteRelationSchema)
    .mutation(async ({ ctx: { db, userId }, input: { postId } }) => {
      await db.vote.create({
        data: { postId, authorId: userId },
      })
    }),

  delete: protectedProcedure
    .input(voteRelationSchema)
    .mutation(async ({ ctx: { db, userId }, input: { postId } }) => {
      await db.vote.delete({
        where: { authorId_postId: { postId, authorId: userId } },
      })
    }),
})
