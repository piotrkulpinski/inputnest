import {
  tagRelationSchema,
  idSchema,
  createTagSchema,
  updateTagSchema,
  idsSchema,
} from "@repo/database"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const tagsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(tagRelationSchema)
    .query(async ({ ctx: { db, userId }, input: { companyId } }) => {
      return await db.tag.findMany({
        where: { company: { id: companyId, members: { some: { userId } } } },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      })
    }),

  get: protectedProcedure
    .input(idSchema.merge(tagRelationSchema))
    .query(async ({ ctx: { db, userId }, input: { id, companyId } }) => {
      return await db.tag.findFirst({
        where: { id, company: { id: companyId, members: { some: { userId } } } },
      })
    }),

  create: protectedProcedure.input(createTagSchema).mutation(async ({ ctx: { db }, input }) => {
    return await db.tag.create({
      data: input,
    })
  }),

  update: protectedProcedure.input(updateTagSchema).mutation(async ({ ctx: { db }, input }) => {
    return await db.tag.update({
      where: { id: input.id },
      data: input,
    })
  }),

  delete: protectedProcedure.input(idSchema).mutation(async ({ ctx: { db, userId }, input }) => {
    const { id } = input

    return await db.tag.delete({
      where: { id, company: { members: { some: { userId } } } },
    })
  }),

  reorder: protectedProcedure.input(idsSchema).mutation(async ({ ctx: { db, userId }, input }) => {
    const { ids } = input

    await Promise.all(
      ids.map(async (id, order) => {
        await db.tag.update({
          where: { id, company: { members: { some: { userId } } } },
          data: { order },
        })
      }),
    )
  }),
})
