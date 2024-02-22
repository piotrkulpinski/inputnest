import { idSchema, idsSchema, tagSchema } from "@inputnest/database"

import { router, workspaceProcedure } from "../trpc"

export const tagsRouter = router({
  getAll: workspaceProcedure.query(async ({ ctx: { db }, input: { workspaceId } }) => {
    return await db.tag.findMany({
      where: { workspaceId },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    })
  }),

  get: workspaceProcedure
    .input(idSchema)
    .query(async ({ ctx: { db }, input: { id, workspaceId } }) => {
      return await db.tag.findFirst({
        where: { id, workspaceId },
      })
    }),

  create: workspaceProcedure
    .input(tagSchema)
    .mutation(async ({ ctx: { db }, input: { ...data } }) => {
      return await db.tag.create({
        data,
      })
    }),

  update: workspaceProcedure
    .input(tagSchema.merge(idSchema))
    .mutation(async ({ ctx: { db }, input: { id, workspaceId, ...data } }) => {
      return await db.tag.update({
        where: { id, workspaceId },
        data,
      })
    }),

  delete: workspaceProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db }, input: { id, workspaceId } }) => {
      return await db.tag.delete({
        where: { id, workspaceId },
      })
    }),

  reorder: workspaceProcedure
    .input(idsSchema)
    .mutation(async ({ ctx: { db }, input: { ids, workspaceId } }) => {
      await Promise.all(
        ids.map(async (id, order) => {
          await db.tag.update({
            where: { id, workspaceId },
            data: { order },
          })
        }),
      )
    }),
})
