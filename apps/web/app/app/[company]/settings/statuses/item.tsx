import type { Status as PrismaStatus } from "@prisma/client"
import { Link } from "@remix-run/react"
import type { ComponentPropsWithoutRef } from "react"
import { toast } from "sonner"

import { DialogConfirm } from "~/components/dialogs/confirm"
import { Button } from "~/components/interface/button"
import { Card, CardActions, CardDraggable, CardPanel } from "~/components/interface/card"
import { H5 } from "~/components/interface/heading"
import { Loader } from "~/components/interface/loader"
import { Status } from "~/components/interface/status"
import { useCompany } from "~/providers/company-provider"
import { useSortable } from "~/providers/sortable-provider"
import { api } from "~/services/trpc"
import { cn } from "~/utils/helpers"

type StatusItemProps = ComponentPropsWithoutRef<typeof Card> & {
  status: PrismaStatus
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
          <div className="order-last mr-2 text-xxs font-medium md:order-first">
            {status.isDefault && "Default"}

            {!status.isDefault && (
              <button
                className={cn(!defaultStatus.isLoading && "md:hidden md:group-hover/card:flex")}
                onClick={() => defaultStatus.mutate({ id: status.id })}
              >
                {defaultStatus.isLoading ? <Loader /> : "Make Default"}
              </button>
            )}
          </div>

          <Button theme="secondary" asChild>
            <Link to={status.id}>Edit</Link>
          </Button>

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
