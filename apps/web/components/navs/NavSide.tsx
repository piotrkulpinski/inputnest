
import { Accordion, Sidebar } from "@curiousleaf/design"
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react"

import { useMenu } from "~/hooks/useMenu"
import { NavCompany } from "~/components/navs/NavCompany"
import { NavUser } from "~/components/navs/NavUser"
import { NavItem } from "./NavItem"

export const NavSide = forwardRef<
  ElementRef<typeof Sidebar>,
  ComponentPropsWithoutRef<typeof Sidebar>
>((props, ref) => {
  const { menu, openMenu } = useMenu()

  return (
    <Sidebar ref={ref} {...props}>
      <NavCompany />

      <Sidebar.Separator />

      <Accordion type="single" defaultValue={openMenu?.title} asChild>
        <Sidebar.Content>
          {menu.map(({ title, items }, i) => (
            <Sidebar.Menu key={i}>
              <Sidebar.Heading>{title}</Sidebar.Heading>

              {items.map((item, j) => (
                <NavItem key={j} {...item} />
              ))}
            </Sidebar.Menu>
          ))}
        </Sidebar.Content>
      </Accordion>

      <NavUser />
    </Sidebar>
  )
})