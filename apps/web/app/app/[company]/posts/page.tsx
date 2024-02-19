"use client"

import { Button, Card, Dialog, Header, Paragraph, Series } from "@curiousleaf/design"
import { PlusIcon } from "lucide-react"

import { PostItem } from "~/app/app/[company]/posts/PostItem"
import { Skeleton } from "~/components/interface/Skeleton"
import { PostCreateForm } from "~/components/posts/forms/PostCreateForm"
import { HeadingCounter } from "~/components/utils/HeadingCounter"
import { QueryCell } from "~/components/utils/QueryCell"
import { useCompany } from "~/providers/CompanyProvider"
import { api } from "~/services/trpc"

export default function Route() {
  const { id: companyId } = useCompany()
  const postsQuery = api.posts.getAll.useQuery({ companyId })

  return (
    <Card>
      <Card.Panel asChild>
        <Header
          title={<HeadingCounter data={postsQuery.data}>Posts</HeadingCounter>}
          description="Posts are used to express a single idea or request."
        >
          <Dialog>
            <Dialog.Trigger asChild>
              <Button theme="secondary" prefix={<PlusIcon />}>
                Create Post
              </Button>
            </Dialog.Trigger>

            <PostCreateForm />
          </Dialog>
        </Header>
      </Card.Panel>

      <Card.Panel>
        <Series direction="column">
          <QueryCell
            query={postsQuery}
            loading={() => Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
            error={() => (
              <Paragraph className="text-red">There was an error loading the posts.</Paragraph>
            )}
            empty={() => (
              <Paragraph className="text-gray-600">No posts added for this company yet.</Paragraph>
            )}
            success={({ data }) => (
              <>
                {data.map(post => (
                  <PostItem key={post.id} post={post} />
                ))}
              </>
            )}
          />
        </Series>
      </Card.Panel>
    </Card>
  )
}
