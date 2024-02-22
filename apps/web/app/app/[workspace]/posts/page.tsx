"use client"

import { Button, Card, Dialog, Header, Paragraph, Series } from "@curiousleaf/design"
import { PlusIcon } from "lucide-react"

import { PostItem } from "~/app/app/[workspace]/posts/PostItem"
import { Skeleton } from "~/components/interface/Skeleton"
import { PostCreateForm } from "~/components/posts/forms/PostCreateForm"
import { HeadingCounter } from "~/components/utils/HeadingCounter"
import { QueryCell } from "~/components/utils/QueryCell"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc/client"

export default function Route() {
  const { id: workspaceId } = useWorkspace()
  const postsQuery = api.posts.getAll.useQuery({ workspaceId })

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
            pending={() => Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
            error={() => (
              <Paragraph className="text-red">There was an error loading the posts.</Paragraph>
            )}
            empty={() => (
              <Paragraph className="text-gray-600">
                No posts added for this workspace yet.
              </Paragraph>
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
