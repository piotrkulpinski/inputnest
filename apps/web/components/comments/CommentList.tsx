"use client"

import { H5, Paragraph } from "@curiousleaf/design"
import { useParams } from "next/navigation"

import { CommentForm } from "~/components/comments/CommentForm"
import { CommentItem } from "~/components/comments/CommentItem"
import { CommentItemSkeleton } from "~/components/comments/CommentItemSkeleton"
import { CommentTree } from "~/components/comments/CommentTree"
import { HeadingCounter } from "~/components/utils/HeadingCounter"
import { QueryCell } from "~/components/utils/QueryCell"
import { CommentsProvider } from "~/providers/CommentsProvider"
import { api } from "~/services/trpc"
import { buildCommentsTree } from "~/utils/comments"

export const CommentList = () => {
  const { id } = useParams() as { id: string }

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
          <Paragraph className="mt-4 text-red">There was an error loading the comments.</Paragraph>
        )}
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
              {buildCommentsTree(data).map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </CommentTree>
          </CommentsProvider>
        )}
      />
    </>
  )
}
