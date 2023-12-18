import { zodResolver } from "@hookform/resolvers/zod"
import type { PostSchema } from "@repo/database"
import { postSchema } from "@repo/database"
import { forwardRef, type HTMLAttributes } from "react"
import { useForm, FormProvider } from "react-hook-form"

import { FormEditor } from "~/components/form/controls/editor"
import { FormInput } from "~/components/form/controls/input"
import { FormField } from "~/components/form/field"
import { FormFieldset } from "~/components/form/fieldset"
import { BoxHeader, BoxFooter } from "~/components/interface/box"
import { Button } from "~/components/interface/button"
import { DialogCancel, DialogClose } from "~/components/interface/dialog"
import { useMutationHandler } from "~/hooks/use-mutation-handler"
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

      onError: (error) => handleError({ error, form }),
    })

    // Handle the form submission
    const onSubmit = async (data: PostSchema) => {
      return updatePost({ ...data, id: post.id })
    }

    return (
      <FormProvider {...form}>
        <form ref={ref} className="contents" onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <BoxHeader title="Update Post">
            <DialogClose />
          </BoxHeader>

          <FormFieldset disabled={isLoading}>
            <FormField control={form.control} name="title" label="Title" required>
              <FormInput placeholder="Short, descriptive title" />
            </FormField>

            <FormField control={form.control} name="content" label="Content">
              <FormEditor minRows={5} placeholder="Provide more details here" />
            </FormField>
          </FormFieldset>

          <BoxFooter>
            <Button isLoading={isLoading}>Update Post</Button>
            <DialogCancel />
          </BoxFooter>
        </form>
      </FormProvider>
    )
  },
)
