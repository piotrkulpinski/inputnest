import { idSchema, postSchema } from "@inputnest/database"

import { router, workspaceProcedure } from "../trpc"

export const postsRouter = router({
  getAll: workspaceProcedure.query(async ({ ctx: { db }, input: { workspaceId } }) => {
    return await db.post.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
      include: { board: true, status: true, _count: { select: { comments: true, votes: true } } },
    })
  }),

  get: workspaceProcedure
    .input(idSchema)
    .query(async ({ ctx: { db }, input: { id, workspaceId } }) => {
      return await db.post.findFirstOrThrow({
        where: { id, workspaceId },
        include: { author: true, _count: { select: { comments: true, votes: true } } },
      })
    }),

  create: workspaceProcedure
    .input(postSchema)
    .mutation(async ({ ctx: { db, userId }, input: { ...data } }) => {
      return await db.post.create({
        data: { ...data, authorId: userId },
      })
    }),

  update: workspaceProcedure
    .input(postSchema.merge(idSchema))
    .mutation(async ({ ctx: { db }, input: { id, workspaceId, ...data } }) => {
      return await db.post.update({
        where: { id, workspaceId },
        data,
      })
    }),

  delete: workspaceProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db }, input: { id, workspaceId } }) => {
      return await db.post.delete({
        where: { id, workspaceId },
      })
    }),
})
