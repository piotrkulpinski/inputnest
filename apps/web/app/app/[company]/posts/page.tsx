"use client"

import { Button, Header, Paragraph, Section } from "@curiousleaf/design"
import { PlusIcon } from "lucide-react"

import { PostItem } from "~/app/app/[company]/posts/item"
import { DialogContent, DialogRoot, DialogTrigger } from "~/components/interface/dialog"
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
        <DialogRoot>
          <DialogTrigger asChild>
            <Button theme="secondary" prefix={<PlusIcon />}>
              Create Post
            </Button>
          </DialogTrigger>

          <DialogContent size="md" asChild>
            <PostCreateForm />
          </DialogContent>
        </DialogRoot>
      </Header>

      <div className="flex flex-col -space-y-px">
        <QueryCell
          query={postsQuery}
          loading={() => Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}
          error={() => <Paragraph>There was an error loading the posts.</Paragraph>}
          empty={() => <Paragraph>No posts added for this company yet.</Paragraph>}
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