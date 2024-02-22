import { AvatarGroup, AvatarGroupProps, Tooltip } from "@curiousleaf/design"
import { RouterOutputs } from "@inputnest/api"

import { UserAvatar } from "~/components/users/UserAvatar"

type VotesListProps = AvatarGroupProps & {
  votes: RouterOutputs["votes"]["getAll"]
}

export const VotesList = ({ votes, ...props }: VotesListProps) => {
  return (
    <AvatarGroup size="sm" {...props}>
      {votes.map(({ id, author }) => (
        <Tooltip key={id} tooltip={author.name}>
          <UserAvatar user={author} className="ring-[0.125em] ring-white" />
        </Tooltip>
      ))}
    </AvatarGroup>
  )
}
