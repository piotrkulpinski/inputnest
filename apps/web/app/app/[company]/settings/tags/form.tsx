import { zodResolver } from "@hookform/resolvers/zod"
import type { TagSchema } from "@repo/database"
import { tagSchema, tagDefaults } from "@repo/database"
import type { HTMLAttributes } from "react"
import { useForm, FormProvider } from "react-hook-form"

import { BoxHeader, BoxFooter } from "~/components/interface/box"
import { DialogCancel, DialogClose } from "~/components/interface/dialog"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useCompany } from "~/providers/company-provider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"
import { Form } from "~/components/form/Form"

type TagFormProps = HTMLAttributes<HTMLFormElement> & {
  tag?: RouterOutputs["tags"]["getAll"][number]
}

export const TagForm = ({ tag, ...props }: TagFormProps) => {
  const apiUtils = api.useUtils()
  const { handleSuccess } = useMutationHandler()
  const { id: companyId } = useCompany()
  const isEditing = !!tag

  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    values: tag ?? tagDefaults,
  })

  const onSuccess = async () => {
    // Invalidate the tags cache
    await apiUtils.tags.getAll.invalidate({ companyId })
    await apiUtils.tags.get.invalidate({ id: tag?.id, companyId })

    // Redirect with success message
    handleSuccess({
      redirect: "..",
      success: `Tag ${isEditing ? "updated" : "created"} successfully`,
    })
  }

  const createTag = api.tags.create.useMutation({ onSuccess })
  const updateTag = api.tags.update.useMutation({ onSuccess })
  const isLoading = createTag.isLoading || updateTag.isLoading

  // Handle the form submission
  const onSubmit = (data: TagSchema) => {
    if (tag?.id) {
      return updateTag.mutate({ ...data, id: tag.id })
    }

    return createTag.mutate({ ...data, companyId })
  }

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)} className="contents" {...props}>
        <BoxHeader title={`${isEditing ? "Update" : "Create New"} Tag`}>
          <DialogClose />
        </BoxHeader>

        <Form.Fieldset>
          <Form.Field control={form.control} name="name" label="Name" required>
            <Form.Input data-1p-ignore />
          </Form.Field>

          <Form.Field control={form.control} name="color" label="Color" required>
            <Form.ColorPicker />
          </Form.Field>
        </Form.Fieldset>

        <BoxFooter>
          <Form.Button loading={isLoading}>{isEditing ? "Update" : "Create"} Tag</Form.Button>
          <DialogCancel />
        </BoxFooter>
      </Form>
    </FormProvider>
  )
}
