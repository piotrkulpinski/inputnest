"use client"

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

import { Button } from "~/components/interface/button"
import {
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownRoot,
  DropdownTrigger,
} from "~/components/interface/dropdown"
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
    <DropdownRoot>
      <DropdownTrigger asChild>
        <Button theme="clean" size="xs" prefix={<MoreHorizontalIcon />} {...props} />
      </DropdownTrigger>

      <DropdownContent align="start" className="min-w-[11rem]">
        <DropdownGroup>
          <DropdownItem
            prefix={isPrivate ? <UnlockIcon /> : <LockIcon />}
            onClick={() => updateComment.mutate({ ...comment, isPrivate: !isPrivate })}
            isLoading={updateComment.isLoading}
          >
            <button>Make {isPrivate ? "Public" : "Private"}</button>
          </DropdownItem>

          <DropdownItem
            prefix={isPinned ? <PinOffIcon /> : <PinIcon />}
            onClick={() => updateComment.mutate({ ...comment, isPinned: !isPinned })}
            isLoading={updateComment.isLoading}
          >
            <button>{isPinned ? "Unpin" : "Pin"} Comment</button>
          </DropdownItem>

          <DropdownItem prefix={<PencilIcon />} onClick={() => onEdit(comment)}>
            <button>Edit Comment</button>
          </DropdownItem>

          <DropdownItem
            prefix={<TrashIcon />}
            onClick={handleDelete}
            isLoading={deleteComment.isLoading}
            className="text-red-700"
          >
            <button>{isConfirming ? "Are you sure?" : "Delete Comment"}</button>
          </DropdownItem>
        </DropdownGroup>
      </DropdownContent>
    </DropdownRoot>
  )
}
