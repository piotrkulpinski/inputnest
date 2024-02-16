"use client"

import { Button, Tooltip } from "@curiousleaf/design"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { CheckIcon, CopyIcon, PencilIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"

import { DialogConfirm } from "~/components/dialogs/confirm"
import { CardActions } from "~/components/interface/card"
import { useMutationHandler } from "~/hooks/useMutationHandler"
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
      <Tooltip tooltip="Copy Link">
        <Button
          size="md"
          theme="secondary"
          variant="outline"
          prefix={copiedText ? <CheckIcon /> : <CopyIcon />}
          onClick={() => copyToClipboard(`${getTenantUrl(slug)}/posts/${post.id}`)}
        />
      </Tooltip>

      <Button size="md" theme="secondary" variant="outline" prefix={<PencilIcon />} asChild>
        <Link href="./edit">Edit</Link>
      </Button>

      <DialogConfirm
        title="Delete your post?"
        label="Delete Post"
        onConfirm={() => deletePost.mutate({ id: post.id })}
      >
        <Button
          size="md"
          theme="negative"
          variant="outline"
          prefix={<Trash2Icon />}
          loading={deletePost.isLoading}
        >
          Delete
        </Button>
      </DialogConfirm>
    </CardActions>
  )
}
