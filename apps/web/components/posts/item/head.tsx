"use client"

import type { HTMLAttributes } from "react"

import { CardPanel } from "~/components/interface/card"
import { H3 } from "~/components/interface/heading"
import { PostItemActions } from "~/components/posts/item/actions"
import { VotesVote } from "~/components/votes/vote"
import { usePost } from "~/providers/post-provider"

export const PostItemHead = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const { post } = usePost()

  return (
    <CardPanel theme="white" flex="row" {...props}>
      <VotesVote postId={post.id}>{post._count.votes ?? 0}</VotesVote>
      <H3>{post.title}</H3>

      <PostItemActions />
    </CardPanel>
  )
}
