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
import { TagItem } from "~/routes/$company.settings.tags/item"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

const CompanySettingsTags = () => {
  const apiUtils = api.useUtils()
  const { id: companyId } = useCompany()
  const [tags, setTags] = useState<RouterOutputs["tags"]["getAll"]>([])

  const tagsQuery = api.tags.getAll.useQuery({ companyId })

  const { mutate: reorderTags } = api.tags.reorder.useMutation({
    onSuccess: async () => {
      await apiUtils.tags.getAll.invalidate({ companyId })
    },
  })

  const move = (ids: string[]) => {
    setTags(tags.slice().sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)))

    // Update the order of the tags
    reorderTags({ ids })
  }

  // Update the tags when the loader data changes
  useEffect(() => {
    tagsQuery.isSuccess && setTags(tagsQuery.data)
  }, [tagsQuery.data])

  return (
    <>
      <Box>
        <BoxHeader
          title={<HeadingCounter data={tagsQuery.data}>Tags</HeadingCounter>}
          description="Customize existing ones or add extra tags you can add for posts."
        >
          <Button size="md" prefix={<IconPlus />} asChild>
            <Link to="new">Create Tag</Link>
          </Button>
        </BoxHeader>

        <div className="flex flex-col gap-4 md:gap-6">
          <QueryCell
            query={tagsQuery}
            loading={() => Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
            error={() => <Copy>There was an error loading the tags.</Copy>}
            empty={() => <Copy>No tags added for this company yet.</Copy>}
            success={() => (
              <SortableProvider items={tags.map(({ id }) => id)} onDragEnd={move}>
                {tags.map((tag) => (
                  <TagItem key={tag.id} tag={tag} />
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

export default CompanySettingsTags
