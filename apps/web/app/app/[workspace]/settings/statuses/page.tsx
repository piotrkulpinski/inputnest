"use client"

import { Button, Card, Dialog, Header, Paragraph, Series } from "@curiousleaf/design"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"

import { StatusForm } from "~/app/app/[workspace]/settings/statuses/StatusForm"
import { StatusItem } from "~/app/app/[workspace]/settings/statuses/StatusItem"
import { Skeleton } from "~/components/interface/Skeleton"
import { HeadingCounter } from "~/components/utils/HeadingCounter"
import { QueryCell } from "~/components/utils/QueryCell"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { SortableProvider } from "~/providers/SortableProvider"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { type RouterOutputs, api } from "~/services/trpc"

export default function Route() {
  const apiUtils = api.useUtils()
  const { id: workspaceId } = useWorkspace()
  const { handleSuccess } = useMutationHandler()
  const [statuses, setStatuses] = useState<RouterOutputs["statuses"]["getAll"]>([])

  const statusesQuery = api.statuses.getAll.useQuery({ workspaceId })

  const { mutate: reorderStatuses } = api.statuses.reorder.useMutation({
    onSuccess: async () => {
      handleSuccess({ success: "Statuses reordered successfully" })

      // Invalidate the statuses cache
      await apiUtils.statuses.getAll.invalidate({ workspaceId })
    },
  })

  const move = (ids: string[]) => {
    setStatuses(statuses.slice().sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)))

    // Update the order of the statuses
    reorderStatuses({ ids })
  }

  // Update the statuses when the loader data changes
  useEffect(() => {
    statusesQuery.isSuccess && setStatuses(statusesQuery.data)
  }, [statusesQuery.isSuccess, statusesQuery.data])

  return (
    <Card>
      <Card.Panel asChild>
        <Header
          title={<HeadingCounter data={statusesQuery.data}>Statuses</HeadingCounter>}
          description="Customize existing ones or add extra statuses you can add for posts."
        >
          <Dialog>
            <Dialog.Trigger asChild>
              <Button theme="secondary" prefix={<PlusIcon />}>
                Create Status
              </Button>
            </Dialog.Trigger>

            <StatusForm />
          </Dialog>
        </Header>
      </Card.Panel>

      <Card.Panel>
        <Series size="lg" direction="column">
          <QueryCell
            query={statusesQuery}
            loading={() => Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
            error={() => (
              <Paragraph className="text-red">There was an error loading the statuses.</Paragraph>
            )}
            empty={() => (
              <Paragraph className="text-gray-600">
                No statuses added for this workspace yet.
              </Paragraph>
            )}
            success={() => (
              <SortableProvider items={statuses.map(({ id }) => id)} onDragEnd={move}>
                {statuses.map(status => (
                  <StatusItem key={status.id} status={status} />
                ))}
              </SortableProvider>
            )}
          />
        </Series>
      </Card.Panel>
    </Card>
  )
}
