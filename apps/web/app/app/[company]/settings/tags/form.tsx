import { zodResolver } from "@hookform/resolvers/zod"
import type { TagSchema } from "@repo/database"
import { tagSchema, tagDefaults } from "@repo/database"
import type { HTMLAttributes } from "react"
import { useForm, FormProvider } from "react-hook-form"

import { FormColorPicker } from "~/components/form/controls/color-picker"
import { FormInput } from "~/components/form/controls/input"
import { FormField } from "~/components/form/field"
import { FormFieldset } from "~/components/form/fieldset"
import { BoxHeader, BoxFooter } from "~/components/interface/box"
import { Button } from "~/components/interface/button"
import { DialogCancel, DialogClose } from "~/components/interface/dialog"
import { useMutationHandler } from "~/hooks/use-mutation-handler"
import { useCompany } from "~/providers/company-provider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

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
      <form className="contents" onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <BoxHeader title={`${isEditing ? "Update" : "Create New"} Tag`}>
          <DialogClose />
        </BoxHeader>

        <FormFieldset>
          <FormField control={form.control} name="name" label="Name" required>
            <FormInput data-1p-ignore />
          </FormField>

          <FormField control={form.control} name="color" label="Color" required>
            <FormColorPicker />
          </FormField>
        </FormFieldset>

        <BoxFooter>
          <Button isLoading={isLoading}>{isEditing ? "Update" : "Create"} Tag</Button>
          <DialogCancel />
        </BoxFooter>
      </form>
    </FormProvider>
  )
}
