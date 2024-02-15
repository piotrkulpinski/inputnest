import { Button } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import type { PostSchema } from "@repo/database"
import { postSchema, postDefaults } from "@repo/database"
import { forwardRef, type HTMLAttributes } from "react"
import { useForm, FormProvider } from "react-hook-form"

import { FormEditor } from "~/components/form/controls/editor"
import { FormInput } from "~/components/form/controls/input"
import { FormSelect } from "~/components/form/controls/select"
import { FormField } from "~/components/form/field"
import { FormFieldset } from "~/components/form/fieldset"
import { BoxHeader, BoxFooter } from "~/components/interface/box"
import { DialogCancel, DialogClose } from "~/components/interface/dialog"
import { Status } from "~/components/interface/status"
import { useMutationHandler } from "~/hooks/use-mutation-handler"
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
        <form ref={ref} className="contents" onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <BoxHeader title="Create New Post">
            <DialogClose />
          </BoxHeader>

          <FormFieldset disabled={isLoading}>
            <FormField control={form.control} name="title" label="Title" required>
              <FormInput placeholder="Short, descriptive title" />
            </FormField>

            <FormFieldset className="flex-row">
              <FormField control={form.control} name="boardId" label="Board" required>
                <FormSelect
                  options={boards.data?.map(({ name, id }) => ({
                    label: name,
                    value: id,
                  }))}
                />
              </FormField>

              <FormField control={form.control} name="statusId" label="Status" required>
                <FormSelect
                  options={statuses.data?.map(({ name, id, color }) => ({
                    label: <Status color={color}>{name}</Status>,
                    value: id,
                  }))}
                />
              </FormField>
            </FormFieldset>

            <FormField control={form.control} name="content" label="Content">
              <FormEditor minRows={5} placeholder="Provide more details here" />
            </FormField>
          </FormFieldset>

          <BoxFooter>
            <Button type="submit" theme="secondary" loading={isLoading}>
              Create Post
            </Button>
            <DialogCancel />
          </BoxFooter>
        </form>
      </FormProvider>
    )
  },
)
