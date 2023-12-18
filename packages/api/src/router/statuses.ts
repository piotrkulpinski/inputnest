import {
  statusRelationSchema,
  idSchema,
  createStatusSchema,
  updateStatusSchema,
  idsSchema,
} from "@repo/database"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const statusesRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(statusRelationSchema)
    .query(async ({ ctx: { db, userId }, input: { companyId } }) => {
      return await db.status.findMany({
        where: { company: { id: companyId, members: { some: { userId } } } },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      })
    }),

  get: protectedProcedure
    .input(idSchema.merge(statusRelationSchema))
    .query(async ({ ctx: { db, userId }, input: { id, companyId } }) => {
      return await db.status.findFirst({
        where: { id, company: { id: companyId, members: { some: { userId } } } },
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
        where: { id, company: { members: { some: { userId } } } },
      })
    }),

  reorder: protectedProcedure
    .input(idsSchema)
    .mutation(async ({ ctx: { db, userId }, input: { ids } }) => {
      await Promise.all(
        ids.map(async (id, order) => {
          await db.status.update({
            where: { id, company: { members: { some: { userId } } } },
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
        where: { company: { members: { some: { userId } } } },
        data: { isDefault: false },
      })

      // Set the new default status
      return await db.status.update({
        where: { id, company: { members: { some: { userId } } } },
        data: { isDefault: true },
      })
    }),
})
