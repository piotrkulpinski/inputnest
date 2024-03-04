import { Dialog, Header } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import { RouterOutputs } from "@inputnest/api"
import type { PostSchema } from "@inputnest/database"
import { postSchema } from "@inputnest/database"
import { type HTMLAttributes, forwardRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Form } from "~/components/form/Form"

import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc/client"

type PostUpdateFormProps = HTMLAttributes<HTMLFormElement> & {
  post: RouterOutputs["posts"]["get"]
}

export const PostUpdateForm = forwardRef<HTMLFormElement, PostUpdateFormProps>(
  ({ post, ...props }, ref) => {
    const apiUtils = api.useUtils()
    const { handleSuccess, handleError } = useMutationHandler()
    const { id: workspaceId } = useWorkspace()

    const form = useForm<PostSchema>({
      resolver: zodResolver(postSchema),
      values: post,
    })

    const { mutate: updatePost, isPending } = api.posts.update.useMutation({
      onSuccess: async () => {
        handleSuccess({
          close: true,
          success: "Post updated successfully",
        })

        // Invalidate the boards cache
        await apiUtils.posts.getAll.invalidate()
        await apiUtils.posts.get.invalidate({ id: post.id })
      },

      onError: error => handleError({ error, form }),
    })

    // Handle the form submission
    const onSubmit = async (data: PostSchema) => {
      return updatePost({ ...data, id: post.id, workspaceId })
    }

    return (
      <FormProvider {...form}>
        <Dialog.Content size="lg" asChild>
          <Form ref={ref} onSubmit={form.handleSubmit(onSubmit)} {...props}>
            <Dialog.Panel sticky asChild>
              <Header size="h4" title="Update Post">
                <Dialog.Close />
              </Header>
            </Dialog.Panel>

            <Dialog.Panel scrollable>
              <Form.Fieldset layout="stacked" disabled={isPending}>
                <Form.Field control={form.control} name="title" label="Title" isRequired>
                  <Form.Input placeholder="Short, descriptive title" />
                </Form.Field>

                <Form.Field control={form.control} name="content" label="Content">
                  <Form.Editor minRows={5} placeholder="Provide more details here" />
                </Form.Field>
              </Form.Fieldset>
            </Dialog.Panel>

            <Dialog.Footer>
              <Form.Button isPending={isPending}>Update Post</Form.Button>
              <Dialog.Cancel />
            </Dialog.Footer>
          </Form>
        </Dialog.Content>
      </FormProvider>
    )
  },
)
