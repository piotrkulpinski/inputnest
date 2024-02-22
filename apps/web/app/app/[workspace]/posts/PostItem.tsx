import { Badge, Card, H5, Series } from "@curiousleaf/design"
import { RouterOutputs } from "@inputnest/api"
import { ChevronUpIcon, MessageCircleIcon } from "lucide-react"
import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

import { Status } from "~/components/interface/Status"

type PostItemProps = ComponentPropsWithoutRef<typeof Card> & {
  post: RouterOutputs["posts"]["getAll"][number]
}

export const PostItem = ({ post, ...props }: PostItemProps) => {
  return (
    <Card asChild {...props}>
      <Link href={`posts/${post.id}`}>
        <Card.Row>
          <Series className="min-w-0 flex-1 flex-nowrap">
            <Badge theme="gray" variant="outline" prefix={<ChevronUpIcon />}>
              {post._count.votes}
            </Badge>

            <H5 className="truncate">{post.title}</H5>
          </Series>

          <Series size="sm">
            <Badge theme="gray" variant="outline" asChild>
              <Status color={post.status.color}>{post.status.name}</Status>
            </Badge>

            <Badge theme="gray" variant="outline">
              {post.board.name}
            </Badge>

            <Badge theme="gray" variant="outline" prefix={<MessageCircleIcon />}>
              {post._count.comments}
            </Badge>
          </Series>
        </Card.Row>
      </Link>
    </Card>
  )
}
