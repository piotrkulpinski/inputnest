import { Button, Container, Drawer, cx } from "@curiousleaf/design"
import { IconMenu2 } from "@tabler/icons-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"

import { NavSide } from "~/components/navs/NavSide"
import { config } from "~/config"
import { Logo } from "../interface/logo"

export const NavBar = ({ className }: HTMLAttributes<HTMLElement>) => {
  return (
    <nav className={cx("sticky top-0 z-30 w-full border-b bg-white py-3", className)}>
      <Container className="flex min-w-0 items-center gap-3">
        <Drawer>
          <Drawer.Trigger asChild>
            <Button
              theme="secondary"
              variant="ghost"
              size="sm"
              prefix={<IconMenu2 />}
              className="-my-1"
            />
          </Drawer.Trigger>

          <Drawer.Content direction="left" size="xs" asChild>
            <NavSide />
          </Drawer.Content>
        </Drawer>

        <Logo asChild>
          <Link href="/">{config.title}</Link>
        </Logo>
      </Container>
    </nav>
  )
}
