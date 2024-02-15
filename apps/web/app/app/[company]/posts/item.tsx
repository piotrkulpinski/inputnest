import { H5, Series } from "@curiousleaf/design"
import { ChevronUpIcon, MessageCircleIcon } from "lucide-react"
import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

import { Badge } from "~/components/interface/badge"
import { Card, CardPanel } from "~/components/interface/card"
import { Dot } from "~/components/interface/dot"
import type { RouterOutputs } from "~/services/trpc"

type PostItemProps = ComponentPropsWithoutRef<typeof Card> & {
  post: RouterOutputs["posts"]["getAll"][number]
}

export const PostItem = ({ post, ...props }: PostItemProps) => {
  return (
    <Card asChild {...props}>
      <Link href={post.id}>
        <CardPanel theme="white" flex="row">
          <Series className="min-w-0 flex-1 flex-nowrap">
            <Badge theme="white" prefix={<ChevronUpIcon />}>
              {post._count.votes}
            </Badge>

            <H5 className="truncate">{post.title}</H5>
          </Series>

          <Series>
            <Badge theme="white" prefix={<Dot color={post.status.color} className="mx-0.5" />}>
              {post.status.name}
            </Badge>

            <Badge>{post.board.name}</Badge>
            <Badge prefix={<MessageCircleIcon />}>{post._count.comments}</Badge>
          </Series>
        </CardPanel>
      </Link>
    </Card>
  )
}
