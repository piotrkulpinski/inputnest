import { CompanyMemberRole, companySchema, createCompanySchema } from "@repo/database"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export const companiesRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(companySchema.pick({ slug: true }))
    .query(async ({ ctx: { db }, input: { slug } }) => {
      return await db.company.findFirst({
        where: { slug },
      })
    }),

  getAll: protectedProcedure.query(async ({ ctx: { db, userId } }) => {
    return await db.company.findMany({
      where: { members: { some: { userId } } },
      include: { domain: true, subscription: true },
      orderBy: { createdAt: "asc" },
    })
  }),

  create: protectedProcedure
    .input(createCompanySchema)
    .mutation(async ({ ctx: { db, userId }, input }) => {
      const company = await db.company.create({
        data: {
          ...input,
          members: {
            create: {
              userId,
              role: CompanyMemberRole.Owner,
            },
          },
        },
      })

      // await inngest.send({
      //   name: "company.created",
      //   data: company,
      // })

      return company
    }),

  // update: protectedProcedure
  //   .input(updateCompanySchema)
  //   .mutation(async ({ ctx: { db, userId }, input }) => {
  //     const { id, ...data } = input

  //     const company = await db.company.update({
  //       where: { id, members: { some: { userId } } },
  //       data,
  //     })

  //     return company
  //   }),

  // delete: protectedProcedure.input(idSchema).mutation(async ({ ctx: { db, userId }, input }) => {
  //   const { id } = input

  //   const company = await db.company.delete({
  //     where: { id, members: { some: { userId } } },
  //   })

  //   await inngest.send({
  //     name: "company.deleted",
  //     data: company,
  //   })

  //   return company
  // }),
})
