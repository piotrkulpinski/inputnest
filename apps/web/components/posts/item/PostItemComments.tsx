import { Card } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { CommentList } from "~/components/comments/CommentList"

export const PostItemComments = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <Card.Row theme="gray" direction="column" className="md:pb-10" {...props}>
      <CommentList />
    </Card.Row>
  )
}
