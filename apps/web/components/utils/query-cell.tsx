import type { TRPCClientErrorLike } from "@trpc/client"

import type { Router } from "~/api/router"
import { createQueryCell } from "~/utils/query-cell"

export const QueryCell = createQueryCell<TRPCClientErrorLike<Router>>({
  loading: () => null,
  error: () => null,
})
