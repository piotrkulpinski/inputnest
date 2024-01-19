import { useClerk, useUser } from "@clerk/nextjs"
import { Blurb, cx } from "@curiousleaf/design"
import { LogOutIcon, MessageCircleIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"
import { useState } from "react"

import {
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownRoot,
  DropdownTrigger,
} from "~/components/interface/dropdown"
import { config } from "~/config"
import { useCrisp } from "~/hooks/use-crisp"
import { useMutationHandler } from "~/hooks/use-mutation-handler"

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
      <DropdownTrigger className={cx("-m-2 min-w-0 rounded-lg p-2 hover:bg-gray-100", className)}>
        <Blurb
          avatar={{ src: user.imageUrl, initials: user.fullName || "" }}
          title={user.fullName || ""}
          description={user.primaryEmailAddress?.emailAddress}
          {...props}
        />
      </DropdownTrigger>

      <DropdownContent align="start" {...props}>
        <DropdownGroup>
          <DropdownItem suffix={<UserIcon />} onClick={() => redirectToUserProfile()}>
            <button type="button">Profile</button>
          </DropdownItem>

          <DropdownItem
            suffix={<MessageCircleIcon />}
            isLoading={isChatLoading}
            onClick={toggleChat}
          >
            <button type="button">Live Chat</button>
          </DropdownItem>
        </DropdownGroup>

        <DropdownGroup>
          {config.navigations.help.map((item) => (
            <DropdownItem key={item.href}>
              <Link href={item.href} target={item.target}>
                {item.title}
              </Link>
            </DropdownItem>
          ))}
        </DropdownGroup>

        <DropdownGroup>
          <DropdownItem suffix={<LogOutIcon />} isLoading={isLogoutLoading} onClick={handleLogout}>
            <button type="button">Logout</button>
          </DropdownItem>
        </DropdownGroup>
      </DropdownContent>
    </DropdownRoot>
  )
}
