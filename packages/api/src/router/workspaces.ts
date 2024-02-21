import {
  WorkspaceMemberRole,
  createWorkspaceSchema,
  idSchema,
  updateWorkspaceSchema,
  workspaceSchema,
} from "@inputnest/database"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const workspacesRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(workspaceSchema.pick({ slug: true }))
    .query(async ({ ctx: { db }, input: { slug } }) => {
      return await db.workspace.findFirst({
        where: { slug },
        include: {
          domain: true,
          subscription: true,
          members: {
            where: { role: { in: ["Owner", "Manager"] } },
            include: { user: true },
          },
        },
      })
    }),

  getAll: protectedProcedure.query(async ({ ctx: { db, userId } }) => {
    return await db.workspace.findMany({
      where: { members: { some: { userId } } },
      include: { domain: true, subscription: true },
      orderBy: { createdAt: "asc" },
    })
  }),

  create: protectedProcedure
    .input(createWorkspaceSchema)
    .mutation(async ({ ctx: { db, userId }, input }) => {
      const workspace = await db.workspace.create({
        data: {
          ...input,
          members: {
            create: {
              userId,
              role: WorkspaceMemberRole.Owner,
            },
          },
        },
      })

      // await inngest.send({
      //   name: "workspace.created",
      //   data: workspace,
      // })

      return workspace
    }),

  update: protectedProcedure
    .input(updateWorkspaceSchema)
    .mutation(async ({ ctx: { db, userId }, input }) => {
      const { id, ...data } = input

      const workspace = await db.workspace.update({
        where: { id, members: { some: { userId } } },
        data,
      })

      return workspace
    }),

  delete: protectedProcedure.input(idSchema).mutation(async ({ ctx: { db, userId }, input }) => {
    const { id } = input

    const workspace = await db.workspace.delete({
      where: { id, members: { some: { userId } } },
    })

    // await inngest.send({
    //   name: "workspace.deleted",
    //   data: workspace,
    // })

    return workspace
  }),
})
