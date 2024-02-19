"use client"

import { Card, Dot, H6, Markdown, Series } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { Time } from "~/components/interface/Time"
import { UserAvatar } from "~/components/users/UserAvatar"
import { usePost } from "~/providers/PostProvider"

export const PostItemContent = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const { post } = usePost()

  return (
    <Card.Row theme="white" direction="column" className="md:min-h-[7.5rem]" {...props}>
      {post.content && <Markdown size="md" content={post.content} className="max-w-none" />}

      <Series className="mt-2 text-sm">
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
    </Card.Row>
  )
}
