import { useClerk, useUser } from "@clerk/nextjs"
import { IconLogout, IconMessage, IconUser } from "@tabler/icons-react"
import type { HTMLAttributes } from "react"
import { useState } from "react"

import { Blurb } from "~/components/interface/blurb"
import {
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownRoot,
  DropdownTrigger,
} from "~/components/interface/dropdown"
import { MenuLink } from "~/components/menu/menu-link"
import { config } from "~/config"
import { useCrisp } from "~/hooks/use-crisp"
import { useMutationHandler } from "~/hooks/use-mutation-handler"
import { cn } from "~/utils/helpers"

export const NavUser = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const { handleSuccess } = useMutationHandler()
  const { user, isSignedIn } = useUser()
  const { redirectToUserProfile } = useClerk()
  const { signOut } = useClerk()
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const { isLoading: isChatLoading, toggleChat } = useCrisp()

  // const { mutate, isLoading: isBillingLoading } = api.stripe.billingSession.create.useMutation({
  //   onSuccess: ({ url }) => {
  //     window.location.href = url
  //   },
  // })

  if (!isSignedIn) {
    return null
  }

  // const handleBilling = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   mutate({ returnUrl: env.VITE_APP_URL })
  // }

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()

    // Set loading state
    setIsLogoutLoading(true)

    // Sign out
    await signOut()

    // Redirect with success message
    handleSuccess({
      redirect: config.routes.dashboard,
      success: "You have been logged out.",
    })
  }

  return (
    <DropdownRoot>
      <DropdownTrigger className={cn("-m-2 min-w-0 rounded-lg p-2 hover:bg-gray-50", className)}>
        <Blurb
          src={user.imageUrl}
          title={user.fullName ?? ""}
          description={user.primaryEmailAddress?.emailAddress}
          {...props}
        />
      </DropdownTrigger>

      <DropdownContent align="start" {...props}>
        <DropdownGroup>
          <DropdownItem suffix={<IconUser />} onClick={() => redirectToUserProfile()}>
            <button type="button">Profile</button>
          </DropdownItem>

          <DropdownItem suffix={<IconMessage />} isLoading={isChatLoading} onClick={toggleChat}>
            <button type="button">Live Chat</button>
          </DropdownItem>
        </DropdownGroup>

        <DropdownGroup>
          {config.navigations.help.map((item) => (
            <DropdownItem key={item.href}>
              <MenuLink item={item} />
            </DropdownItem>
          ))}
        </DropdownGroup>

        <DropdownGroup>
          <DropdownItem suffix={<IconLogout />} isLoading={isLogoutLoading} onClick={handleLogout}>
            <button type="button">Logout</button>
          </DropdownItem>
        </DropdownGroup>
      </DropdownContent>
    </DropdownRoot>
  )
}
