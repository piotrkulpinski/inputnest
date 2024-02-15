"use client"

import { Series } from "@curiousleaf/design"
import { notFound } from "next/navigation"
import type { HTMLAttributes } from "react"

import { Avatar } from "~/components/interface/avatar"
import { Card, CardPanel } from "~/components/interface/card"
import { Dot } from "~/components/interface/dot"
import { Shimmer } from "~/components/interface/shimmer"
import { PostItemComments } from "~/components/posts/item/comments"
import { PostItemContent } from "~/components/posts/item/content"
import { PostItemHead } from "~/components/posts/item/head"
import { PostItemSidebar } from "~/components/posts/item/sidebar"
import { QueryCell } from "~/components/utils/query-cell"
import { VotesVote } from "~/components/votes/vote"
import { useCompany } from "~/providers/company-provider"
import { PostProvider } from "~/providers/post-provider"
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

            <div className="flex flex-col md:flex-row">
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
      <CardPanel flex="row">
        <VotesVote disabled>0</VotesVote>
        <div className="h-6 w-1/3 rounded bg-current opacity-10" />
      </CardPanel>

      <div className="flex flex-col md:flex-row">
        <div className="flex grow flex-col divide-y">
          <CardPanel>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="h-5 w-3/4 rounded bg-current opacity-5" />
                <div className="h-5 w-3/4 rounded bg-current opacity-5" />
                <div className="h-5 w-3/4 rounded bg-current opacity-5" />
                <div className="h-5 w-3/4 rounded bg-current opacity-5" />
                <div className="h-5 w-1/2 rounded bg-current opacity-5" />
              </div>

              <Series className="mt-2">
                <Avatar />
                <div className="h-5 w-24 rounded bg-current opacity-5" />
                <Dot theme="gray" className="opacity-5" />
                <div className="h-5 w-20 rounded bg-current opacity-5" />
              </Series>
            </div>
          </CardPanel>

          <PostItemComments />
        </div>

        <CardPanel className="border max-md:border-t md:w-72 md:shrink-0 md:border-l" />
      </div>

      <Shimmer className="!border-t-0" />
    </Card>
  )
}
