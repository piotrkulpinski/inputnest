import { Avatar, IconStar, Tooltip } from "@curiousleaf/design"
import { User } from "next-auth"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { useWorkspace } from "~/providers/WorkspaceProvider"

type UserAvatarProps = ComponentPropsWithoutRef<typeof Avatar> & {
  user: User
}

export const UserAvatar = forwardRef<ElementRef<typeof Avatar>, UserAvatarProps>((props, ref) => {
  const { members } = useWorkspace()
  const { user, ...rest } = props

  const isMember = members.some(({ userId }) => userId === user.id)

  return (
    <Avatar
      ref={ref}
      src={user.image || ""}
      initials={user.name || ""}
      bottomStatus={
        isMember && (
          <Tooltip tooltip="Team Member">
            <IconStar className="size-[0.95em] rounded-full bg-blue p-0.5 text-white grayscale-[35%]" />
          </Tooltip>
        )
      }
      {...rest}
    />
  )
})
