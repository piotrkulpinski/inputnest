import { getInitials } from "@curiousleaf/utils"
import { IconCheck, IconPlus, IconSelector } from "@tabler/icons-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"

import { Avatar } from "~/components/interface/avatar"
import { Blurb } from "~/components/interface/blurb"
import {
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownRoot,
  DropdownTrigger,
} from "~/components/interface/dropdown"
import { config } from "~/config"
import { useCompany } from "~/providers/company-provider"
import { api } from "~/services/trpc"
import { cn } from "~/utils/helpers"

export const NavCompany = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { name, slug: companySlug } = useCompany()
  const { data: companies, isSuccess } = api.companies.getAll.useQuery()

  // Get the plan for the company
  // const plan = getSubscriptionPlan(subscription)

  return (
    <DropdownRoot>
      <DropdownTrigger className={cn("-m-2 min-w-0 rounded-lg p-2 hover:bg-gray-50", className)}>
        <Blurb src={null} title={name} description="superstash.co" {...props}>
          <IconSelector className="shrink-0 text-sm text-gray-600" />
        </Blurb>
      </DropdownTrigger>

      <DropdownContent align="start">
        <DropdownGroup className="max-h-[25rem] overflow-y-auto">
          {isSuccess &&
            companies.map(({ id, name, slug, settings }) => (
              <DropdownItem
                key={id}
                prefix={
                  <Avatar src={null} fallback={getInitials(name, 2)} size="xs" shape="square" />
                }
                suffix={
                  slug === companySlug ? (
                    <IconCheck className="!stroke-2" />
                  ) : (
                    <div className="h-4 w-4" />
                  )
                }
              >
                <Link href={`/${slug}`}>{name}</Link>
              </DropdownItem>
            ))}
        </DropdownGroup>

        <DropdownGroup>
          <DropdownItem prefix={<IconPlus />}>
            <Link href={config.routes.onboarding}>New Company</Link>
          </DropdownItem>
        </DropdownGroup>
      </DropdownContent>
    </DropdownRoot>
  )
}
