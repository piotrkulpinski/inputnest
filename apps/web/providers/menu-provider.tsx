import { Badge } from "@curiousleaf/design"
import { TableIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import type { PropsWithChildren } from "react"

import type { MenuItem } from "~/index"
import { useCompany } from "~/providers/company-provider"
import { createSimpleContext } from "~/utils/providers"

const MenuContext = createSimpleContext<MenuItem[]>("Company")

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const { slug } = useCompany()
  let value: MenuItem[] = [
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
            <Badge prefix={<TableIcon />} theme="gray" variant="soft">
              Soon
            </Badge>
          ),
        },
        {
          title: "Changelog",
          href: `/app/#`,
          prefix: <TableIcon />,
          suffix: (
            <Badge prefix={<TableIcon />} theme="gray" variant="soft">
              Soon
            </Badge>
          ),
        },
        {
          title: "Users",
          href: `/app/#`,
          prefix: <TableIcon />,
          suffix: (
            <Badge prefix={<TableIcon />} theme="gray" variant="soft">
              Soon
            </Badge>
          ),
        },
      ],
    },
    {
      title: "Other",
      items: [
        { title: "Settings", href: `/app/${slug}/settings`, prefix: <TableIcon /> },
        { title: "Import/Export", href: `/#`, prefix: <TableIcon /> },
      ],
    },
  ]

  // Company Settings
  if (pathname.includes("settings")) {
    value = [
      {
        title: "Settings",
        items: [
          { title: "General", href: `/app/${slug}/settings/general`, prefix: <TableIcon /> },
          { title: "Custom Code", href: `/app/${slug}/settings/code`, prefix: <TableIcon /> },
          { title: "Billing", href: `/app/${slug}/settings/billing`, prefix: <TableIcon /> },
        ],
      },
      {
        title: "Posts",
        items: [
          { title: "Boards", href: `/app/${slug}/settings/boards`, prefix: <TableIcon /> },
          {
            title: "Statuses",
            href: `/app/${slug}/settings/statuses`,
            prefix: <TableIcon />,
          },
          { title: "Tags", href: `/app/${slug}/settings/tags`, prefix: <TableIcon /> },
        ],
      },
      {
        title: "Back",
        items: [
          { title: "Back to company", href: `/app/${slug}`, prefix: <TableIcon />, end: true },
        ],
      },
    ]
  }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export const useMenu = MenuContext.useValue
