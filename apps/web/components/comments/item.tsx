"use client"

import { IconArrowBackUp, IconLock, IconPin, IconX } from "@tabler/icons-react"
import Link from "next/link"
import { type HTMLAttributes } from "react"

import { CommentForm } from "~/components/comments/form"
import { CommentItemActions } from "~/components/comments/item-actions"
import { CommentTree } from "~/components/comments/tree"
import { Badge } from "~/components/interface/badge"
import { Button } from "~/components/interface/button"
import { Dot } from "~/components/interface/dot"
import { H6 } from "~/components/interface/heading"
import { List } from "~/components/interface/list"
import { Markdown } from "~/components/interface/markdown"
import { Time } from "~/components/interface/time"
import { UserAvatar } from "~/components/users/avatar"
import { useComments } from "~/providers/comments-provider"
import type { CommentWithChildren } from "~/utils/comments"
import { cn } from "~/utils/helpers"

type CommentItemProps = HTMLAttributes<HTMLElement> & {
  comment: CommentWithChildren
}

export const CommentItem = ({ className, comment, ...props }: CommentItemProps) => {
  const { replying, editing, onReply, onReplyCancel, onEditCancel } = useComments()

  const handleCancel = () => {
    onReplyCancel()
    onEditCancel()
  }

  const handleReply = () => {
    onReply(comment)
  }

  return (
    <article
      id={`comment-${comment.id}`}
      className={cn("relative flex flex-col gap-y-4 @container", className)}
      {...props}
    >
      <div className="flex items-start gap-4">
        <UserAvatar user={comment.author} size="lg" className="ring-4 ring-zinc-50 md:ring-8" />

        <div className="flex w-full flex-col gap-4">
          <List>
            <H6>{comment.author.name}</H6>

            <CommentItemActions comment={comment} className="text-zinc-500" />

            {comment.isPrivate && (
              <Badge
                theme="blueSoft"
                suffix={<IconLock />}
                className="-my-0.5 @md:first-of-type:ml-auto"
              >
                Private
              </Badge>
            )}

            {comment.isPinned && (
              <Badge
                theme="purpleSoft"
                suffix={<IconPin />}
                className="-my-0.5 @md:first-of-type:ml-auto"
              >
                Pinned
              </Badge>
            )}
          </List>

          {editing?.id === comment.id ? (
            <CommentForm />
          ) : (
            <Markdown className="-mt-2" content={comment.content} />
          )}

          <List className="text-xs text-zinc-500">
            {[editing?.id, replying?.id].includes(comment.id) ? (
              <Button theme="clean" size="xs" prefix={<IconX />} onClick={handleCancel}>
                Cancel
              </Button>
            ) : (
              <Button theme="clean" size="xs" prefix={<IconArrowBackUp />} onClick={handleReply}>
                Reply
              </Button>
            )}

            <Dot theme="gray" className="text-xxs opacity-25 first:hidden last:hidden" />

            <Link href={`#comment-${comment.id}`} className="hover:text-black">
              <Time date={comment.createdAt} />
            </Link>
          </List>

          {replying?.id === comment.id && <CommentForm />}
        </div>
      </div>

      {!!comment.children.length && (
        <CommentTree className="ml-6 empty:hidden sm:ml-8 md:ml-10">
          {comment.children.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </CommentTree>
      )}
    </article>
  )
}
