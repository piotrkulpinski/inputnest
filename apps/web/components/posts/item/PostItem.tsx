"use client"

import { Avatar, Card, Dot, Series, Sidebar } from "@curiousleaf/design"
import { notFound } from "next/navigation"
import type { HTMLAttributes } from "react"

import { Shimmer } from "~/components/interface/Shimmer"
import { PostItemComments } from "~/components/posts/item/PostItemComments"
import { PostItemContent } from "~/components/posts/item/PostItemContent"
import { PostItemHead } from "~/components/posts/item/PostItemHead"
import { PostItemSidebar } from "~/components/posts/item/PostItemSidebar"
import { QueryCell } from "~/components/utils/QueryCell"
import { useCompany } from "~/providers/CompanyProvider"
import { PostProvider } from "~/providers/PostProvider"
import { api } from "~/services/trpc"

type PostItemProps = HTMLAttributes<HTMLElement> & {
  id: string
}

export const PostItem = ({ id, ...props }: PostItemProps) => {
  const { id: companyId } = useCompany()
  const postQuery = api.posts.get.useQuery({ id, companyId }, { enabled: !!id })

  return (
    <QueryCell
      query={postQuery}
      loading={() => <PostItemSkeleton />}
      error={() => notFound()}
      success={({ data }) => (
        <PostProvider post={data}>
          <Card {...props}>
            <PostItemHead />

            <div className="flex flex-col border-t md:flex-row">
              <div className="flex grow flex-col divide-y">
                <PostItemContent />
                <PostItemComments />
              </div>

              <PostItemSidebar />
            </div>
          </Card>
        </PostProvider>
      )}
    />
  )
}

const PostItemSkeleton = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <Card {...props}>
      <Card.Row>
        <div className="mr-auto h-6 w-1/3 rounded bg-current opacity-10" />
      </Card.Row>

      <div className="flex flex-col border-t md:flex-row">
        <div className="flex grow flex-col divide-y">
          <Card.Panel>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="h-5 w-3/4 rounded bg-current opacity-5" />
                <div className="h-5 w-3/4 rounded bg-current opacity-5" />
                <div className="h-5 w-3/4 rounded bg-current opacity-5" />
                <div className="h-5 w-3/4 rounded bg-current opacity-5" />
                <div className="h-5 w-1/2 rounded bg-current opacity-5" />
              </div>

              <Series className="mt-2 text-sm">
                <Avatar className="grayscale" />
                <div className="h-5 w-24 rounded bg-current opacity-5" />
                <Dot className="text-gray-200" />
                <div className="h-5 w-20 rounded bg-current opacity-5" />
              </Series>
            </div>
          </Card.Panel>

          <PostItemComments />
        </div>

        <Sidebar size="lg" className="h-auto max-md:static max-md:w-auto" />
      </div>

      <Shimmer className="!border-t-0" />
    </Card>
  )
}
