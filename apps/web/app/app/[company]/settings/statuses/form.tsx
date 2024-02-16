import { zodResolver } from "@hookform/resolvers/zod"
import type { StatusSchema } from "@repo/database"
import { statusSchema, statusDefaults } from "@repo/database"
import type { HTMLAttributes } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Form } from "~/components/form/Form"

import { BoxHeader, BoxFooter } from "~/components/interface/box"
import { DialogCancel, DialogClose } from "~/components/interface/dialog"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useCompany } from "~/providers/company-provider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

type StatusFormProps = HTMLAttributes<HTMLFormElement> & {
  status?: RouterOutputs["statuses"]["getAll"][number]
}

export const StatusForm = ({ status, ...props }: StatusFormProps) => {
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
      <Form onSubmit={form.handleSubmit(onSubmit)} className="contents" {...props}>
        <BoxHeader title={`${isEditing ? "Update" : "Create New"} Status`}>
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
          <Form.Button loading={isLoading}>{isEditing ? "Update" : "Create"} Status</Form.Button>
          <DialogCancel />
        </BoxFooter>
      </Form>
    </FormProvider>
  )
}
