import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"

import type { StatusSchema } from "~/api/schema/status"
import { statusDefaults, statusSchema } from "~/api/schema/status"
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

export const StatusForm = ({ status }: { status: RouterOutputs["statuses"]["get"] }) => {
  const apiUtils = api.useUtils()
  const { handleSuccess } = useMutationHandler()
  const { id: companyId } = useCompany()
  const isEditing = !!status

  const form = useForm<StatusSchema>({
    resolver: zodResolver(statusSchema),
    values: status ?? statusDefaults,
  })

  const onSuccess = async () => {
    // Invalidate the statuses cache
    await apiUtils.statuses.getAll.invalidate({ companyId })
    await apiUtils.statuses.get.invalidate({ id: status?.id, companyId })

    // Redirect with success message
    handleSuccess({
      redirect: "..",
      success: `Status ${isEditing ? "updated" : "created"} successfully`,
    })
  }

  const createStatus = api.statuses.create.useMutation({ onSuccess })
  const updateStatus = api.statuses.update.useMutation({ onSuccess })
  const isLoading = createStatus.isLoading || updateStatus.isLoading

  // Handle the form submission
  const onSubmit = (data: StatusSchema) => {
    if (status?.id) {
      return updateStatus.mutate({ ...data, id: status.id })
    }

    return createStatus.mutate({ ...data, companyId })
  }

  return (
    <FormProvider {...form}>
      <form className="contents" onSubmit={form.handleSubmit(onSubmit)}>
        <BoxHeader title={`${isEditing ? "Update" : "Create New"} Status`}>
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
          <Button isLoading={isLoading}>{isEditing ? "Update" : "Create"} Status</Button>
          <DialogCancel />
        </BoxFooter>
      </form>
    </FormProvider>
  )
}
