import { Tooltip, cx } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { UserAvatar } from "~/components/users/avatar"
import type { RouterOutputs } from "~/services/trpc"

type VotesListProps = HTMLAttributes<HTMLElement> & {
  votes: RouterOutputs["votes"]["getAll"]
}

export const VotesList = ({ className, votes, ...props }: VotesListProps) => {
  return (
    <div className={cx("relative flex -space-x-1", className)} {...props}>
      {votes.map(({ id, author }) => (
        <Tooltip key={id} tooltip={author.name}>
          <UserAvatar key={id} user={author} size="lg" className="ring-2 ring-white" />
        </Tooltip>
      ))}
    </div>
  )
}
