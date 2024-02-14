import { Dropdown } from "@curiousleaf/design"
import type { ComponentPropsWithoutRef } from "react"

import { NavItem, type NavItemProps } from "~/components/navs/NavItem"

export type NavDropdownProps = ComponentPropsWithoutRef<typeof Dropdown.Content> & {
  navs: NavItemProps[][]
}

export const NavDropdown = ({ children, navs, ...props }: NavDropdownProps) => {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>{children}</Dropdown.Trigger>

      <Dropdown.Content {...props}>
        {navs.map((nav, i) => (
          <Dropdown.Group key={i}>
            {nav.map((item, j) => (
              <Dropdown.Item key={j}>
                <NavItem {...item} />
              </Dropdown.Item>
            ))}
          </Dropdown.Group>
        ))}
      </Dropdown.Content>
    </Dropdown>
  )
}
