"use server"

import { httpBatchLink, loggerLink } from "@trpc/client"
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server"
import { headers } from "next/headers"

import type { AppRouter } from "@inputnest/api"
import SuperJSON from "superjson"
import { env, isDev } from "~/env"

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: opts => {
            return isDev || (opts.direction === "down" && opts.result instanceof Error)
          },
        }),
        httpBatchLink({
          transformer: SuperJSON,
          url: `${env.NEXT_PUBLIC_URL}/api/trpc`,
          headers: Object.fromEntries(headers().entries()),
        }),
      ],
    }
  },
})
