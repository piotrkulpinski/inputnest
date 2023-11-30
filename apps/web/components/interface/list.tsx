import type { HTMLAttributes } from "react"

import { cn } from "~/utils/helpers"

export const List = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)} {...props} />
}
