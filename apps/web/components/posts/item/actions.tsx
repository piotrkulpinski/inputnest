"use client"

import { useCopyToClipboard } from "@uidotdev/usehooks"
import { CheckIcon, CopyIcon, PencilIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"

import { DialogConfirm } from "~/components/dialogs/confirm"
import { Button } from "~/components/interface/button"
import { CardActions } from "~/components/interface/card"
import { Tooltip, TooltipButton } from "~/components/interface/tooltip"
import { useMutationHandler } from "~/hooks/use-mutation-handler"
import { useCompany } from "~/providers/company-provider"
import { usePost } from "~/providers/post-provider"
import { api } from "~/services/trpc"
import { getTenantUrl } from "~/utils/helpers"

export const PostItemActions = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  const apiUtils = api.useUtils()
  const { handleSuccess } = useMutationHandler()
  const { id: companyId, slug } = useCompany()
  const { post } = usePost()
  const [copiedText, copyToClipboard] = useCopyToClipboard()

  const deletePost = api.posts.delete.useMutation({
    onSuccess: async () => {
      await apiUtils.posts.getAll.invalidate({ companyId })

      handleSuccess({
        redirect: `/app/${slug}/posts`,
        success: "Post deleted successfully",
      })
    },
  })

  return (
    <CardActions {...props}>
      <TooltipButton
        tooltip="Copy Link"
        type="button"
        theme="secondary"
        size="sm"
        prefix={copiedText ? <CheckIcon /> : <CopyIcon />}
        onClick={() => copyToClipboard(`${getTenantUrl(slug)}/posts/${post.id}`)}
      />

      <Tooltip content="Edit Post">
        <div>
          <Button type="button" theme="secondary" size="sm" prefix={<PencilIcon />} asChild>
            <Link href="edit" />
          </Button>
        </div>
      </Tooltip>

      <DialogConfirm
        title="Delete your post?"
        label="Delete Post"
        onConfirm={() => deletePost.mutate({ id: post.id })}
      >
        <TooltipButton
          tooltip="Delete Post"
          type="button"
          theme="secondary"
          size="sm"
          prefix={<TrashIcon />}
          isLoading={deletePost.isLoading}
          isDanger
        />
      </DialogConfirm>
    </CardActions>
  )
}
