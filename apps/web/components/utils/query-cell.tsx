import type { AppRouter } from "@repo/api/router"
import type { TRPCClientErrorLike } from "@trpc/client"

import { createQueryCell } from "~/utils/query-cell"

export const QueryCell = createQueryCell<TRPCClientErrorLike<AppRouter>>({
  loading: () => null,
  error: () => null,
})
