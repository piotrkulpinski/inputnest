"use client"

import { MenuIcon, XIcon } from "lucide-react"
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
      <DialogTrigger className="border-color text-xxs group -m-1 p-1 lg:hidden">
        <MenuIcon className="group-data-[state=open]:hidden" />
        <XIcon className="group-data-[state=closed]:hidden" />
      </DialogTrigger>

      <DialogSlideout className="xl:hidden">
        <NavMain />
      </DialogSlideout>
    </DialogRoot>
  )
}
