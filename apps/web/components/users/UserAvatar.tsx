import { Avatar, IconStar, Tooltip } from "@curiousleaf/design"
import { User } from "next-auth"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { useCompany } from "~/providers/CompanyProvider"
import { getImage } from "~/utils/images"

type UserAvatarProps = ComponentPropsWithoutRef<typeof Avatar> & {
  user: User
}

export const UserAvatar = forwardRef<ElementRef<typeof Avatar>, UserAvatarProps>((props, ref) => {
  const { members } = useCompany()
  const { user, ...rest } = props

  const isMember = members.some(({ userId }) => userId === user.id)
  const src = getImage({ image: user.image, width: 96, height: 96 })

  return (
    <Avatar
      ref={ref}
      src={src}
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
