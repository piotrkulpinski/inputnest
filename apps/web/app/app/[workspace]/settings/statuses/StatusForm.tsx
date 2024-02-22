import { Dialog, Header } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import { RouterOutputs } from "@inputnest/api"
import type { StatusSchema } from "@inputnest/database"
import { statusSchema } from "@inputnest/database"
import type { HTMLAttributes } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Form } from "~/components/form/Form"

import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc/client"
import { getDefaults } from "~/utils/zod"

type StatusFormProps = HTMLAttributes<HTMLFormElement> & {
  status?: RouterOutputs["statuses"]["getAll"][number]
}

export const StatusForm = ({ status, ...props }: StatusFormProps) => {
  const apiUtils = api.useUtils()
  const { handleSuccess } = useMutationHandler()
  const { id: workspaceId } = useWorkspace()
  const isEditing = !!status

  const form = useForm<StatusSchema>({
    resolver: zodResolver(statusSchema),
    values: status ?? getDefaults(statusSchema),
  })

  const onSuccess = async () => {
    handleSuccess({
      close: true,
      success: `Status ${isEditing ? "updated" : "created"} successfully`,
    })

    // Invalidate the statuses cache
    await apiUtils.statuses.getAll.invalidate({ workspaceId })
    await apiUtils.statuses.get.invalidate({ id: status?.id, workspaceId })

    // Reset the form
    form.reset()
  }

  const createStatus = api.statuses.create.useMutation({ onSuccess })
  const updateStatus = api.statuses.update.useMutation({ onSuccess })
  const isPending = createStatus.isPending || updateStatus.isPending

  // Handle the form submission
  const onSubmit = (data: StatusSchema) => {
    if (status?.id) {
      return updateStatus.mutate({ ...data, id: status.id })
    }

    return createStatus.mutate({ ...data, workspaceId })
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
              <Form.Field control={form.control} name="name" label="Name" isRequired>
                <Form.Input data-1p-ignore />
              </Form.Field>

              <Form.Field control={form.control} name="color" label="Color" isRequired>
                <Form.ColorPicker />
              </Form.Field>
            </Form.Fieldset>
          </Dialog.Panel>

          <Dialog.Footer>
            <Form.Button isPending={isPending}>
              {isEditing ? "Update" : "Create"} Status
            </Form.Button>

            <Dialog.Cancel />
          </Dialog.Footer>
        </Form>
      </Dialog.Content>
    </FormProvider>
  )
}
