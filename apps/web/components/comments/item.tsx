"use client"

import { Action, Dot, H6, Markdown, Series, cx } from "@curiousleaf/design"
import { LockIcon, PinIcon, XIcon, ReplyIcon } from "lucide-react"
import Link from "next/link"
import { type HTMLAttributes } from "react"

import { CommentForm } from "~/components/comments/form"
import { CommentItemActions } from "~/components/comments/item-actions"
import { CommentTree } from "~/components/comments/tree"
import { Badge } from "~/components/interface/badge"
import { Time } from "~/components/interface/time"
import { UserAvatar } from "~/components/users/avatar"
import { useComments } from "~/providers/comments-provider"
import type { CommentWithChildren } from "~/utils/comments"

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
      className={cx("relative flex flex-col gap-y-4 @container", className)}
      {...props}
    >
      <div className="flex items-start gap-4">
        <UserAvatar user={comment.author} size="lg" className="ring-4 ring-gray-50 md:ring-8" />

        <div className="flex w-full flex-col gap-4">
          <Series>
            <H6>{comment.author.name}</H6>

            <CommentItemActions comment={comment} className="text-gray-500" />

            {comment.isPrivate && (
              <Badge
                theme="blueSoft"
                suffix={<LockIcon />}
                className="-my-0.5 @md:first-of-type:ml-auto"
              >
                Private
              </Badge>
            )}

            {comment.isPinned && (
              <Badge
                theme="purpleSoft"
                suffix={<PinIcon />}
                className="-my-0.5 @md:first-of-type:ml-auto"
              >
                Pinned
              </Badge>
            )}
          </Series>

          {editing?.id === comment.id ? (
            <CommentForm />
          ) : (
            <Markdown size="sm" className="-mt-2" content={comment.content} />
          )}

          <Series>
            {[editing?.id, replying?.id].includes(comment.id) ? (
              <Action prefix={<XIcon />} onClick={handleCancel}>
                Cancel
              </Action>
            ) : (
              <Action prefix={<ReplyIcon />} onClick={handleReply}>
                Reply
              </Action>
            )}

            <Dot className="text-2xs text-gray-300" />

            <Action asChild>
              <Link href={`#comment-${comment.id}`}>
                <Time date={comment.createdAt} />
              </Link>
            </Action>
          </Series>

          {replying?.id === comment.id && <CommentForm />}
        </div>
      </div>

      {!!comment.children.length && (
        <CommentTree className="ml-6 empty:hidden sm:ml-8 md:ml-10">
          {comment.children.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </CommentTree>
      )}
    </article>
  )
}
