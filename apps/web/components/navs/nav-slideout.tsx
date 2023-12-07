"use client"

import { IconMenu2, IconX } from "@tabler/icons-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { DialogRoot, DialogSlideout, DialogTrigger } from "~/components/interface/dialog"
import { NavMain } from "~/components/navs/nav-main"
import { useMenu } from "~/providers/menu-provider"

export const NavSlideout = () => {
  const menu = useMenu()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close the menu when the pathname changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (menu === null) {
    return null
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="border-color group -m-1 p-1 text-xxs lg:hidden">
        <IconMenu2 className="group-data-[state=open]:hidden" />
        <IconX className="group-data-[state=closed]:hidden" />
      </DialogTrigger>

      <DialogSlideout className="xl:hidden">
        <NavMain />
      </DialogSlideout>
    </DialogRoot>
  )
}
