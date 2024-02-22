"use client"

import type { QueryClientConfig } from "@tanstack/react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { httpBatchLink, loggerLink } from "@trpc/react-query"
import { PropsWithChildren, useState } from "react"
import SuperJSON from "superjson"
import { env, isDev } from "~/env"
import { api } from "~/services/trpc/client"

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1_000 * 60 * 5,
    },
  },
}

export function TRPCProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig))

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: opts => {
            return isDev || (opts.direction === "down" && opts.result instanceof Error)
          },
        }),
        httpBatchLink({
          transformer: SuperJSON,
          url: `${env.NEXT_PUBLIC_URL}/api/trpc`,
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      </api.Provider>
    </QueryClientProvider>
  )
}
