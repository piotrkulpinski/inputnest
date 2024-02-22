import { commentRelationSchema, commentSchema, idSchema } from "@inputnest/database"

import { protectedProcedure, router } from "../trpc"

export const commentsRouter = router({
  getAll: protectedProcedure
    .input(commentRelationSchema)
    .query(async ({ ctx: { db }, input: { postId } }) => {
      return await db.comment.findMany({
        where: { postId },
        orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
        include: { author: true },
      })
    }),

  create: protectedProcedure
    .input(commentSchema.merge(commentRelationSchema))
    .mutation(async ({ ctx: { db, userId }, input: { ...data } }) => {
      return await db.comment.create({
        data: { ...data, authorId: userId },
      })
    }),

  update: protectedProcedure
    .input(commentSchema.merge(idSchema))
    .mutation(async ({ ctx: { db, userId }, input: { id, ...data } }) => {
      return await db.comment.update({
        where: { id, authorId: userId },
        data,
      })
    }),

  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db, userId }, input: { id } }) => {
      return await db.comment.delete({
        where: { id, authorId: userId },
      })
    }),
})
