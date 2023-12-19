import type { ComponentPropsWithoutRef } from "react"
import { toast } from "sonner"

import { BoardForm } from "~/app/app/[company]/settings/boards/form"
import { DialogConfirm } from "~/components/dialogs/confirm"
import { Button } from "~/components/interface/button"
import { Card, CardActions, CardDraggable, CardPanel } from "~/components/interface/card"
import { DialogContent, DialogRoot, DialogTrigger } from "~/components/interface/dialog"
import { H5 } from "~/components/interface/heading"
import { Loader } from "~/components/interface/loader"
import { useCompany } from "~/providers/company-provider"
import { useSortable } from "~/providers/sortable-provider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"
import { cn } from "~/utils/helpers"

type BoardItemProps = ComponentPropsWithoutRef<typeof Card> & {
  board: RouterOutputs["boards"]["getAll"][number]
}

export const BoardItem = ({ board, ...props }: BoardItemProps) => {
  const apiUtils = api.useUtils()
  const { id: companyId } = useCompany()
  const { attributes, listeners, isDragging, ref, style } = useSortable({ id: board.id })

  const deleteBoard = api.boards.delete.useMutation({
    onSuccess: async () => {
      await apiUtils.boards.getAll.invalidate({ companyId })
      toast.success("Board deleted successfully")
    },
  })

  const defaultBoard = api.boards.makeDefault.useMutation({
    onSuccess: async () => {
      await apiUtils.boards.getAll.invalidate({ companyId })
      toast.success("Default board updated successfully")
    },
  })

  return (
    <Card ref={ref} style={style} {...props}>
      <CardPanel theme="gray" flex="row">
        <CardDraggable isDragging={isDragging} {...attributes} {...listeners} />

        <H5>{board.name}</H5>

        <CardActions>
          <div className="order-last mr-2 text-xxs font-medium md:order-first">
            {board.isDefault && "Default"}

            {!board.isDefault && (
              <button
                className={cn(!defaultBoard.isLoading && "md:hidden md:group-hover/card:flex")}
                onClick={() => defaultBoard.mutate({ id: board.id })}
              >
                {defaultBoard.isLoading ? <Loader /> : "Make Default"}
              </button>
            )}
          </div>

          <DialogRoot>
            <DialogTrigger asChild>
              <Button theme="secondary">Edit</Button>
            </DialogTrigger>

            <DialogContent>
              <BoardForm board={board} />
            </DialogContent>
          </DialogRoot>

          <DialogConfirm
            title="Delete your board?"
            label="Delete Board"
            onConfirm={() => deleteBoard.mutate({ id: board.id })}
          >
            <Button theme="secondary" isLoading={deleteBoard.isLoading} isDanger>
              Delete
            </Button>
          </DialogConfirm>
        </CardActions>
      </CardPanel>
    </Card>
  )
}
