import type { HTMLAttributes } from "react"

import { Avatar } from "~/components/interface/avatar"
import { Shimmer } from "~/components/interface/shimmer"
import { cn } from "~/utils/helpers"

export const VotesSkeleton = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className={cn("relative flex -space-x-1", className)} {...props}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Avatar key={i} size="lg" className="ring-2 ring-white" />
      ))}

      <Shimmer />
    </div>
  )
}
