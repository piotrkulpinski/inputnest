import { IconChevronUp, IconMessageCircle } from "@tabler/icons-react"
import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

import { Badge } from "~/components/interface/badge"
import { Card, CardPanel } from "~/components/interface/card"
import { Dot } from "~/components/interface/dot"
import { H5 } from "~/components/interface/heading"
import { List } from "~/components/interface/list"
import type { RouterOutputs } from "~/services/trpc"

type PostItemProps = ComponentPropsWithoutRef<typeof Card> & {
  post: RouterOutputs["posts"]["getAll"][number]
}

export const PostItem = ({ post, ...props }: PostItemProps) => {
  return (
    <Card asChild {...props}>
      <Link href={post.id}>
        <CardPanel theme="white" flex="row">
          <List className="min-w-0 flex-1 flex-nowrap">
            <Badge theme="white" prefix={<IconChevronUp />}>
              {post._count.votes}
            </Badge>

            <H5 className="truncate">{post.title}</H5>
          </List>

          <List>
            <Badge theme="white" prefix={<Dot color={post.status.color} className="mx-0.5" />}>
              {post.status.name}
            </Badge>

            <Badge>{post.board.name}</Badge>
            <Badge prefix={<IconMessageCircle />}>{post._count.comments}</Badge>
          </List>
        </CardPanel>
      </Link>
    </Card>
  )
}
