import { Dialog, Header } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import type { StatusSchema } from "@repo/database"
import { statusSchema, statusDefaults } from "@repo/database"
import type { HTMLAttributes } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Form } from "~/components/form/Form"

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
    handleSuccess({
      close: true,
      success: `Status ${isEditing ? "updated" : "created"} successfully`,
    })

    // Invalidate the statuses cache
    await apiUtils.statuses.getAll.invalidate({ companyId })
    await apiUtils.statuses.get.invalidate({ id: status?.id, companyId })

    // Reset the form
    form.reset()
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
      <Dialog.Content size="sm" asChild>
        <Form onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <Dialog.Panel sticky asChild>
            <Header size="h4" title={`${isEditing ? "Update" : "Create New"} Status`}>
              <Dialog.Close />
            </Header>
          </Dialog.Panel>

          <Dialog.Panel scrollable>
            <Form.Fieldset>
              <Form.Field control={form.control} name="name" label="Name" required>
                <Form.Input data-1p-ignore />
              </Form.Field>

              <Form.Field control={form.control} name="color" label="Color" required>
                <Form.ColorPicker />
              </Form.Field>
            </Form.Fieldset>
          </Dialog.Panel>

          <Dialog.Footer>
            <Form.Button loading={isLoading}>{isEditing ? "Update" : "Create"} Status</Form.Button>
            <Dialog.Cancel />
          </Dialog.Footer>
        </Form>
      </Dialog.Content>
    </FormProvider>
  )
}
