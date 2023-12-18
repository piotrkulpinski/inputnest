import type { HTMLAttributes } from "react"

import { CommentList } from "~/components/comments/list"
import { CardPanel } from "~/components/interface/card"
import { cn } from "~/utils/helpers"

export const PostItemComments = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <CardPanel theme="gray" flex="column" className={cn("pb-10", className)} {...props}>
      <CommentList />
    </CardPanel>
  )
}
