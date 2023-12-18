import {
  commentRelationSchema,
  createCommentSchema,
  updateCommentSchema,
  idSchema,
} from "@repo/database"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const commentsRouter = createTRPCRouter({
  getAll: protectedProcedure.input(commentRelationSchema).query(async ({ ctx: { db }, input }) => {
    const { postId } = input

    return await db.comment.findMany({
      where: { postId },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      include: { author: true },
    })
  }),

  create: protectedProcedure
    .input(createCommentSchema)
    .mutation(async ({ ctx: { db, userId }, input: data }) => {
      return await db.comment.create({
        data: { ...data, authorId: userId },
      })
    }),

  update: protectedProcedure
    .input(updateCommentSchema)
    .mutation(async ({ ctx: { db }, input: { id, ...data } }) => {
      return await db.comment.update({
        where: { id },
        data,
      })
    }),

  delete: protectedProcedure.input(idSchema).mutation(async ({ ctx: { db }, input }) => {
    const { id } = input

    return await db.comment.delete({
      where: { id },
    })
  }),
})
