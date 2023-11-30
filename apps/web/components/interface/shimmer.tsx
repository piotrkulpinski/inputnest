import type { HTMLAttributes } from "react"

import { cn } from "~/utils/helpers"

export const Shimmer = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 z-10 w-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent",
        className,
      )}
      {...props}
    />
  )
}
