import { Dialog, Header } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import type { PostSchema } from "@inputnest/database"
import { postSchema } from "@inputnest/database"
import { type HTMLAttributes, forwardRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Form } from "~/components/form/Form"
import { getDefaults } from "~/utils/zod"

import { Status } from "~/components/interface/Status"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc/client"

export const PostCreateForm = forwardRef<HTMLFormElement, HTMLAttributes<HTMLFormElement>>(
  ({ ...props }, ref) => {
    const apiUtils = api.useUtils()
    const { handleSuccess, handleError } = useMutationHandler()
    const { id: workspaceId } = useWorkspace()

    const [boards, statuses] = api.useQueries(t => [
      t.boards.getAll({ workspaceId }),
      t.statuses.getAll({ workspaceId }),
    ])

    const form = useForm<PostSchema>({
      resolver: zodResolver(postSchema),
      defaultValues: {
        ...getDefaults(postSchema),
        boardId: boards.data?.find(({ isDefault }) => isDefault)?.id,
        statusId: statuses.data?.find(({ isDefault }) => isDefault)?.id ?? undefined,
      },
    })

    const { mutate: createPost, isPending } = api.posts.create.useMutation({
      onSuccess: async post => {
        handleSuccess({
          redirect: `posts/${post.id}`,
          success: "Post created successfully",
        })

        // Invalidate the boards cache
        await apiUtils.posts.getAll.invalidate()
      },

      onError: error => handleError({ error, form }),
    })

    // Handle the form submission
    const onSubmit = async (data: PostSchema) => {
      return createPost({ ...data, workspaceId })
    }

    return (
      <FormProvider {...form}>
        <Dialog.Content size="lg" asChild>
          <Form ref={ref} onSubmit={form.handleSubmit(onSubmit)} {...props}>
            <Dialog.Panel sticky asChild>
              <Header size="h4" title="Create New Post">
                <Dialog.Close />
              </Header>
            </Dialog.Panel>

            <Dialog.Panel scrollable>
              <Form.Fieldset layout="stacked" columns={2} disabled={isPending}>
                <Form.Field
                  control={form.control}
                  name="title"
                  label="Title"
                  className="col-span-2"
                  isRequired
                >
                  <Form.Input placeholder="Short, descriptive title" />
                </Form.Field>

                <Form.Field control={form.control} name="boardId" label="Board" isRequired>
                  <Form.Select
                    options={boards.data?.map(({ name, id }) => ({
                      label: name,
                      value: id,
                    }))}
                  />
                </Form.Field>

                <Form.Field control={form.control} name="statusId" label="Status" isRequired>
                  <Form.Select
                    options={statuses.data?.map(({ name, id, color }) => ({
                      label: <Status color={color}>{name}</Status>,
                      value: id,
                    }))}
                  />
                </Form.Field>

                <Form.Field
                  control={form.control}
                  name="content"
                  label="Content"
                  className="col-span-2"
                >
                  <Form.Editor minRows={5} placeholder="Provide more details here" />
                </Form.Field>
              </Form.Fieldset>
            </Dialog.Panel>

            <Dialog.Footer>
              <Form.Button isPending={isPending}>Create Post</Form.Button>
              <Dialog.Cancel />
            </Dialog.Footer>
          </Form>
        </Dialog.Content>
      </FormProvider>
    )
  },
)
