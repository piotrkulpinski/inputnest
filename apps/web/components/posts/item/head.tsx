"use client"

import { H4 } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { CardPanel } from "~/components/interface/card"
import { PostItemActions } from "~/components/posts/item/actions"
import { VotesVote } from "~/components/votes/vote"
import { usePost } from "~/providers/post-provider"

export const PostItemHead = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const { post } = usePost()

  return (
    <CardPanel theme="white" flex="row" {...props}>
      <VotesVote postId={post.id}>{post._count.votes ?? 0}</VotesVote>
      <H4>{post.title}</H4>

      <PostItemActions />
    </CardPanel>
  )
}
