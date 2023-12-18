import { postRelationSchema, idSchema, createPostSchema, updatePostSchema } from "@repo/database"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const postsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(postRelationSchema)
    .query(async ({ ctx: { db, userId }, input: { companyId } }) => {
      return await db.post.findMany({
        where: { company: { id: companyId, members: { some: { userId } } } },
        orderBy: { createdAt: "desc" },
        include: { board: true, status: true, _count: { select: { comments: true, votes: true } } },
      })
    }),

  get: protectedProcedure
    .input(idSchema.merge(postRelationSchema))
    .query(async ({ ctx: { db, userId }, input: { id, companyId } }) => {
      return await db.post.findFirstOrThrow({
        where: { id, company: { id: companyId, members: { some: { userId } } } },
        include: { author: true, _count: { select: { comments: true, votes: true } } },
      })
    }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx: { db, userId }, input }) => {
      return await db.post.create({
        data: { ...input, authorId: userId },
      })
    }),

  update: protectedProcedure
    .input(updatePostSchema)
    .mutation(async ({ ctx: { db }, input: { id, ...data } }) => {
      return await db.post.update({
        where: { id },
        data,
      })
    }),

  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db, userId }, input: { id } }) => {
      return await db.post.delete({
        where: { id, company: { members: { some: { userId } } } },
      })
    }),
})
