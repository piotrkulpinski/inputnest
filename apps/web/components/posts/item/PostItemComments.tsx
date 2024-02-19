import { Card } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { CommentList } from "~/components/comments/CommentList"

export const PostItemComments = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <Card.Row theme="gray" direction="column" {...props}>
      <CommentList />
    </Card.Row>
  )
}
