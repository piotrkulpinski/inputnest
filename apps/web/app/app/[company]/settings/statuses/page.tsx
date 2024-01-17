"use client"

import { Paragraph } from "@curiousleaf/design"
import { IconPlus } from "@tabler/icons-react"
import { useState, useEffect } from "react"

import { StatusForm } from "~/app/app/[company]/settings/statuses/form"
import { StatusItem } from "~/app/app/[company]/settings/statuses/item"
import { Box, BoxHeader } from "~/components/interface/box"
import { Button } from "~/components/interface/button"
import { DialogContent, DialogRoot, DialogTrigger } from "~/components/interface/dialog"
import { Skeleton } from "~/components/interface/skeleton"
import { HeadingCounter } from "~/components/utils/heading-counter"
import { QueryCell } from "~/components/utils/query-cell"
import { useCompany } from "~/providers/company-provider"
import { SortableProvider } from "~/providers/sortable-provider"
import { api, type RouterOutputs } from "~/services/trpc"

const CompanySettingsStatuses = () => {
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
    <Box>
      <BoxHeader
        title={<HeadingCounter data={statusesQuery.data}>Statuses</HeadingCounter>}
        description="Customize existing ones or add extra statuses you can add for posts."
      >
        <DialogRoot>
          <DialogTrigger asChild>
            <Button size="md" prefix={<IconPlus />}>
              Create Status
            </Button>
          </DialogTrigger>

          <DialogContent>
            <StatusForm />
          </DialogContent>
        </DialogRoot>
      </BoxHeader>

      <div className="flex flex-col gap-4 md:gap-6">
        <QueryCell
          query={statusesQuery}
          loading={() => Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
          error={() => <Paragraph>There was an error loading the statuses.</Paragraph>}
          empty={() => <Paragraph>No statuses added for this company yet.</Paragraph>}
          success={() => (
            <SortableProvider items={statuses.map(({ id }) => id)} onDragEnd={move}>
              {statuses.map((status) => (
                <StatusItem key={status.id} status={status} />
              ))}
            </SortableProvider>
          )}
        />
      </div>
    </Box>
  )
}

export default CompanySettingsStatuses
