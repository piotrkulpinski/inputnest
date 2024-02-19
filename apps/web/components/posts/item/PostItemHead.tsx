"use client"

import { Card, H4 } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { PostItemActions } from "~/components/posts/item/PostItemActions"
import { VotesVote } from "~/components/votes/VotesVote"
import { usePost } from "~/providers/PostProvider"

export const PostItemHead = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const { post } = usePost()

  return (
    <Card.Row theme="white" gap="sm" {...props}>
      <VotesVote postId={post.id}>{post._count.votes ?? 0}</VotesVote>
      <H4 className="grow">{post.title}</H4>

      <PostItemActions />
    </Card.Row>
  )
}
