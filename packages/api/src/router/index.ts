import { createTRPCRouter } from "../trpc"

import { boardsRouter } from "./boards"
import { commentsRouter } from "./comments"
import { companiesRouter } from "./companies"
import { postsRouter } from "./posts"
import { statusesRouter } from "./statuses"
import { tagsRouter } from "./tags"
import { votesRouter } from "./votes"

// app router
export const appRouter = createTRPCRouter({
  // stripe: stripeRouter,
  companies: companiesRouter,
  // domains: domainsRouter,
  posts: postsRouter,
  boards: boardsRouter,
  tags: tagsRouter,
  statuses: statusesRouter,
  comments: commentsRouter,
  votes: votesRouter,
})

export type AppRouter = typeof appRouter
