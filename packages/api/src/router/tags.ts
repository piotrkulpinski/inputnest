import {
  createTagSchema,
  idSchema,
  idsSchema,
  tagRelationSchema,
  updateTagSchema,
} from "@inputnest/database"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const tagsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(tagRelationSchema)
    .query(async ({ ctx: { db, userId }, input: { workspaceId } }) => {
      return await db.tag.findMany({
        where: { workspace: { id: workspaceId, members: { some: { userId } } } },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      })
    }),

  get: protectedProcedure
    .input(idSchema.merge(tagRelationSchema))
    .query(async ({ ctx: { db, userId }, input: { id, workspaceId } }) => {
      return await db.tag.findFirst({
        where: { id, workspace: { id: workspaceId, members: { some: { userId } } } },
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
      where: { id, workspace: { members: { some: { userId } } } },
    })
  }),

  reorder: protectedProcedure.input(idsSchema).mutation(async ({ ctx: { db, userId }, input }) => {
    const { ids } = input

    await Promise.all(
      ids.map(async (id, order) => {
        await db.tag.update({
          where: { id, workspace: { members: { some: { userId } } } },
          data: { order },
        })
      }),
    )
  }),
})
