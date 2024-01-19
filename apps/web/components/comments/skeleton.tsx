import { H6 } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { Avatar } from "~/components/interface/avatar"
import { Shimmer } from "~/components/interface/shimmer"
import { cn } from "~/utils/helpers"

export const CommentItemSkeleton = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className={cn("relative flex gap-4", className)} {...props}>
      <Avatar size="lg" className="ring-zinc-50 ring-4 md:ring-8" />

      <div className="max-w-xs grow space-y-1">
        <H6 className="mb-2 h-5 w-32 rounded bg-current opacity-10" />

        <div className="h-5 w-full rounded bg-current opacity-5" />
        <div className="h-5 w-2/3 rounded bg-current opacity-5" />
        <div className="h-5 w-1/2 rounded bg-current opacity-5" />
      </div>

      <Shimmer className="via-zinc-50/50" />
    </div>
  )
}
