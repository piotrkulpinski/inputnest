import {
  IconAccessPoint,
  IconArrowLeft,
  IconCards,
  IconCodeAsterix,
  IconCreditCard,
  IconCrystalBall,
  IconMist,
  IconReplace,
  IconSettings,
  IconTable,
  IconTag,
  IconTransfer,
  IconUsers,
} from "@tabler/icons-react"
import { usePathname } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Badge } from "~/components/interface/badge"
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
        { title: "Dashboard", href: `/app/${slug}`, prefix: <IconTable /> },
        { title: "Posts", href: `/app/${slug}/posts`, prefix: <IconMist /> },
        {
          title: "Roadmap",
          href: `/#`,
          prefix: <IconCrystalBall />,
          suffix: <Badge size="sm">Soon</Badge>,
        },
        {
          title: "Changelog",
          href: `/#`,
          prefix: <IconReplace />,
          suffix: <Badge size="sm">Soon</Badge>,
        },
        {
          title: "Users",
          href: `/#`,
          prefix: <IconUsers />,
          suffix: <Badge size="sm">Soon</Badge>,
        },
      ],
    },
    {
      title: "Other",
      items: [
        { title: "Settings", href: `/app/${slug}/settings`, prefix: <IconSettings /> },
        { title: "Import/Export", href: `/#`, prefix: <IconTransfer /> },
      ],
    },
  ]

  // Company Settings
  if (pathname.includes("settings")) {
    value = [
      {
        title: "Settings",
        items: [
          { title: "General", href: `/${slug}/settings/general`, prefix: <IconSettings /> },
          { title: "Custom Code", href: `/${slug}/settings/code`, prefix: <IconCodeAsterix /> },
          { title: "Billing", href: `/${slug}/settings/billing`, prefix: <IconCreditCard /> },
        ],
      },
      {
        title: "Posts",
        items: [
          { title: "Boards", href: `/${slug}/settings/boards`, prefix: <IconCards /> },
          { title: "Statuses", href: `/${slug}/settings/statuses`, prefix: <IconAccessPoint /> },
          { title: "Tags", href: `/${slug}/settings/tags`, prefix: <IconTag /> },
        ],
      },
      {
        title: "Back",
        items: [
          { title: "Back to company", href: `/${slug}`, prefix: <IconArrowLeft />, end: true },
        ],
      },
    ]
  }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export const useMenu = MenuContext.useValue
