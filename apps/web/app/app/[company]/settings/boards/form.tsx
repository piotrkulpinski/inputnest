import { Button } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AppRouter } from "@repo/api"
import type { BoardSchema } from "@repo/database"
import { boardSchema, boardDefaults } from "@repo/database"
import type { TRPCClientErrorLike } from "@trpc/client"
import type { HTMLAttributes } from "react"
import { useForm, FormProvider } from "react-hook-form"

import { FormInput } from "~/components/form/controls/input"
import { FormField } from "~/components/form/field"
import { FormFieldset } from "~/components/form/fieldset"
import { BoxHeader, BoxFooter } from "~/components/interface/box"
import { DialogCancel, DialogClose } from "~/components/interface/dialog"
import { useFormSlug } from "~/hooks/use-form-slug"
import { useMutationHandler } from "~/hooks/use-mutation-handler"
import { useCompany } from "~/providers/company-provider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

type BoardFormProps = HTMLAttributes<HTMLFormElement> & {
  board?: RouterOutputs["boards"]["getAll"][number]
}

export const BoardForm = ({ board, ...props }: BoardFormProps) => {
  const apiUtils = api.useUtils()
  const { handleSuccess, handleError } = useMutationHandler()
  const { id: companyId } = useCompany()
  const isEditing = !!board

  const form = useForm<BoardSchema>({
    resolver: zodResolver(boardSchema),
    values: board ?? boardDefaults,
  })

  const onSuccess = async () => {
    // Invalidate the boards cache
    await apiUtils.boards.getAll.invalidate({ companyId })
    await apiUtils.boards.get.invalidate({ id: board?.id, companyId })

    // Redirect with success message
    handleSuccess({
      success: `Board ${isEditing ? "updated" : "created"} successfully`,
    })
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

    return createBoard.mutate({ ...data, companyId })
  }

  // Set the slug based on the name
  useFormSlug({
    form,
    invokerField: "name",
    targetField: "slug",
    enabled: !isEditing,
  })

  return (
    <FormProvider {...form}>
      <form className="contents" onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <BoxHeader title={`${isEditing ? "Update" : "Create New"} Board`}>
          <DialogClose />
        </BoxHeader>

        <FormFieldset>
          <FormField control={form.control} name="name" label="Name" required>
            <FormInput data-1p-ignore />
          </FormField>

          <FormField control={form.control} name="slug" label="Slug" required>
            <FormInput />
          </FormField>
        </FormFieldset>

        <BoxFooter>
          <Button type="submit" theme="secondary" loading={isLoading}>
            {isEditing ? "Update" : "Create"} Board
          </Button>
          <DialogCancel />
        </BoxFooter>
      </form>
    </FormProvider>
  )
}
