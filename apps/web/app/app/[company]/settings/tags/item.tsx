import type { ComponentPropsWithoutRef } from "react"
import { toast } from "sonner"

import { TagForm } from "~/app/app/[company]/settings/tags/form"
import { DialogConfirm } from "~/components/dialogs/confirm"
import { Button } from "~/components/interface/button"
import { Card, CardActions, CardDraggable, CardPanel } from "~/components/interface/card"
import { DialogContent, DialogRoot, DialogTrigger } from "~/components/interface/dialog"
import { H5 } from "~/components/interface/heading"
import { Status } from "~/components/interface/status"
import { useCompany } from "~/providers/company-provider"
import { useSortable } from "~/providers/sortable-provider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

type TagItemProps = ComponentPropsWithoutRef<typeof Card> & {
  tag: RouterOutputs["tags"]["getAll"][number]
}

export const TagItem = ({ tag, ...props }: TagItemProps) => {
  const apiUtils = api.useUtils()
  const { id: companyId } = useCompany()
  const { attributes, listeners, isDragging, ref, style } = useSortable({ id: tag.id })

  const deleteTag = api.tags.delete.useMutation({
    onSuccess: async () => {
      await apiUtils.tags.getAll.invalidate({ companyId })
      toast.success("Tag deleted successfully")
    },
  })

  return (
    <Card ref={ref} style={style} {...props}>
      <CardPanel theme="gray" flex="row">
        <CardDraggable isDragging={isDragging} {...attributes} {...listeners} />

        <H5 asChild>
          <Status color={tag.color}>{tag.name}</Status>
        </H5>

        <CardActions>
          <DialogRoot>
            <DialogTrigger asChild>
              <Button theme="secondary">Edit</Button>
            </DialogTrigger>

            <DialogContent>
              <TagForm tag={tag} />
            </DialogContent>
          </DialogRoot>

          <DialogConfirm
            title="Delete your tag?"
            label="Delete Tag"
            onConfirm={() => deleteTag.mutate({ id: tag.id })}
          >
            <Button theme="secondary" isLoading={deleteTag.isLoading} isDanger>
              Delete
            </Button>
          </DialogConfirm>
        </CardActions>
      </CardPanel>
    </Card>
  )
}
