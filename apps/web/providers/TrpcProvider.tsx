"use client"

import type { QueryClientConfig } from "@tanstack/react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { httpBatchLink, loggerLink } from "@trpc/client"
import { useState } from "react"
import superjson from "superjson"

import { env, isDev } from "~/env"
import { api } from "~/services/trpc"

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

type TRPCProviderProps = {
  children: React.ReactNode
  headers: Headers
}

export function TRPCProvider({ children, headers }: TRPCProviderProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig))

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: opts => isDev || (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${env.NEXT_PUBLIC_URL}/api/trpc`,

          headers() {
            // Set the source header to react
            const headerMap = new Map(headers)
            headerMap.set("x-trpc-source", "react")

            return Object.fromEntries(headerMap)
          },
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </api.Provider>
    </QueryClientProvider>
  )
}
