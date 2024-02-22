import { idSchema, idsSchema, statusSchema } from "@inputnest/database"

import { router, workspaceProcedure } from "../trpc"

export const statusesRouter = router({
  getAll: workspaceProcedure.query(async ({ ctx: { db }, input: { workspaceId } }) => {
    return await db.status.findMany({
      where: { workspaceId },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    })
  }),

  get: workspaceProcedure
    .input(idSchema)
    .query(async ({ ctx: { db }, input: { id, workspaceId } }) => {
      return await db.status.findFirst({
        where: { id, workspaceId },
      })
    }),

  create: workspaceProcedure
    .input(statusSchema)
    .mutation(async ({ ctx: { db }, input: { ...data } }) => {
      return await db.status.create({
        data,
      })
    }),

  update: workspaceProcedure
    .input(statusSchema.merge(idSchema))
    .mutation(async ({ ctx: { db }, input: { id, workspaceId, ...data } }) => {
      return await db.status.update({
        where: { id, workspaceId },
        data,
      })
    }),

  delete: workspaceProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db }, input: { id, workspaceId } }) => {
      return await db.status.delete({
        where: { id, workspaceId },
      })
    }),

  reorder: workspaceProcedure
    .input(idsSchema)
    .mutation(async ({ ctx: { db }, input: { ids, workspaceId } }) => {
      await Promise.all(
        ids.map(async (id, order) => {
          await db.status.update({
            where: { id, workspaceId },
            data: { order },
          })
        }),
      )
    }),

  makeDefault: workspaceProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db }, input: { id, workspaceId } }) => {
      // Remove default from all statuses
      await db.status.updateMany({
        where: { workspaceId },
        data: { isDefault: false },
      })

      // Set the new default status
      return await db.status.update({
        where: { id, workspaceId },
        data: { isDefault: true },
      })
    }),
})
