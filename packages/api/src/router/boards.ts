import { boardSchema, idSchema, idsSchema } from "@inputnest/database"

import { router, workspaceProcedure } from "../trpc"

export const boardsRouter = router({
  getAll: workspaceProcedure.query(async ({ ctx: { db }, input: { workspaceId } }) => {
    return await db.board.findMany({
      where: { workspaceId },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    })
  }),

  get: workspaceProcedure
    .input(idSchema)
    .query(async ({ ctx: { db }, input: { id, workspaceId } }) => {
      return await db.board.findFirst({
        where: { id, workspaceId },
      })
    }),

  create: workspaceProcedure
    .input(boardSchema)
    .mutation(async ({ ctx: { db }, input: { ...data } }) => {
      return await db.board.create({
        data,
      })
    }),

  update: workspaceProcedure
    .input(boardSchema.merge(idSchema))
    .mutation(async ({ ctx: { db }, input: { id, workspaceId, ...data } }) => {
      return await db.board.update({
        where: { id, workspaceId },
        data,
      })
    }),

  delete: workspaceProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db }, input: { id, workspaceId } }) => {
      return await db.board.delete({
        where: { id, workspaceId },
      })
    }),

  reorder: workspaceProcedure
    .input(idsSchema)
    .mutation(async ({ ctx: { db }, input: { ids, workspaceId } }) => {
      await Promise.all(
        ids.map(async (id, order) => {
          await db.board.update({
            where: { id, workspaceId },
            data: { order },
          })
        }),
      )
    }),

  makeDefault: workspaceProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db }, input: { id, workspaceId } }) => {
      // Remove default from all boards
      await db.board.updateMany({
        where: { workspaceId },
        data: { isDefault: false },
      })

      // Set the new default board
      return await db.board.update({
        where: { id, workspaceId },
        data: { isDefault: true },
      })
    }),
})
