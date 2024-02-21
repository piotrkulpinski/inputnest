import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import type { NextRequest } from "next/server"

import { appRouter, createTRPCContext } from "@inputnest/api"
import { env } from "~/env"
import { auth } from "~/services/auth"

const handler = async (request: NextRequest) => {
  const session = await auth()
  const userId = session?.user?.id

  return await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req: request,
    createContext: () => createTRPCContext({ userId }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`)
          }
        : undefined,
  })
}

export { handler as GET, handler as POST }
