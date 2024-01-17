"use client"

import { H5, Paragraph } from "@curiousleaf/design"
import { useParams } from "next/navigation"

import { CommentForm } from "~/components/comments/form"
import { CommentItem } from "~/components/comments/item"
import { CommentItemSkeleton } from "~/components/comments/skeleton"
import { CommentTree } from "~/components/comments/tree"
import { HeadingCounter } from "~/components/utils/heading-counter"
import { QueryCell } from "~/components/utils/query-cell"
import { CommentsProvider } from "~/providers/comments-provider"
import { api } from "~/services/trpc"
import { buildCommentsTree } from "~/utils/comments"

export const CommentList = () => {
  const { id } = useParams()

  const commentsQuery = api.comments.getAll.useQuery({ postId: id! }, { enabled: !!id })

  return (
    <>
      <H5>
        <HeadingCounter data={commentsQuery.data}>Comments</HeadingCounter>
      </H5>

      <CommentForm isLoading={commentsQuery.isLoading} />

      <QueryCell
        query={commentsQuery}
        error={() => (
          <Paragraph className="mt-4">There was an error loading the comments.</Paragraph>
        )}
        empty={() => <Paragraph className="mt-4">No one has commented yet.</Paragraph>}
        loading={() => (
          <CommentTree>
            {Array.from({ length: 2 }).map((_, i) => (
              <CommentItemSkeleton key={i} />
            ))}
          </CommentTree>
        )}
        success={({ data }) => (
          <CommentsProvider>
            <CommentTree>
              {buildCommentsTree(data).map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </CommentTree>
          </CommentsProvider>
        )}
      />
    </>
  )
}
