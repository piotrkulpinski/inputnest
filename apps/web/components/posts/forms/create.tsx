import { zodResolver } from "@hookform/resolvers/zod"
import type { PostSchema } from "@repo/database"
import { postSchema, postDefaults } from "@repo/database"
import { forwardRef, type HTMLAttributes } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Form } from "~/components/form/Form"

import { BoxHeader, BoxFooter } from "~/components/interface/box"
import { DialogCancel, DialogClose } from "~/components/interface/dialog"
import { Status } from "~/components/interface/status"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useCompany } from "~/providers/company-provider"
import { api } from "~/services/trpc"

export const PostCreateForm = forwardRef<HTMLFormElement, HTMLAttributes<HTMLFormElement>>(
  ({ ...props }, ref) => {
    const apiUtils = api.useUtils()
    const { handleSuccess, handleError } = useMutationHandler()
    const { id: companyId } = useCompany()

    const [boards, statuses] = api.useQueries(t => [
      t.boards.getAll({ companyId }),
      t.statuses.getAll({ companyId }),
    ])

    const form = useForm<PostSchema>({
      resolver: zodResolver(postSchema),
      defaultValues: {
        ...postDefaults,
        boardId: boards.data?.find(({ isDefault }) => isDefault)?.id,
        statusId: statuses.data?.find(({ isDefault }) => isDefault)?.id ?? undefined,
      },
    })

    const { mutate: createPost, isLoading } = api.posts.create.useMutation({
      onSuccess: async () => {
        // Invalidate the boards cache
        await apiUtils.posts.getAll.invalidate()

        // Redirect with success message
        handleSuccess({
          redirect: "..",
          success: "Post created successfully",
        })
      },

      onError: error => handleError({ error, form }),
    })

    // Handle the form submission
    const onSubmit = async (data: PostSchema) => {
      return createPost({ ...data, companyId })
    }

    return (
      <FormProvider {...form}>
        <Form ref={ref} className="contents" onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <BoxHeader title="Create New Post">
            <DialogClose />
          </BoxHeader>

          <Form.Fieldset disabled={isLoading}>
            <Form.Field control={form.control} name="title" label="Title" required>
              <Form.Input placeholder="Short, descriptive title" />
            </Form.Field>

            <Form.Fieldset className="flex-row">
              <Form.Field control={form.control} name="boardId" label="Board" required>
                <Form.Select
                  options={boards.data?.map(({ name, id }) => ({
                    label: name,
                    value: id,
                  }))}
                />
              </Form.Field>

              <Form.Field control={form.control} name="statusId" label="Status" required>
                <Form.Select
                  options={statuses.data?.map(({ name, id, color }) => ({
                    label: <Status color={color}>{name}</Status>,
                    value: id,
                  }))}
                />
              </Form.Field>
            </Form.Fieldset>

            <Form.Field control={form.control} name="content" label="Content">
              <Form.Editor minRows={5} placeholder="Provide more details here" />
            </Form.Field>
          </Form.Fieldset>

          <BoxFooter>
            <Form.Button loading={isLoading}>Create Post</Form.Button>
            <DialogCancel />
          </BoxFooter>
        </Form>
      </FormProvider>
    )
  },
)
