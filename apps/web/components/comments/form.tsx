"use client"

import { Button, Series, cx } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AppRouter } from "@repo/api"
import type { CommentSchema } from "@repo/database"
import { commentDefaults, commentSchema } from "@repo/database"
import type { TRPCClientErrorLike } from "@trpc/client"
import { LockIcon, EyeIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import type { HTMLAttributes, KeyboardEventHandler } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

import { FormEditor } from "~/components/form/controls/editor"
import { FormField } from "~/components/form/FormField"
import { Switch } from "~/components/interface/switch"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useComments } from "~/providers/comments-provider"
import { api } from "~/services/trpc"

type CommentFormProps = HTMLAttributes<HTMLFormElement> & {
  isLoading?: boolean
}

export const CommentForm = ({ isLoading, ...props }: CommentFormProps) => {
  const { id: postId } = useParams() as { id: string }
  const { replying, editing, onReplyCancel, onEditCancel } = useComments()
  const { handleError } = useMutationHandler()
  const apiUtils = api.useUtils()
  const [isMetaKeyDown, setIsMetaKeyDown] = useState(false)

  const values = editing ?? {
    ...commentDefaults,
    ...(replying && {
      parentId: replying?.id,
      isPrivate: replying?.isPrivate,
    }),
    postId,
  }

  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    values,
  })

  const isPrivate = form.watch("isPrivate")
  const placeholder = `Write a ${isPrivate ? "private " : ""}${replying ? "reply" : "comment"}...`

  const onSuccess = async () => {
    // Invalidate the comments cache
    await apiUtils.comments.getAll.invalidate({ postId })

    // Reset the form
    form.reset()

    // Show a success message
    toast.success(`Comment ${editing ? "updated" : "created"} successfully`)

    // Clear out the reply/edit states
    replying && onReplyCancel()
    editing && onEditCancel()

    // Clear the meta key down state
    setIsMetaKeyDown(false)
  }

  const onError = (error: TRPCClientErrorLike<AppRouter>) => {
    handleError({ error, form })
  }

  const createComment = api.comments.create.useMutation({ onSuccess, onError })
  const updateComment = api.comments.update.useMutation({ onSuccess, onError })
  const isMutating = createComment.isLoading || updateComment.isLoading

  // Handle the form submission
  const onSubmit = form.handleSubmit((data: CommentSchema) => {
    if (editing?.id) {
      return updateComment.mutate({ ...data, id: editing.id })
    }

    return createComment.mutate({ ...data, postId })
  })

  // Handle the meta key down state
  const onKeyDown: KeyboardEventHandler = e => {
    if (e.metaKey) {
      setIsMetaKeyDown(true)
    }

    if (e.metaKey && e.key === "Enter") {
      onSubmit()
      e.preventDefault()
    }
  }

  // Handle the meta key down state
  const onKeyUp: KeyboardEventHandler = () => {
    setIsMetaKeyDown(false)
  }

  return (
    <FormProvider {...form}>
      <form className="relative @container" onSubmit={onSubmit} {...props}>
        <fieldset className="contents" disabled={isMutating || isLoading}>
          <FormField control={form.control} name="content" hideError required>
            <FormEditor
              minRows={3}
              placeholder={placeholder}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
            />
          </FormField>

          <Series className="mt-3 @lg:absolute @lg:bottom-2 @lg:right-2 @lg:mt-0">
            <Button size="md" theme="secondary" loading={isMutating} className="@lg:order-last">
              {isMetaKeyDown && "Press Enter to Submit"}
              {!isMetaKeyDown && `${editing ? "Update" : "Post"} ${replying ? "Reply" : "Comment"}`}
            </Button>

            <label
              className={cx(
                "flex select-none items-center gap-2 font-medium",
                isPrivate ? "text-blue-600" : "text-zinc-500",
              )}
            >
              {isPrivate ? "Private" : "Public"}

              <Controller
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <Switch
                    hasError={!!form.formState.errors.isPrivate}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    onIcon={<LockIcon />}
                    offIcon={<EyeIcon />}
                    ref={field.ref}
                  />
                )}
              />
            </label>
          </Series>
        </fieldset>
      </form>
    </FormProvider>
  )
}
