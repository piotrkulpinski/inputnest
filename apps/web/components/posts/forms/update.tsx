import { zodResolver } from "@hookform/resolvers/zod"
import type { PostSchema } from "@repo/database"
import { postSchema } from "@repo/database"
import { forwardRef, type HTMLAttributes } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Form } from "~/components/form/Form"

import { BoxHeader, BoxFooter } from "~/components/interface/box"
import { DialogCancel, DialogClose } from "~/components/interface/dialog"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

type PostUpdateFormProps = HTMLAttributes<HTMLFormElement> & {
  post: RouterOutputs["posts"]["get"]
}

export const PostUpdateForm = forwardRef<HTMLFormElement, PostUpdateFormProps>(
  ({ post, ...props }, ref) => {
    const apiUtils = api.useUtils()
    const { handleSuccess, handleError } = useMutationHandler()

    const form = useForm<PostSchema>({
      resolver: zodResolver(postSchema),
      values: post,
    })

    const { mutate: updatePost, isLoading } = api.posts.update.useMutation({
      onSuccess: async () => {
        // Invalidate the boards cache
        await apiUtils.posts.getAll.invalidate()
        await apiUtils.posts.get.invalidate({ id: post.id })

        // Redirect with success message
        handleSuccess({
          redirect: "..",
          success: "Post updated successfully",
        })
      },

      onError: error => handleError({ error, form }),
    })

    // Handle the form submission
    const onSubmit = async (data: PostSchema) => {
      return updatePost({ ...data, id: post.id })
    }

    return (
      <FormProvider {...form}>
        <Form ref={ref} onSubmit={form.handleSubmit(onSubmit)} className="contents" {...props}>
          <BoxHeader title="Update Post">
            <DialogClose />
          </BoxHeader>

          <Form.Fieldset disabled={isLoading}>
            <Form.Field control={form.control} name="title" label="Title" required>
              <Form.Input placeholder="Short, descriptive title" />
            </Form.Field>

            <Form.Field control={form.control} name="content" label="Content">
              <Form.Editor minRows={5} placeholder="Provide more details here" />
            </Form.Field>
          </Form.Fieldset>

          <BoxFooter>
            <Form.Button loading={isLoading}>Update Post</Form.Button>
            <DialogCancel />
          </BoxFooter>
        </Form>
      </FormProvider>
    )
  },
)
