import { usePathname } from "next/navigation"
import { useMemo } from "react"

import { NavItemProps } from "~/components/navs/NavItem"
import { useCompany } from "~/providers/CompanyProvider"

import {
  DownloadCloudIcon,
  GanttChartSquareIcon,
  LayoutDashboardIcon,
  LibraryIcon,
  MilestoneIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"
import { Badge } from "@curiousleaf/design"

export type Menu = {
  title?: string
  items: NavItemProps[]
}

export const useMenu = () => {
  const pathname = usePathname()
  const { slug } = useCompany()

  const menus: Menu[] = [
    {
      title: "Manage",
      items: [
        { title: "Dashboard", href: `/app/${slug}`, prefix: <LayoutDashboardIcon />, end: true },
        { title: "Posts", href: `/app/${slug}/posts`, prefix: <LibraryIcon /> },
        {
          title: "Roadmap",
          prefix: <MilestoneIcon />,
          suffix: (
            <Badge theme="gray" variant="outline">
              Soon
            </Badge>
          ),
          disabled: true,
        },
        {
          title: "Changelog",
          prefix: <GanttChartSquareIcon />,
          suffix: (
            <Badge theme="gray" variant="outline">
              Soon
            </Badge>
          ),
          disabled: true,
        },
        {
          title: "Users",
          prefix: <UsersIcon />,
          suffix: (
            <Badge theme="gray" variant="outline">
              Soon
            </Badge>
          ),
          disabled: true,
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          href: `/app/${slug}/settings`,
          prefix: <SettingsIcon />,
          items: [
            { title: "General", href: `/app/${slug}/settings/general` },
            { title: "Custom Code", href: `/app/${slug}/settings/code` },
            { title: "Billing", href: `/app/${slug}/settings/billing` },
            { title: "Boards", href: `/app/${slug}/settings/boards` },
            { title: "Statuses", href: `/app/${slug}/settings/statuses` },
            { title: "Tags", href: `/app/${slug}/settings/tags` },
          ],
        },
        {
          title: "Import/Export",
          prefix: <DownloadCloudIcon />,
          suffix: (
            <Badge theme="gray" variant="outline">
              Soon
            </Badge>
          ),
          disabled: true,
        },
      ],
    },
  ]

  const openMenu = useMemo(
    () =>
      menus
        .flatMap(({ items }) => items)
        .find(({ items }) => items?.some(({ href }) => pathname === href)),
    [pathname],
  )

  return {
    menu: menus.filter(({ items }) => items?.length),
    openMenu,
  }
}
