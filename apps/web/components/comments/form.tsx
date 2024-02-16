"use client"

import { Label, Series, Switch, cx } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AppRouter } from "@repo/api"
import type { CommentSchema } from "@repo/database"
import { commentDefaults, commentSchema } from "@repo/database"
import type { TRPCClientErrorLike } from "@trpc/client"
import { useParams } from "next/navigation"
import { useState } from "react"
import type { HTMLAttributes, KeyboardEventHandler } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Form } from "~/components/form/Form"
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
      <Form onSubmit={onSubmit} className="relative @container" {...props}>
        <fieldset className="contents" disabled={isMutating || isLoading}>
          <Form.Field control={form.control} name="content" hideError required>
            <Form.Editor
              minRows={3}
              placeholder={placeholder}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
            />
          </Form.Field>

          <Series className="mt-3 @lg:absolute @lg:bottom-2 @lg:right-2 @lg:mt-0">
            <Form.Button size="md" loading={isMutating} className="@lg:order-last">
              {isMetaKeyDown && "Press Enter to Submit"}
              {!isMetaKeyDown && `${editing ? "Update" : "Post"} ${replying ? "Reply" : "Comment"}`}
            </Form.Button>

            <Label
              className={cx("flex items-center gap-2", isPrivate ? "text-blue" : "text-gray-500")}
            >
              {isPrivate ? "Private" : "Public"}

              <Controller
                control={form.control}
                name="isPrivate"
                render={({ field: { value, onChange, ...field } }) => (
                  <Switch
                    error={!!form.formState.errors.isPrivate}
                    checked={value}
                    onCheckedChange={onChange}
                    {...field}
                  />
                )}
              />
            </Label>
          </Series>
        </fieldset>
      </Form>
    </FormProvider>
  )
}
