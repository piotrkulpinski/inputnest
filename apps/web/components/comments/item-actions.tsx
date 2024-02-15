"use client"

import { Button, Dropdown } from "@curiousleaf/design"
import {
  LockIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PinIcon,
  PinOffIcon,
  TrashIcon,
  UnlockIcon,
} from "lucide-react"
import { useState, type HTMLAttributes } from "react"
import { toast } from "sonner"

import { useComments } from "~/providers/comments-provider"
import { api } from "~/services/trpc"
import type { CommentWithChildren } from "~/utils/comments"

type CommentItemProps = HTMLAttributes<HTMLElement> & {
  comment: CommentWithChildren
}

export const CommentItemActions = ({ comment, ...props }: CommentItemProps) => {
  const [isConfirming, setIsConfirming] = useState(false)
  const { onEdit } = useComments()
  const apiUtils = api.useUtils()
  const { id, postId, isPrivate, isPinned } = comment

  const updateComment = api.comments.update.useMutation({
    onSuccess: async () => {
      await apiUtils.comments.getAll.invalidate({ postId })
      toast.success("Comment updated successfully")
    },
  })

  const deleteComment = api.comments.delete.useMutation({
    onSuccess: async () => {
      await apiUtils.comments.getAll.invalidate({ postId })
      toast.success("Comment deleted successfully")
    },
  })

  const handleDelete = (e: React.MouseEvent) => {
    if (!isConfirming) {
      e.preventDefault()
      setIsConfirming(true)
    } else {
      deleteComment.mutate({ id })
    }
  }

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button
          size="sm"
          theme="secondary"
          variant="ghost"
          prefix={<MoreHorizontalIcon />}
          {...props}
        />
      </Dropdown.Trigger>

      <Dropdown.Content align="start" className="min-w-[11rem]">
        <Dropdown.Group>
          <Dropdown.Item
            prefix={isPrivate ? <UnlockIcon /> : <LockIcon />}
            onClick={() => updateComment.mutate({ ...comment, isPrivate: !isPrivate })}
            isLoading={updateComment.isLoading}
          >
            <button>Make {isPrivate ? "Public" : "Private"}</button>
          </Dropdown.Item>

          <Dropdown.Item
            prefix={isPinned ? <PinOffIcon /> : <PinIcon />}
            onClick={() => updateComment.mutate({ ...comment, isPinned: !isPinned })}
            isLoading={updateComment.isLoading}
          >
            <button>{isPinned ? "Unpin" : "Pin"} Comment</button>
          </Dropdown.Item>

          <Dropdown.Item prefix={<PencilIcon />} onClick={() => onEdit(comment)}>
            <button>Edit Comment</button>
          </Dropdown.Item>

          <Dropdown.Item
            prefix={<TrashIcon />}
            onClick={handleDelete}
            isLoading={deleteComment.isLoading}
            className="text-red-700"
          >
            <button>{isConfirming ? "Are you sure?" : "Delete Comment"}</button>
          </Dropdown.Item>
        </Dropdown.Group>
      </Dropdown.Content>
    </Dropdown>
  )
}
