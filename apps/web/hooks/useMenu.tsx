import { usePathname } from "next/navigation"
import { useMemo } from "react"

import { NavItemProps } from "~/components/navs/NavItem"
import { useCompany } from "~/providers/company-provider"

import { GemIcon, SettingsIcon, TableIcon } from "lucide-react"
import { Badge } from "@curiousleaf/design"
import { isTruthy } from "@curiousleaf/utils"

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
        { title: "Dashboard", href: `/app/${slug}`, prefix: <TableIcon />, end: true },
        { title: "Posts", href: `/app/${slug}/posts`, prefix: <TableIcon /> },
        {
          title: "Roadmap",
          href: `/app/#`,
          prefix: <TableIcon />,
          suffix: (
            <Badge theme="gray" variant="outline">
              Soon
            </Badge>
          ),
        },
        {
          title: "Changelog",
          href: `/app/#`,
          prefix: <TableIcon />,
          suffix: (
            <Badge theme="gray" variant="outline">
              Soon
            </Badge>
          ),
        },
        {
          title: "Users",
          href: `/app/#`,
          prefix: <TableIcon />,
          suffix: (
            <Badge theme="gray" variant="outline">
              Soon
            </Badge>
          ),
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
          ]
        },
        { title: "Import/Export", href: `/#`, prefix: <TableIcon /> },
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