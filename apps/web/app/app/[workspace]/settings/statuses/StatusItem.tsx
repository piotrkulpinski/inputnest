import { Action, Button, Card, Dialog, Draggable, H5, Series, cx } from "@curiousleaf/design"
import { RouterOutputs } from "@inputnest/api"
import type { ComponentPropsWithoutRef } from "react"
import { toast } from "sonner"

import { StatusForm } from "~/app/app/[workspace]/settings/statuses/StatusForm"
import { DialogConfirm } from "~/components/dialogs/DialogConfirm"
import { Status } from "~/components/interface/Status"
import { useSortable } from "~/providers/SortableProvider"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc/client"

type StatusItemProps = ComponentPropsWithoutRef<typeof Card> & {
  status: RouterOutputs["statuses"]["getAll"][number]
}

export const StatusItem = ({ status, ...props }: StatusItemProps) => {
  const apiUtils = api.useUtils()
  const { id: workspaceId } = useWorkspace()
  const { attributes, listeners, isDragging, ref, style } = useSortable({ id: status.id })

  const deleteStatus = api.statuses.delete.useMutation({
    onSuccess: async () => {
      await apiUtils.statuses.getAll.invalidate({ workspaceId })
      toast.success("Status deleted successfully")
    },
  })

  const defaultStatus = api.statuses.makeDefault.useMutation({
    onSuccess: async () => {
      await apiUtils.statuses.getAll.invalidate({ workspaceId })
      toast.success("Default status updated successfully")
    },
  })

  return (
    <Card ref={ref} style={style} className="group/status" {...props}>
      <Card.Row theme="gray">
        <Series>
          <Draggable dragging={isDragging} {...attributes} {...listeners} />

          <H5 asChild>
            <Status color={status.color}>{status.name}</Status>
          </H5>
        </Series>

        <Series>
          <Action
            className={cx(
              "order-last text-2xs font-medium md:order-first",
              status.isDefault ? "pointer-events-none" : "md:hidden md:group-hover/status:flex",
            )}
            isPending={defaultStatus.isPending}
            onClick={() => defaultStatus.mutate({ id: status.id })}
          >
            {status.isDefault ? "Default" : "Make Default"}
          </Action>

          <Dialog>
            <Dialog.Trigger asChild>
              <Button size="md" theme="secondary" variant="outline">
                Edit
              </Button>
            </Dialog.Trigger>

            <StatusForm status={status} />
          </Dialog>

          <DialogConfirm
            title="Delete your status?"
            label="Delete Status"
            onConfirm={() => deleteStatus.mutate({ id: status.id })}
          >
            <Button size="md" theme="negative" variant="outline" isPending={deleteStatus.isPending}>
              Delete
            </Button>
          </DialogConfirm>
        </Series>
      </Card.Row>
    </Card>
  )
}
