import type { HTMLAttributes } from "react"

import { Tooltip } from "~/components/interface/tooltip"
import { UserAvatar } from "~/components/users/avatar"
import type { RouterOutputs } from "~/services/trpc"
import { cn } from "~/utils/helpers"

type VotesListProps = HTMLAttributes<HTMLElement> & {
  votes: RouterOutputs["votes"]["getAll"]
}

export const VotesList = ({ className, votes, ...props }: VotesListProps) => {
  return (
    <div className={cn("relative flex -space-x-1", className)} {...props}>
      {votes.map(({ id, author }) => (
        <Tooltip key={id} content={author.name} side="top">
          <UserAvatar key={id} user={author} size="lg" className="ring-2 ring-white" />
        </Tooltip>
      ))}
    </div>
  )
}
