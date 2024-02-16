import { Button, cx } from "@curiousleaf/design"
import { TriangleIcon } from "lucide-react"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { api } from "~/services/trpc"

type VotesVoteProps = ComponentPropsWithoutRef<typeof Button> & {
  postId?: string
}

export const VotesVote = forwardRef<ElementRef<typeof Button>, VotesVoteProps>((props, ref) => {
  const { className, postId, ...rest } = props
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
      size="md"
      theme="secondary"
      variant="outline"
      prefix={<TriangleIcon className="text-[0.75em]" />}
      className={cx(
        "tabular-nums",
        !!vote && "border-primary bg-primary-lighter text-primary-dark",
        className,
      )}
      onClick={() => postId && toggleUpvote({ postId })}
      loading={isLoadingVote || isLoading}
      {...rest}
    />
  )
})
