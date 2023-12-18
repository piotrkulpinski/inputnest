import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"

import type { PostSchema } from "~/api/schema/post"
import { postDefaults, postSchema } from "~/api/schema/post"
import { FormEditor } from "~/components/form/controls/editor"
import { FormInput } from "~/components/form/controls/input"
import { FormSelect } from "~/components/form/controls/select"
import { FormField } from "~/components/form/field"
import { FormFieldset } from "~/components/form/fieldset"
import { BoxHeader, BoxFooter } from "~/components/interface/box"
import { Button } from "~/components/interface/button"
import { DialogCancel, DialogClose } from "~/components/interface/dialog"
import { Status } from "~/components/interface/status"
import { useMutationHandler } from "~/hooks/use-mutation-handler"
import { useCompany } from "~/providers/company-provider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

type PostFormProps = {
  boards: RouterOutputs["boards"]["getAll"]
  statuses: RouterOutputs["statuses"]["getAll"]
}

export const PostForm = ({ boards, statuses }: PostFormProps) => {
  const apiUtils = api.useUtils()
  const { handleSuccess, handleError } = useMutationHandler()
  const { id: companyId } = useCompany()

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      ...postDefaults,
      boardId: boards.find(({ isDefault }) => isDefault)?.id,
      statusId: statuses.find(({ isDefault }) => isDefault)?.id ?? undefined,
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

    onError: (error) => handleError({ error, form }),
  })

  // Handle the form submission
  const onSubmit = async (data: PostSchema) => {
    return createPost({ ...data, companyId })
  }

  return (
    <FormProvider {...form}>
      <form className="contents" onSubmit={form.handleSubmit(onSubmit)}>
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
                options={boards.map(({ name, id }) => ({
                  label: name,
                  value: id,
                }))}
              />
            </FormField>

            <FormField control={form.control} name="statusId" label="Status" required>
              <FormSelect
                options={statuses.map(({ name, id, color }) => ({
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
          <Button isLoading={isLoading}>Create Post</Button>
          <DialogCancel />
        </BoxFooter>
      </form>
    </FormProvider>
  )
}
