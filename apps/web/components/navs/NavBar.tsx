"use client"

import { Button, Container, Drawer, cx } from "@curiousleaf/design"
import Link from "next/link"
import type { HTMLAttributes } from "react"

import { MenuIcon } from "lucide-react"
import { NavSide } from "~/components/navs/NavSide"
import { config } from "~/config"
import { Logo } from "../interface/Logo"

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
              prefix={<MenuIcon />}
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
