import {
  createStatusSchema,
  idSchema,
  idsSchema,
  statusRelationSchema,
  updateStatusSchema,
} from "@repo/database"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const statusesRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(statusRelationSchema)
    .query(async ({ ctx: { db, userId }, input: { workspaceId } }) => {
      return await db.status.findMany({
        where: { workspace: { id: workspaceId, members: { some: { userId } } } },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      })
    }),

  get: protectedProcedure
    .input(idSchema.merge(statusRelationSchema))
    .query(async ({ ctx: { db, userId }, input: { id, workspaceId } }) => {
      return await db.status.findFirst({
        where: { id, workspace: { id: workspaceId, members: { some: { userId } } } },
      })
    }),

  create: protectedProcedure
    .input(createStatusSchema)
    .mutation(async ({ ctx: { db }, input: data }) => {
      return await db.status.create({
        data,
      })
    }),

  update: protectedProcedure
    .input(updateStatusSchema)
    .mutation(async ({ ctx: { db }, input: { id, ...data } }) => {
      return await db.status.update({
        where: { id },
        data,
      })
    }),

  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db, userId }, input: { id } }) => {
      return await db.status.delete({
        where: { id, workspace: { members: { some: { userId } } } },
      })
    }),

  reorder: protectedProcedure
    .input(idsSchema)
    .mutation(async ({ ctx: { db, userId }, input: { ids } }) => {
      await Promise.all(
        ids.map(async (id, order) => {
          await db.status.update({
            where: { id, workspace: { members: { some: { userId } } } },
            data: { order },
          })
        }),
      )
    }),

  makeDefault: protectedProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db, userId }, input: { id } }) => {
      // Remove default from all statuss
      await db.status.updateMany({
        where: { workspace: { members: { some: { userId } } } },
        data: { isDefault: false },
      })

      // Set the new default status
      return await db.status.update({
        where: { id, workspace: { members: { some: { userId } } } },
        data: { isDefault: true },
      })
    }),
})
