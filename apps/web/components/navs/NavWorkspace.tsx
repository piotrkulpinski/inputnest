"use client"

import { Avatar } from "@curiousleaf/design"
import { CheckIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react"
import type { HTMLAttributes } from "react"

import { config } from "~/config"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc"
import { NavDropdown } from "./NavDropdown"
import { NavItemButton, NavItemProps } from "./NavItem"

export const NavWorkspace = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { name, slug: workspaceSlug, logo } = useWorkspace()
  const { data } = api.workspaces.getAll.useQuery()

  // Get the plan for the workspace
  // const plan = getSubscriptionPlan(subscription)
  //

  const navs: NavItemProps[][] = [
    // List of workspaces
    data?.map(({ name, slug, logo }) => ({
      title: name,
      href: `/app/${slug}`,
      prefix: <Avatar src={logo} initials={name} shape="rounded" size="xs" />,
      suffix:
        slug === workspaceSlug ? (
          <CheckIcon className="text-green-dark" />
        ) : (
          <div className="size-5" />
        ),
    })) || [],
    [
      {
        title: "Add New Workspace",
        href: config.routes.onboarding,
        prefix: <PlusIcon />,
      },
    ],
  ]

  return (
    <NavDropdown navs={navs} align="start" limitWidth="both" {...props}>
      <NavItemButton
        title={name}
        prefix={<Avatar src={logo} initials={name} shape="rounded" size="xs" />}
        suffix={<MoreHorizontalIcon />}
      />
    </NavDropdown>
  )
}
