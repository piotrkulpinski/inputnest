import {
  boardRelationSchema,
  createBoardSchema,
  idSchema,
  idsSchema,
  updateBoardSchema,
} from "@inputnest/database"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const boardsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(boardRelationSchema)
    .query(async ({ ctx: { db, userId }, input: { workspaceId } }) => {
      return await db.board.findMany({
        where: { workspace: { id: workspaceId, members: { some: { userId } } } },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      })
    }),

  get: protectedProcedure
    .input(idSchema.merge(boardRelationSchema))
    .query(async ({ ctx: { db, userId }, input: { id, workspaceId } }) => {
      return await db.board.findFirst({
        where: { id, workspace: { id: workspaceId, members: { some: { userId } } } },
      })
    }),

  create: protectedProcedure
    .input(createBoardSchema)
    .mutation(async ({ ctx: { db }, input: data }) => {
      return await db.board.create({
        data,
      })
    }),

  update: protectedProcedure
    .input(updateBoardSchema)
    .mutation(async ({ ctx: { db }, input: { id, ...data } }) => {
      return await db.board.update({
        where: { id },
        data,
      })
    }),

  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db, userId }, input: { id } }) => {
      return await db.board.delete({
        where: { id, workspace: { members: { some: { userId } } } },
      })
    }),

  reorder: protectedProcedure
    .input(idsSchema)
    .mutation(async ({ ctx: { db, userId }, input: { ids } }) => {
      await Promise.all(
        ids.map(async (id, order) => {
          await db.board.update({
            where: { id, workspace: { members: { some: { userId } } } },
            data: { order },
          })
        }),
      )
    }),

  makeDefault: protectedProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db, userId }, input }) => {
      const { id } = input

      // Remove default from all boards
      await db.board.updateMany({
        where: { workspace: { members: { some: { userId } } } },
        data: { isDefault: false },
      })

      // Set the new default board
      return await db.board.update({
        where: { id, workspace: { members: { some: { userId } } } },
        data: { isDefault: true },
      })
    }),
})
