"use client"

import { Dot, H6, Markdown, Series } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { CardPanel } from "~/components/interface/card"
import { Time } from "~/components/interface/time"
import { UserAvatar } from "~/components/users/avatar"
import { usePost } from "~/providers/post-provider"

export const PostItemContent = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const { post } = usePost()

  return (
    <CardPanel theme="white" flex="column" className="md:min-h-[7.5rem]" {...props}>
      {post.content && <Markdown size="md" content={post.content} />}

      <Series className="mt-2">
        <Series>
          {post.author && (
            <>
              <UserAvatar user={post.author} />
              <H6>{post.author.name}</H6>
            </>
          )}

          <Dot className="text-gray-300 first:hidden last:hidden" />
          <Time date={post.createdAt} className="opacity-50" />
        </Series>
      </Series>
    </CardPanel>
  )
}
