"use client"

import { Button, Dialog, Series, Tooltip } from "@curiousleaf/design"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { CheckIcon, CopyIcon } from "lucide-react"
import type { HTMLAttributes } from "react"

import { DialogConfirm } from "~/components/dialogs/DialogConfirm"
import { PostUpdateForm } from "~/components/posts/forms/PostUpdateForm"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useCompany } from "~/providers/CompanyProvider"
import { usePost } from "~/providers/PostProvider"
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
      handleSuccess({
        redirect: `/app/${slug}/posts`,
        success: "Post deleted successfully",
      })

      // Invalidate the posts cache
      await apiUtils.posts.getAll.invalidate({ companyId })
    },
  })

  return (
    <Series {...props}>
      <Tooltip tooltip="Copy Link">
        <Button
          size="md"
          theme="secondary"
          variant="outline"
          prefix={copiedText ? <CheckIcon /> : <CopyIcon />}
          onClick={() => copyToClipboard(`${getTenantUrl(slug)}/posts/${post.id}`)}
        />
      </Tooltip>

      <Dialog>
        <Dialog.Trigger asChild>
          <Button size="md" theme="secondary" variant="outline">
            Edit
          </Button>
        </Dialog.Trigger>

        <PostUpdateForm post={post} />
      </Dialog>

      <DialogConfirm
        title="Delete your post?"
        label="Delete Post"
        onConfirm={() => deletePost.mutate({ id: post.id })}
      >
        <Button size="md" theme="negative" variant="outline" loading={deletePost.isLoading}>
          Delete
        </Button>
      </DialogConfirm>
    </Series>
  )
}
