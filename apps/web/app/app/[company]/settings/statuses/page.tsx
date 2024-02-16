"use client"

import { Button, Card, Dialog, Header, Paragraph } from "@curiousleaf/design"
import { PlusIcon } from "lucide-react"
import { useState, useEffect } from "react"

import { StatusForm } from "~/app/app/[company]/settings/statuses/form"
import { StatusItem } from "~/app/app/[company]/settings/statuses/item"
import { Skeleton } from "~/components/interface/skeleton"
import { HeadingCounter } from "~/components/utils/heading-counter"
import { QueryCell } from "~/components/utils/query-cell"
import { useCompany } from "~/providers/company-provider"
import { SortableProvider } from "~/providers/sortable-provider"
import { api, type RouterOutputs } from "~/services/trpc"

export default function Route() {
  const apiUtils = api.useUtils()
  const { id: companyId } = useCompany()
  const [statuses, setStatuses] = useState<RouterOutputs["statuses"]["getAll"]>([])

  const statusesQuery = api.statuses.getAll.useQuery({ companyId })

  const { mutate: reorderStatuses } = api.statuses.reorder.useMutation({
    onSuccess: async () => {
      await apiUtils.statuses.getAll.invalidate({ companyId })
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
  }, [statusesQuery.data])

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

      <Card.Section>
        <QueryCell
          query={statusesQuery}
          loading={() => Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
          error={() => <Paragraph>There was an error loading the statuses.</Paragraph>}
          empty={() => <Paragraph>No statuses added for this company yet.</Paragraph>}
          success={() => (
            <SortableProvider items={statuses.map(({ id }) => id)} onDragEnd={move}>
              {statuses.map(status => (
                <StatusItem key={status.id} status={status} />
              ))}
            </SortableProvider>
          )}
        />
      </Card.Section>
    </Card>
  )
}
