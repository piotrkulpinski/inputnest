"use client"

import { Avatar, Button, Series } from "@curiousleaf/design"
import { BellIcon, ChevronDownIcon, LogOutIcon, SparklesIcon, ZapIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { NavDropdown } from "~/components/navs/NavDropdown"
import { NavItemProps } from "~/components/navs/NavItem"

export const NavUser = () => {
  const { data: session } = useSession()
  const [isPending, setIsPending] = useState(false)
  const user = { name: "John Doe" }

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault()

    // Set loading state
    setIsPending(true)

    // Sign out
    await signOut()

    // Show success message
    toast.success("You have been successfully signed out.")
  }

  const navs = [
    [
      {
        title: "Create your board",
        prefix: <SparklesIcon />,
        className: "text-purple",
      },
      {
        title: "My Activity",
        prefix: <ZapIcon />,
      },
    ],
    [
      {
        title: "Sign out",
        prefix: <LogOutIcon />,
        isPending: isPending,
        onClick: handleSignOut,
      },
    ],
  ] satisfies NavItemProps[][]

  return (
    <Series size="sm">
      <Button theme="secondary" variant="ghost" prefix={<BellIcon />} />

      <NavDropdown align="end" navs={navs}>
        <Button
          size="lg"
          theme="secondary"
          variant="outline"
          prefix={<Avatar src={null} initials={user.name} size="xs" className="!-ml-1.5" />}
          suffix={<ChevronDownIcon className="!-ml-1 !-mr-1.5" />}
        >
          {user.name}
        </Button>
      </NavDropdown>
    </Series>
  )
}
