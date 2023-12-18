import { getInitials } from "@curiousleaf/utils"
import type { Profile } from "@prisma/client"
import { IconStarFilled } from "@tabler/icons-react"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { Avatar } from "~/components/interface/avatar"
import { useCompany } from "~/providers/company-provider"

type UserAvatarProps = ComponentPropsWithoutRef<typeof Avatar> & {
  user: Profile
}

export const UserAvatar = forwardRef<ElementRef<typeof Avatar>, UserAvatarProps>((props, ref) => {
  const { members } = useCompany()
  const { user, ...rest } = props

  const isMember = members.some(({ userId }) => userId === user.id)

  return (
    <Avatar ref={ref} src={user.imageUrl} fallback={getInitials(user.name)} {...rest}>
      {isMember && (
        <IconStarFilled className="absolute -bottom-1 -right-1 rounded-full bg-blue-500 p-0.5 text-[0.675em] text-white ring-2 ring-current grayscale-[35%]" />
      )}
    </Avatar>
  )
})
