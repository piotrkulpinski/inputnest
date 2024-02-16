"use client"

import { Button, Dialog, Header, Paragraph, Section } from "@curiousleaf/design"
import { PlusIcon } from "lucide-react"

import { PostItem } from "~/app/app/[company]/posts/item"
import { Skeleton } from "~/components/interface/skeleton"
import { PostCreateForm } from "~/components/posts/forms/create"
import { HeadingCounter } from "~/components/utils/heading-counter"
import { QueryCell } from "~/components/utils/query-cell"
import { useCompany } from "~/providers/company-provider"
import { api } from "~/services/trpc"

export default function Route() {
  const { id: companyId } = useCompany()
  const postsQuery = api.posts.getAll.useQuery({ companyId })

  return (
    <Section>
      <Header title={<HeadingCounter data={postsQuery.data}>Posts</HeadingCounter>}>
        <Dialog>
          <Dialog.Trigger asChild>
            <Button theme="secondary" prefix={<PlusIcon />}>
              Create Post
            </Button>
          </Dialog.Trigger>

          <PostCreateForm />
        </Dialog>
      </Header>

      <div className="flex flex-col -space-y-px">
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
      </div>
    </Section>
  )
}
