import { createTRPCRouter } from "../trpc"

import { companiesRouter } from "./companies"

// app router
export const appRouter = createTRPCRouter({
  // stripe: stripeRouter,
  companies: companiesRouter,
  // domains: domainsRouter,
  // posts: postsRouter,
  // boards: boardsRouter,
  // tags: tagsRouter,
  // statuses: statusesRouter,
  // comments: commentsRouter,
  // votes: votesRouter,
})

export type AppRouter = typeof appRouter
