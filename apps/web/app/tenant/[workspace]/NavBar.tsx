"use client"

import { Action, Avatar, Container, H3, Series, Tabs, cx } from "@curiousleaf/design"
import { GanttChartSquareIcon, LightbulbIcon, MilestoneIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HTMLAttributes } from "react"
import { NavGuest } from "~/app/tenant/[workspace]/NavGuest"
import { NavUser } from "~/app/tenant/[workspace]/NavUser"
import { Search } from "~/app/tenant/[workspace]/Search"
import { NavItemProps } from "~/components/navs/NavItem"
import { useWorkspace } from "~/providers/WorkspaceProvider"

export const NavBar = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const { status } = useSession()
  const workspace = useWorkspace()
  const pathname = usePathname()

  const navs = [
    { title: "Feedback", href: "/", prefix: <LightbulbIcon /> },
    { title: "Roadmap", href: "/roadmap", prefix: <MilestoneIcon /> },
    { title: "Changelog", href: "/changelog", prefix: <GanttChartSquareIcon /> },
  ] satisfies NavItemProps[]

  return (
    <div className={cx("border-b bg-white", className)} {...props}>
      <Container>
        <div className="flex items-center justify-between py-4 md:py-6">
          <H3>
            <Series asChild>
              <Link href="/" className="text-gray-800">
                {workspace.logo && (
                  <Avatar src={workspace.logo} alt={workspace.name} shape="rounded" size="lg" />
                )}
                {workspace.name}
              </Link>
            </Series>
          </H3>

          {status === "unauthenticated" ? <NavGuest /> : <NavUser />}
        </div>

        <div className="flex items-end justify-between md:gap-6">
          <Tabs defaultValue={pathname} asChild>
            <Tabs.List className="lg:gap-x-8">
              {navs.map(item => (
                <Tabs.Trigger key={item.href} value={item.href} asChild>
                  <Action {...item} className="gap-2" asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </Action>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs>

          <Search className="w-auto" />
        </div>
      </Container>
    </div>
  )
}
