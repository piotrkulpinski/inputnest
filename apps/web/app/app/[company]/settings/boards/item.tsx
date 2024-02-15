import { Loader, H5, Button, cx } from "@curiousleaf/design"
import type { ComponentPropsWithoutRef } from "react"
import { toast } from "sonner"

import { BoardForm } from "~/app/app/[company]/settings/boards/form"
import { DialogConfirm } from "~/components/dialogs/confirm"
import { Card, CardActions, CardDraggable, CardPanel } from "~/components/interface/card"
import { DialogContent, DialogRoot, DialogTrigger } from "~/components/interface/dialog"
import { useCompany } from "~/providers/company-provider"
import { useSortable } from "~/providers/sortable-provider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

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
          <div className="text-2xs order-last mr-2 font-medium md:order-first">
            {board.isDefault && "Default"}

            {!board.isDefault && (
              <button
                className={cx(!defaultBoard.isLoading && "md:hidden md:group-hover/card:flex")}
                onClick={() => defaultBoard.mutate({ id: board.id })}
              >
                {defaultBoard.isLoading ? <Loader /> : "Make Default"}
              </button>
            )}
          </div>

          <DialogRoot>
            <DialogTrigger asChild>
              <Button theme="secondary" variant="outline">Edit</Button>
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
            <Button theme="negative" variant="outline" loading={deleteBoard.isLoading}>
              Delete
            </Button>
          </DialogConfirm>
        </CardActions>
      </CardPanel>
    </Card>
  )
}
