import { companySchema } from "../schema/company"
import { createTRPCRouter, protectedProcedure } from "../trpc/trpc"

export const companiesRouter = createTRPCRouter({
  // findAll: protectedProcedure.query(async ({ ctx: { db, userId } }) => {
  //   return await db.company.findMany({
  //     where: { members: { some: { userId } } },
  //     include: { domain: true, subscription: true },
  //     orderBy: { createdAt: "asc" },
  //   })
  // }),

  // find: protectedProcedure.input(idSchema).query(async ({ ctx: { db, userId }, input: { id } }) => {
  //   return await db.company.findFirst({
  //     where: { id, members: { some: { userId } } },
  //   })
  // }),

  findAll: protectedProcedure.query(async ({ ctx: { db, userId } }) => {
    return await db.query.companies.findMany({
      // where: { members: { some: { userId } } },
      // with: { domain: true, subscription: true },
      orderBy: (t, { asc }) => asc(t.createdAt),
    })
  }),

  findBySlug: protectedProcedure
    .input(companySchema.pick({ slug: true }))
    .query(async ({ ctx: { db, userId }, input: { slug } }) => {
      return await db.query.companies.findFirst({
        where: (t, { eq }) => eq(t.slug, slug),
      })
    }),

  // create: protectedProcedure
  //   .input(createCompanySchema)
  //   .mutation(async ({ ctx: { db, userId }, input }) => {
  //     const company = await db.company.create({
  //       data: {
  //         ...input,
  //         members: {
  //           create: {
  //             userId,
  //             role: CompanyMemberRole.Owner,
  //           },
  //         },
  //       },
  //     })

  //     await inngest.send({
  //       name: "company.created",
  //       data: company,
  //     })

  //     return company
  //   }),

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
