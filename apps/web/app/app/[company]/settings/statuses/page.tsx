import { Link, Outlet } from "@remix-run/react"
import { IconPlus } from "@tabler/icons-react"
import { useState, useEffect } from "react"

import { Box, BoxHeader } from "~/components/interface/box"
import { Button } from "~/components/interface/button"
import { Copy } from "~/components/interface/copy"
import { Skeleton } from "~/components/interface/skeleton"
import { HeadingCounter } from "~/components/utils/heading-counter"
import { QueryCell } from "~/components/utils/query-cell"
import { useCompany } from "~/providers/company-provider"
import { SortableProvider } from "~/providers/sortable-provider"
import { StatusItem } from "~/routes/$company.settings.statuses/item"
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
    <>
      <Box>
        <BoxHeader
          title={<HeadingCounter data={statusesQuery.data}>Statuses</HeadingCounter>}
          description="Customize existing ones or add extra statuses you can add for posts."
        >
          <Button size="md" prefix={<IconPlus />} asChild>
            <Link to="new">Create Status</Link>
          </Button>
        </BoxHeader>

        <div className="flex flex-col gap-4 md:gap-6">
          <QueryCell
            query={statusesQuery}
            loading={() => Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
            error={() => <Copy>There was an error loading the statuses.</Copy>}
            empty={() => <Copy>No statuses added for this company yet.</Copy>}
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

      <Outlet />
    </>
  )
}

export default CompanySettingsStatuses
