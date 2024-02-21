import { Action, Button, Card, Dialog, Draggable, H5, Series, cx } from "@curiousleaf/design"
import type { ComponentPropsWithoutRef } from "react"
import { toast } from "sonner"

import { BoardForm } from "~/app/app/[workspace]/settings/boards/BoardForm"
import { DialogConfirm } from "~/components/dialogs/DialogConfirm"
import { useSortable } from "~/providers/SortableProvider"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

type BoardItemProps = ComponentPropsWithoutRef<typeof Card> & {
  board: RouterOutputs["boards"]["getAll"][number]
}

export const BoardItem = ({ board, ...props }: BoardItemProps) => {
  const apiUtils = api.useUtils()
  const { id: workspaceId } = useWorkspace()
  const { attributes, listeners, isDragging, ref, style } = useSortable({ id: board.id })

  const deleteBoard = api.boards.delete.useMutation({
    onSuccess: async () => {
      await apiUtils.boards.getAll.invalidate({ workspaceId })
      toast.success("Board deleted successfully")
    },
  })

  const defaultBoard = api.boards.makeDefault.useMutation({
    onSuccess: async () => {
      await apiUtils.boards.getAll.invalidate({ workspaceId })
      toast.success("Default board updated successfully")
    },
  })

  return (
    <Card ref={ref} style={style} className="group/board" {...props}>
      <Card.Row>
        <Series>
          <Draggable dragging={isDragging} {...attributes} {...listeners} />

          <H5>{board.name}</H5>
        </Series>

        <Series>
          <Action
            className={cx(
              "order-last text-2xs font-medium md:order-first",
              board.isDefault ? "pointer-events-none" : "md:hidden md:group-hover/board:flex",
            )}
            loading={defaultBoard.isLoading}
            onClick={() => defaultBoard.mutate({ id: board.id })}
          >
            {board.isDefault ? "Default" : "Make Default"}
          </Action>

          <Dialog>
            <Dialog.Trigger asChild>
              <Button size="md" theme="secondary" variant="outline">
                Edit
              </Button>
            </Dialog.Trigger>

            <BoardForm board={board} />
          </Dialog>

          <DialogConfirm
            title="Delete your board?"
            label="Delete Board"
            onConfirm={() => deleteBoard.mutate({ id: board.id })}
          >
            <Button size="md" theme="negative" variant="outline" loading={deleteBoard.isLoading}>
              Delete
            </Button>
          </DialogConfirm>
        </Series>
      </Card.Row>
    </Card>
  )
}