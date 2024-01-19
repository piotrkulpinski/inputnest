import { TriangleIcon } from "lucide-react"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { Button } from "~/components/interface/button"
import { api } from "~/services/trpc"
import { cn } from "~/utils/helpers"

type VotesVoteProps = ComponentPropsWithoutRef<typeof Button> & {
  postId?: string
}

export const VotesVote = forwardRef<ElementRef<typeof Button>, VotesVoteProps>(
  ({ className, postId, ...props }, ref) => {
    const apiUtils = api.useUtils()

    const { data: vote, isLoading: isLoadingVote } = api.votes.get.useQuery(
      { postId: postId! },
      { enabled: !!postId },
    )

    const action = vote ? "delete" : "create"

    const { mutate: toggleUpvote, isLoading } = api.votes[action].useMutation({
      onSuccess: async () => {
        await apiUtils.posts.get.invalidate({ id: postId })
        await apiUtils.posts.getAll.invalidate()
        await apiUtils.votes.get.invalidate({ postId })
        await apiUtils.votes.getAll.invalidate({ postId })
      },
    })

    return (
      <Button
        ref={ref}
        type="button"
        theme="secondary"
        size="sm"
        prefix={<TriangleIcon className="text-[0.75em]" />}
        className={cn("tabular-nums", className)}
        onClick={() => postId && toggleUpvote({ postId })}
        isLoading={isLoadingVote || isLoading}
        isActive={!!vote}
        {...props}
      />
    )
  },
)
