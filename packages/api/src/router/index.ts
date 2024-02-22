import { createTRPCRouter } from "../trpc"

import { boardsRouter } from "./boards"
import { commentsRouter } from "./comments"
import { postsRouter } from "./posts"
import { statusesRouter } from "./statuses"
import { tagsRouter } from "./tags"
import { votesRouter } from "./votes"
import { workspacesRouter } from "./workspaces"

// app router
export const appRouter = createTRPCRouter({
  // stripe: stripeRouter,
  workspaces: workspacesRouter,
  posts: postsRouter,
  boards: boardsRouter,
  tags: tagsRouter,
  statuses: statusesRouter,
  comments: commentsRouter,
  votes: votesRouter,
})

export type AppRouter = typeof appRouter
