import { Loader, H5, cx } from "@curiousleaf/design"
import type { ComponentPropsWithoutRef } from "react"
import { toast } from "sonner"

import { StatusForm } from "~/app/app/[company]/settings/statuses/form"
import { DialogConfirm } from "~/components/dialogs/confirm"
import { Button } from "~/components/interface/button"
import { Card, CardActions, CardDraggable, CardPanel } from "~/components/interface/card"
import { DialogContent, DialogRoot, DialogTrigger } from "~/components/interface/dialog"
import { Status } from "~/components/interface/status"
import { useCompany } from "~/providers/company-provider"
import { useSortable } from "~/providers/sortable-provider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

type StatusItemProps = ComponentPropsWithoutRef<typeof Card> & {
  status: RouterOutputs["statuses"]["getAll"][number]
}

export const StatusItem = ({ status, ...props }: StatusItemProps) => {
  const apiUtils = api.useUtils()
  const { id: companyId } = useCompany()
  const { attributes, listeners, isDragging, ref, style } = useSortable({ id: status.id })

  const deleteStatus = api.statuses.delete.useMutation({
    onSuccess: async () => {
      await apiUtils.statuses.getAll.invalidate({ companyId })
      toast.success("Status deleted successfully")
    },
  })

  const defaultStatus = api.statuses.makeDefault.useMutation({
    onSuccess: async () => {
      await apiUtils.statuses.getAll.invalidate({ companyId })
      toast.success("Default status updated successfully")
    },
  })

  return (
    <Card ref={ref} style={style} {...props}>
      <CardPanel theme="gray" flex="row">
        <CardDraggable isDragging={isDragging} {...attributes} {...listeners} />

        <H5 asChild>
          <Status color={status.color}>{status.name}</Status>
        </H5>

        <CardActions>
          <div className="text-2xs order-last mr-2 font-medium md:order-first">
            {status.isDefault && "Default"}

            {!status.isDefault && (
              <button
                className={cx(!defaultStatus.isLoading && "md:hidden md:group-hover/card:flex")}
                onClick={() => defaultStatus.mutate({ id: status.id })}
              >
                {defaultStatus.isLoading ? <Loader /> : "Make Default"}
              </button>
            )}
          </div>

          <DialogRoot>
            <DialogTrigger asChild>
              <Button theme="secondary">Edit</Button>
            </DialogTrigger>

            <DialogContent>
              <StatusForm status={status} />
            </DialogContent>
          </DialogRoot>

          <DialogConfirm
            title="Delete your status?"
            label="Delete Status"
            onConfirm={() => deleteStatus.mutate({ id: status.id })}
          >
            <Button theme="secondary" isLoading={deleteStatus.isLoading} isDanger>
              Delete
            </Button>
          </DialogConfirm>
        </CardActions>
      </CardPanel>
    </Card>
  )
}
