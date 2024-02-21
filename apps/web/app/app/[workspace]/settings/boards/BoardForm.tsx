import { Dialog, Header } from "@curiousleaf/design"
import { toSlugCase } from "@curiousleaf/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AppRouter } from "@repo/api"
import type { BoardSchema } from "@repo/database"
import { boardSchema } from "@repo/database"
import type { TRPCClientErrorLike } from "@trpc/client"
import type { HTMLAttributes } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { Form } from "~/components/form/Form"

import { useComputedField } from "~/hooks/useComputedField"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"
import { getDefaults } from "~/utils/zod"

type BoardFormProps = HTMLAttributes<HTMLFormElement> & {
  board?: RouterOutputs["boards"]["getAll"][number]
}

export const BoardForm = ({ board, ...props }: BoardFormProps) => {
  const apiUtils = api.useUtils()
  const { handleSuccess, handleError } = useMutationHandler()
  const { id: workspaceId } = useWorkspace()
  const isEditing = !!board

  const form = useForm<BoardSchema>({
    resolver: zodResolver(boardSchema),
    values: board ?? getDefaults(boardSchema),
  })

  const onSuccess = async () => {
    handleSuccess({
      close: true,
      success: `Board ${isEditing ? "updated" : "created"} successfully`,
    })

    // Invalidate the boards cache
    await apiUtils.boards.getAll.invalidate({ workspaceId })
    await apiUtils.boards.get.invalidate({ id: board?.id, workspaceId })

    // Reset the form
    form.reset()
  }

  const onError = (error: TRPCClientErrorLike<AppRouter>) => {
    handleError({ error, form })
  }

  const createBoard = api.boards.create.useMutation({ onSuccess, onError })
  const updateBoard = api.boards.update.useMutation({ onSuccess, onError })
  const isLoading = createBoard.isLoading || updateBoard.isLoading

  // Handle the form submission
  const onSubmit = (data: BoardSchema) => {
    if (board?.id) {
      return updateBoard.mutate({ ...data, id: board.id })
    }

    return createBoard.mutate({ ...data, workspaceId })
  }

  // Set the slug based on the name
  useComputedField({
    form,
    sourceField: "name",
    computedField: "slug",
    enabled: !isEditing,
    callback: toSlugCase,
  })

  return (
    <FormProvider {...form}>
      <Dialog.Content size="sm" asChild>
        <Form onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <Dialog.Panel sticky asChild>
            <Header size="h4" title={`${isEditing ? "Update" : "Create New"} Board`}>
              <Dialog.Close />
            </Header>
          </Dialog.Panel>

          <Dialog.Panel scrollable>
            <Form.Fieldset>
              <Form.Field control={form.control} name="name" label="Name" required>
                <Form.Input data-1p-ignore />
              </Form.Field>

              <Form.Field control={form.control} name="slug" label="Slug" required>
                <Form.Input />
              </Form.Field>
            </Form.Fieldset>
          </Dialog.Panel>

          <Dialog.Footer>
            <Form.Button loading={isLoading}>{isEditing ? "Update" : "Create"} Board</Form.Button>
            <Dialog.Cancel />
          </Dialog.Footer>
        </Form>
      </Dialog.Content>
    </FormProvider>
  )
}