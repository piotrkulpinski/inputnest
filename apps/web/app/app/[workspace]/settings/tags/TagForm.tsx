import { zodResolver } from "@hookform/resolvers/zod"
import type { TagSchema } from "@inputnest/database"
import { tagSchema } from "@inputnest/database"
import type { HTMLAttributes } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { Dialog, Header } from "@curiousleaf/design"
import { RouterOutputs } from "@inputnest/api"
import { Form } from "~/components/form/Form"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc/client"
import { getDefaults } from "~/utils/zod"

type TagFormProps = HTMLAttributes<HTMLFormElement> & {
  tag?: RouterOutputs["tags"]["getAll"][number]
}

export const TagForm = ({ tag, ...props }: TagFormProps) => {
  const apiUtils = api.useUtils()
  const { handleSuccess } = useMutationHandler()
  const { id: workspaceId } = useWorkspace()
  const isEditing = !!tag

  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    values: tag ?? getDefaults(tagSchema),
  })

  const onSuccess = async () => {
    handleSuccess({
      close: true,
      success: `Tag ${isEditing ? "updated" : "created"} successfully`,
    })

    // Invalidate the tags cache
    await apiUtils.tags.getAll.invalidate({ workspaceId })
    await apiUtils.tags.get.invalidate({ id: tag?.id, workspaceId })

    // Reset the form
    form.reset()
  }

  const createTag = api.tags.create.useMutation({ onSuccess })
  const updateTag = api.tags.update.useMutation({ onSuccess })
  const isPending = createTag.isPending || updateTag.isPending

  // Handle the form submission
  const onSubmit = (data: TagSchema) => {
    if (tag?.id) {
      return updateTag.mutate({ ...data, id: tag.id })
    }

    return createTag.mutate({ ...data, workspaceId })
  }

  return (
    <FormProvider {...form}>
      <Dialog.Content size="sm" asChild>
        <Form onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <Dialog.Panel sticky asChild>
            <Header size="h4" title={`${isEditing ? "Update" : "Create New"} Tag`}>
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
            <Form.Button isPending={isPending}>{isEditing ? "Update" : "Create"} Tag</Form.Button>
            <Dialog.Cancel />
          </Dialog.Footer>
        </Form>
      </Dialog.Content>
    </FormProvider>
  )
}
