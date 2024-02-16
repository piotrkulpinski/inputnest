"use client"

import { Button } from "@curiousleaf/design"
import {
  LockIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PinIcon,
  PinOffIcon,
  Trash2Icon,
  UnlockIcon,
} from "lucide-react"
import { useState, type HTMLAttributes } from "react"
import { toast } from "sonner"
import { NavDropdown } from "~/components/navs/NavDropdown"
import { NavItemProps } from "~/components/navs/NavItem"

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

  const navs: NavItemProps[][] = [
    [
      {
        title: `Make ${isPrivate ? "Public" : "Private"}`,
        prefix: isPrivate ? <UnlockIcon /> : <LockIcon />,
        loading: updateComment.isLoading,
        onClick: () => updateComment.mutate({ ...comment, isPrivate: !isPrivate }),
      },
      {
        title: `${isPinned ? "Unpin" : "Pin"} Comment`,
        prefix: isPinned ? <PinOffIcon /> : <PinIcon />,
        loading: updateComment.isLoading,
        onClick: () => updateComment.mutate({ ...comment, isPinned: !isPinned }),
      },
      {
        title: "Edit Comment",
        prefix: <PencilIcon />,
        onClick: () => onEdit(comment),
      },
      {
        title: `${isConfirming ? "Are you sure?" : "Delete Comment"}`,
        prefix: <Trash2Icon />,
        loading: deleteComment.isLoading,
        theme: "negative",
        onClick: handleDelete,
      },
    ],
  ]

  return (
    <NavDropdown navs={navs} align="start">
      <Button
        size="sm"
        theme="secondary"
        variant="ghost"
        prefix={<MoreHorizontalIcon />}
        {...props}
      />
    </NavDropdown>
  )
}
