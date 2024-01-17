import { Badge } from "@curiousleaf/design"
import {
  IconAccessPoint,
  IconArrowLeft,
  IconCards,
  IconCodeAsterix,
  IconCreditCard,
  IconCrystalBall,
  IconMist,
  IconPointFilled,
  IconReplace,
  IconSettings,
  IconTable,
  IconTag,
  IconTransfer,
  IconUsers,
} from "@tabler/icons-react"
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
        { title: "Dashboard", href: `/app/${slug}`, prefix: <IconTable />, end: true },
        { title: "Posts", href: `/app/${slug}/posts`, prefix: <IconMist /> },
        {
          title: "Roadmap",
          href: `/app/#`,
          prefix: <IconCrystalBall />,
          suffix: (
            <Badge prefix={<IconPointFilled />} theme="gray" variant="soft">
              Soon
            </Badge>
          ),
        },
        {
          title: "Changelog",
          href: `/app/#`,
          prefix: <IconReplace />,
          suffix: (
            <Badge prefix={<IconPointFilled />} theme="gray" variant="soft">
              Soon
            </Badge>
          ),
        },
        {
          title: "Users",
          href: `/app/#`,
          prefix: <IconUsers />,
          suffix: (
            <Badge prefix={<IconPointFilled />} theme="gray" variant="soft">
              Soon
            </Badge>
          ),
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
          { title: "General", href: `/app/${slug}/settings/general`, prefix: <IconSettings /> },
          { title: "Custom Code", href: `/app/${slug}/settings/code`, prefix: <IconCodeAsterix /> },
          { title: "Billing", href: `/app/${slug}/settings/billing`, prefix: <IconCreditCard /> },
        ],
      },
      {
        title: "Posts",
        items: [
          { title: "Boards", href: `/app/${slug}/settings/boards`, prefix: <IconCards /> },
          {
            title: "Statuses",
            href: `/app/${slug}/settings/statuses`,
            prefix: <IconAccessPoint />,
          },
          { title: "Tags", href: `/app/${slug}/settings/tags`, prefix: <IconTag /> },
        ],
      },
      {
        title: "Back",
        items: [
          { title: "Back to company", href: `/app/${slug}`, prefix: <IconArrowLeft />, end: true },
        ],
      },
    ]
  }

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export const useMenu = MenuContext.useValue
