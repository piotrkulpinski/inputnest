import { AvatarGroup, AvatarGroupProps, Tooltip } from "@curiousleaf/design"

import { UserAvatar } from "~/components/users/avatar"
import type { RouterOutputs } from "~/services/trpc"

type VotesListProps = AvatarGroupProps & {
  votes: RouterOutputs["votes"]["getAll"]
}

export const VotesList = ({ votes, ...props }: VotesListProps) => {
  return (
    <AvatarGroup size="xs" {...props}>
      {votes.map(({ id, author }) => (
        <Tooltip key={id} tooltip={author.name}>
          <UserAvatar user={author} className="ring-[0.125em] ring-white" />
        </Tooltip>
      ))}
    </AvatarGroup>
  )
}
