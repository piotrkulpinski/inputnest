"use client"

import { Button, Card, Dialog, Header, Paragraph, Series } from "@curiousleaf/design"
import { PlusIcon } from "lucide-react"
import { useState, useEffect } from "react"

import { TagForm } from "~/app/app/[company]/settings/tags/TagForm"
import { TagItem } from "~/app/app/[company]/settings/tags/TagItem"
import { Skeleton } from "~/components/interface/Skeleton"
import { HeadingCounter } from "~/components/utils/HeadingCounter"
import { QueryCell } from "~/components/utils/QueryCell"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useCompany } from "~/providers/CompanyProvider"
import { SortableProvider } from "~/providers/SortableProvider"
import type { RouterOutputs } from "~/services/trpc"
import { api } from "~/services/trpc"

export default function Route() {
  const apiUtils = api.useUtils()
  const { id: companyId } = useCompany()
  const { handleSuccess } = useMutationHandler()
  const [tags, setTags] = useState<RouterOutputs["tags"]["getAll"]>([])

  const tagsQuery = api.tags.getAll.useQuery({ companyId })

  const { mutate: reorderTags } = api.tags.reorder.useMutation({
    onSuccess: async () => {
      handleSuccess({ success: "Tags reordered successfully" })

      // Invalidate the tags cache
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
  }, [tagsQuery.isSuccess, tagsQuery.data])

  return (
    <Card>
      <Card.Panel asChild>
        <Header
          title={<HeadingCounter data={tagsQuery.data}>Tags</HeadingCounter>}
          description="Customize existing ones or add extra tags you can add for posts."
        >
          <Dialog>
            <Dialog.Trigger asChild>
              <Button theme="secondary" prefix={<PlusIcon />}>
                Create Tag
              </Button>
            </Dialog.Trigger>

            <TagForm />
          </Dialog>
        </Header>
      </Card.Panel>

      <Card.Panel>
        <Series size="lg" direction="column">
          <QueryCell
            query={tagsQuery}
            loading={() => Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
            error={() => (
              <Paragraph className="text-red">There was an error loading the tags.</Paragraph>
            )}
            empty={() => (
              <Paragraph className="text-gray-600">No tags added for this company yet.</Paragraph>
            )}
            success={() => (
              <SortableProvider items={tags.map(({ id }) => id)} onDragEnd={move}>
                {tags.map(tag => (
                  <TagItem key={tag.id} tag={tag} />
                ))}
              </SortableProvider>
            )}
          />
        </Series>
      </Card.Panel>
    </Card>
  )
}
