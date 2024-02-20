import { type PropsWithChildren, useState } from "react"

import type { CommentWithChildren } from "~/utils/comments"
import { createSimpleContext } from "~/utils/providers"

type CommentsContext = {
  replying?: CommentWithChildren
  editing?: CommentWithChildren
  onReply: (comment: CommentWithChildren) => void
  onReplyCancel: () => void
  onEdit: (comment: CommentWithChildren) => void
  onEditCancel: () => void
}

const CommentsContext = createSimpleContext<CommentsContext>("Comments")

export const CommentsProvider = ({ ...props }: PropsWithChildren) => {
  const [replying, setReplying] = useState<CommentWithChildren>()
  const [editing, setEditing] = useState<CommentWithChildren>()

  const onReply = (comment: CommentWithChildren) => {
    setReplying(comment)
    setEditing(undefined)
  }

  const onReplyCancel = () => {
    setReplying(undefined)
  }

  const onEdit = (comment: CommentWithChildren) => {
    setEditing(comment)
    setReplying(undefined)
  }

  const onEditCancel = () => {
    setEditing(undefined)
  }

  return (
    <CommentsContext.Provider
      value={{ replying, editing, onReply, onReplyCancel, onEdit, onEditCancel }}
      {...props}
    />
  )
}

export const useComments = CommentsContext.useValue
