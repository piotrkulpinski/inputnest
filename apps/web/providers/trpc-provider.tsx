"use client"

import type { QueryClientConfig } from "@tanstack/react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { unstable_httpBatchStreamLink } from "@trpc/client"
import { useState } from "react"
import superjson from "superjson"
import { api } from "../utils/trpc"

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

export function TRPCProvider(props: { children: React.ReactNode; cookies: string }) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig))

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        // loggerLink({
        //   enabled: (opts) => isDev || (opts.direction === "down" && opts.result instanceof Error),
        // }),
        unstable_httpBatchStreamLink({
          url: `https://userpledge-api.piotr-f64.workers.dev`,
          headers: () => ({
            cookie: props.cookies,
            "x-trpc-source": "react",
          }),
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
        <ReactQueryDevtools initialIsOpen={false} />
      </api.Provider>
    </QueryClientProvider>
  )
}
