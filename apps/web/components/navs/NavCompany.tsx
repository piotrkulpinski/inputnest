"use client"

import { Avatar } from "@curiousleaf/design"
import { CheckIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react"
import type { HTMLAttributes } from "react"

import { config } from "~/config"
import { useCompany } from "~/providers/CompanyProvider"
import { api } from "~/services/trpc"
import { NavItemButton, NavItemProps } from "./NavItem"
import { NavDropdown } from "./NavDropdown"

export const NavCompany = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { name, slug: companySlug } = useCompany()
  const { data } = api.companies.getAll.useQuery()

  // Get the plan for the company
  // const plan = getSubscriptionPlan(subscription)
  //

  const navs: NavItemProps[][] = [
    // List of companies
    data?.map(({ name, slug }) => ({
      title: name,
      href: `/app/${slug}`,
      prefix: <Avatar initials={name} shape="rounded" size="xs" />,
      suffix:
        slug === companySlug ? (
          <CheckIcon className="text-green-dark" />
        ) : (
          <div className="size-4" />
        ),
    })) || [],
    [
      {
        title: "Add New Company",
        href: config.routes.onboarding,
        prefix: <PlusIcon />,
      },
    ],
  ]

  return (
    <NavDropdown navs={navs} align="start" {...props}>
      <NavItemButton
        title={name}
        prefix={<Avatar initials={name} shape="rounded" size="xs" />}
        suffix={<MoreHorizontalIcon />}
      />
    </NavDropdown>
  )
}
