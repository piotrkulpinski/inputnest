"use client"

import type { AppRouter } from "@inputnest/api"
import { createTRPCReact } from "@trpc/react-query"

export const api = createTRPCReact<AppRouter>()
