import { Prisma, WorkspaceMemberRole, idSchema, workspaceSchema } from "@inputnest/database"

import { protectedProcedure, publicProcedure, router } from "../trpc"

const workspaceInclude = {
  subscription: true,
  members: {
    where: { role: { in: ["Owner", "Manager"] } },
    include: { user: true },
  },
} satisfies Prisma.WorkspaceDefaultArgs["include"]

export const workspacesRouter = router({
  getBySlug: publicProcedure
    .input(workspaceSchema.pick({ slug: true }))
    .query(async ({ ctx: { db }, input: { slug } }) => {
      return await db.workspace.findUnique({
        where: { slug },
        include: workspaceInclude,
      })
    }),

  getAll: protectedProcedure.query(async ({ ctx: { db, userId } }) => {
    return await db.workspace.findMany({
      where: { members: { some: { userId } } },
      include: { subscription: true },
      orderBy: { createdAt: "asc" },
    })
  }),

  create: protectedProcedure
    .input(workspaceSchema)
    .mutation(async ({ ctx: { db, userId }, input: { ...data } }) => {
      const workspace = await db.workspace.create({
        data: {
          ...data,
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
    .input(workspaceSchema.merge(idSchema))
    .mutation(async ({ ctx: { db, userId }, input: { id, ...data } }) => {
      const workspace = await db.workspace.update({
        where: { id, members: { some: { userId } } },
        data,
      })

      return workspace
    }),

  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ ctx: { db, userId }, input: { id } }) => {
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
