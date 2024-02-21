"use client"

import type { AvatarProps } from "@curiousleaf/design"
import { Avatar } from "@curiousleaf/design"
import {
  BookOpenIcon,
  GanttChartSquareIcon,
  LightbulbIcon,
  LogOutIcon,
  MessagesSquareIcon,
  MoreHorizontalIcon,
  UserIcon,
} from "lucide-react"
import type { HTMLAttributes } from "react"
import { useState } from "react"

import { useCrisp } from "~/hooks/useCrisp"
import { useMutationHandler } from "~/hooks/useMutationHandler"

import { signOut, useSession } from "next-auth/react"
import { toast } from "sonner"
import { NavDropdown } from "./NavDropdown"
import type { NavItemProps } from "./NavItem"
import { NavItemButton } from "./NavItem"

export const NavUser = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const { handleSuccess } = useMutationHandler()
  const { data: session, status } = useSession()
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const { isLoading: isChatLoading, toggleChat } = useCrisp()

  // const { mutate, isLoading: isBillingLoading } = api.stripe.billingSession.create.useMutation({
  //   onSuccess: ({ url }) => {
  //     window.location.href = url
  //   },
  // })

  if (status !== "authenticated") {
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

    // Show success message
    toast.success("You have been successfully signed out.")
  }

  const navs: NavItemProps[][] = [
    // [
    //   {
    //     title: "Inbox",
    //     prefix: <InboxIcon />,
    //     suffix: <Badge size="sm">{formatBadgeCount(99)}</Badge>,
    //   },
    // ],
    [
      {
        title: "Live Chat",
        prefix: <MessagesSquareIcon />,
        loading: isChatLoading,
        onClick: toggleChat,
      },
      {
        title: "Profile",
        prefix: <UserIcon />,
        // onClick: redirectToUserProfile,
      },
    ],
    [
      {
        title: "Docs",
        href: "/docs",
        target: "_blank",
        prefix: <BookOpenIcon />,
      },
      {
        title: "Changelog",
        href: "/changelog",
        target: "_blank",
        prefix: <GanttChartSquareIcon />,
      },
      {
        title: "Request Feature",
        href: "/feedback",
        target: "_blank",
        prefix: <LightbulbIcon />,
      },
    ],
    [
      {
        title: "Sign out",
        prefix: <LogOutIcon />,
        loading: isLogoutLoading,
        onClick: handleLogout,
      },
    ],
  ]

  const getUserAvatar = ({ ...props }: AvatarProps) => {
    return <Avatar src={session.user?.image || ""} initials={session.user?.name || ""} {...props} />
  }

  return (
    <NavDropdown navs={navs} align="start" limitWidth="both" {...props}>
      <NavItemButton
        title={session.user?.name || session.user?.email || ""}
        prefix={getUserAvatar({ size: "sm" })}
        suffix={<MoreHorizontalIcon />}
        className={className}
      />
    </NavDropdown>
  )
}
