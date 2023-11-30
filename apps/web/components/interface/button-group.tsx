import type { HTMLAttributes } from "react"

import { cn } from "~/utils/helpers"

export const ButtonGroup = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return <div className={cn("buttons group flex -space-x-px", className)} {...props} />
}
