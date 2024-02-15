import { cx } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { CommentList } from "~/components/comments/list"
import { CardPanel } from "~/components/interface/card"

export const PostItemComments = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <CardPanel theme="gray" flex="column" className={cx("pb-10", className)} {...props}>
      <CommentList />
    </CardPanel>
  )
}
