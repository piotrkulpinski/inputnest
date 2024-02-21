import { Button, Card, Dialog, Draggable, H5, Series } from "@curiousleaf/design"
import type { ComponentPropsWithoutRef } from "react"
import { toast } from "sonner"

import { TagForm } from "~/app/app/[workspace]/settings/tags/TagForm"
import { DialogConfirm } from "~/components/dialogs/DialogConfirm"
import { Status } from "~/components/interface/Status"
import { useSortable } from "~/providers/SortableProvider"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

type TagItemProps = ComponentPropsWithoutRef<typeof Card> & {
  tag: RouterOutputs["tags"]["getAll"][number]
}

export const TagItem = ({ tag, ...props }: TagItemProps) => {
  const apiUtils = api.useUtils()
  const { id: workspaceId } = useWorkspace()
  const { attributes, listeners, isDragging, ref, style } = useSortable({ id: tag.id })

  const deleteTag = api.tags.delete.useMutation({
    onSuccess: async () => {
      await apiUtils.tags.getAll.invalidate({ workspaceId })
      toast.success("Tag deleted successfully")
    },
  })

  return (
    <Card ref={ref} style={style} className="group/tag" {...props}>
      <Card.Row theme="gray">
        <Series>
          <Draggable dragging={isDragging} {...attributes} {...listeners} />

          <H5 asChild>
            <Status color={tag.color}>{tag.name}</Status>
          </H5>
        </Series>

        <Series>
          <Dialog>
            <Dialog.Trigger asChild>
              <Button size="md" theme="secondary" variant="outline">
                Edit
              </Button>
            </Dialog.Trigger>

            <TagForm tag={tag} />
          </Dialog>

          <DialogConfirm
            title="Delete your tag?"
            label="Delete Tag"
            onConfirm={() => deleteTag.mutate({ id: tag.id })}
          >
            <Button size="md" theme="negative" variant="outline" loading={deleteTag.isLoading}>
              Delete
            </Button>
          </DialogConfirm>
        </Series>
      </Card.Row>
    </Card>
  )
}
