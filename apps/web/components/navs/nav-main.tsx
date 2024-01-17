import { cva } from "class-variance-authority"
import type { HTMLProps } from "react"

import { ClickableClassContext } from "~/components/interface/clickable"
import { Menu } from "~/components/menu/menu"
import { useMenu } from "~/providers/menu-provider"
import { cn } from "~/utils/helpers"

const clickableVariants = cva("relative px-3 rounded-md font-medium hover:bg-gray-100", {
  variants: {
    isActive: {
      true: "!bg-gray-100 before:content-['_'] before:absolute before:right-full before:top-1/2 before:h-3/4 before:w-1 before:mr-4 before:bg-blue before:rounded-r-md before:-translate-y-1/2",
    },
  },
})

export const NavMain = ({ className, ...props }: HTMLProps<HTMLElement>) => {
  const menu = useMenu()

  return (
    <nav className={cn("flex flex-col gap-1", className)} {...props}>
      <ClickableClassContext.Provider value={clickableVariants}>
        <Menu items={menu} />
      </ClickableClassContext.Provider>
    </nav>
  )
}
