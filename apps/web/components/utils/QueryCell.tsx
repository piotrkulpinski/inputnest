import type { AppRouter } from "@inputnest/api"
import type { TRPCClientErrorLike } from "@trpc/client"

import { createQueryCell } from "~/utils/query-cell"

export const QueryCell = createQueryCell<TRPCClientErrorLike<AppRouter>>({
  pending: () => null,
  error: () => null,
})
