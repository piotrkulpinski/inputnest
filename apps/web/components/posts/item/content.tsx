"use client"

import type { HTMLAttributes } from "react"

import { CardPanel } from "~/components/interface/card"
import { Dot } from "~/components/interface/dot"
import { H6 } from "~/components/interface/heading"
import { List } from "~/components/interface/list"
import { Markdown } from "~/components/interface/markdown"
import { Time } from "~/components/interface/time"
import { UserAvatar } from "~/components/users/avatar"
import { usePost } from "~/providers/post-provider"

export const PostItemContent = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const { post } = usePost()

  return (
    <CardPanel theme="white" flex="column" className="md:min-h-[7.5rem]" {...props}>
      {post.content && <Markdown size="md" content={post.content} />}

      <List className="mt-2">
        <List>
          {post.author && (
            <>
              <UserAvatar user={post.author} />
              <H6>{post.author.name}</H6>
            </>
          )}

          <Dot theme="gray" className="opacity-25 first:hidden last:hidden" />
          <Time date={post.createdAt} className="opacity-50" />
        </List>
      </List>
    </CardPanel>
  )
}
