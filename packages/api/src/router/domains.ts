// export const domainsRouter = createTRPCRouter({
//   findAll: protectedProcedure.input(z.string().optional()).query(async ({ ctx, input }) => {
//     return await ctx.db.domain.findMany({
//       where: { workspaceId: input },
//       orderBy: [{ createdAt: "desc" }, { id: "asc" }],
//     })
//   }),

//   create: protectedProcedure.input(domainCreateSchema).mutation(async ({ ctx, input }) => {
//     // Create the domain in Vercel first
//     await vercel.addDomain(input.name).catch((error) => {
//       throw new TRPCError({
//         code: "UNPROCESSABLE_CONTENT",
//         message: error.json.error.message,
//         cause: error,
//       })
//     })

//     const domain = await ctx.db.domain.create({
//       data: input,
//     })

//     return domain
//   }),

//   delete: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
//     // Delete the domain from Vercel first
//     await vercel.deleteDomain(input).catch((error) => {
//       throw new TRPCError({
//         code: "UNPROCESSABLE_CONTENT",
//         message: error.json.error.message,
//         cause: error,
//       })
//     })

//     const domain = await ctx.db.domain.delete({
//       where: { name: input },
//     })

//     return domain
//   }),

//   getConfig: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
//     try {
//       let [domainData, configData] = await Promise.all([
//         vercel.getDomain(input),
//         vercel.getDomainConfig(input),
//       ])

//       // Verify the domain
//       if (!domainData.verified) {
//         try {
//           domainData = await vercel.verifyDomain(input)
//         } catch {}
//       }

//       return {
//         ...configData,
//         ...domainData,
//       }
//     } catch (error: any) {
//       throw new TRPCError({
//         code: "UNPROCESSABLE_CONTENT",
//         message: error.json.error.message,
//         cause: error,
//       })
//     }
//   }),
// })
