import { Badge, H5, Series } from "@curiousleaf/design"
import { ChevronUpIcon, MessageCircleIcon } from "lucide-react"
import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

import { Card, CardPanel } from "~/components/interface/card"
import { Status } from "~/components/interface/status"
import type { RouterOutputs } from "~/services/trpc"

type PostItemProps = ComponentPropsWithoutRef<typeof Card> & {
  post: RouterOutputs["posts"]["getAll"][number]
}

export const PostItem = ({ post, ...props }: PostItemProps) => {
  return (
    <Card asChild {...props}>
      <Link href={`posts/${post.id}`}>
        <CardPanel theme="white" flex="row">
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

            <Badge theme="gray" variant="soft">
              {post.board.name}
            </Badge>

            <Badge theme="gray" variant="soft" prefix={<MessageCircleIcon />}>
              {post._count.comments}
            </Badge>
          </Series>
        </CardPanel>
      </Link>
    </Card>
  )
}
