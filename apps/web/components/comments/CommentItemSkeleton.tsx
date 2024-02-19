import { Avatar, H6, Shimmer, cx } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

export const CommentItemSkeleton = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className={cx("relative flex gap-4", className)} {...props}>
      <Avatar className="ring-4 ring-gray-50 grayscale md:ring-8" />

      <div className="max-w-xs grow space-y-1">
        <H6 className="mb-2 h-5 w-32 rounded bg-current opacity-10" />

        <div className="h-5 w-full rounded bg-current opacity-5" />
        <div className="h-5 w-2/3 rounded bg-current opacity-5" />
        <div className="h-5 w-1/2 rounded bg-current opacity-5" />
      </div>

      <Shimmer className="via-gray-50/50" />
    </div>
  )
}
