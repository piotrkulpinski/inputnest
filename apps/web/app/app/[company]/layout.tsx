"use client"

import { Badge, MenuItem, Shortcut, Sidebar, ThemeProvider } from "@curiousleaf/design"
import {
  IconTable,
  IconCreditCard,
  IconCoins,
  IconHistory,
  IconReceiptDollar,
  IconWorldDollar,
  IconSettings,
  IconHeadset,
} from "@tabler/icons-react"
import { notFound, useParams } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Checkout } from "~/components/globals/checkout"
import { Toaster } from "~/components/globals/toaster"
import { Container } from "~/components/interface/container"
import { NavCompany } from "~/components/navs/nav-company"
import { NavUser } from "~/components/navs/nav-user"
import { CompanyProvider } from "~/providers/company-provider"
import { MenuProvider } from "~/providers/menu-provider"
import { api } from "~/services/trpc"

export default function CompanyLayout({ children }: PropsWithChildren) {
  const { company: slug } = useParams() as { company: string }

  const { data: company, isLoading, isSuccess } = api.companies.getBySlug.useQuery({ slug })

  if (isLoading) {
    return "loading..."
  }

  if (!isSuccess || !company) {
    notFound()
  }
  const menus = {
    Main: [
      {
        children: "Dashboard",
        prefix: <IconTable />,
        active: true,
      },
      {
        children: "My Cards",
        prefix: <IconCreditCard />,
      },
      {
        children: "Transfer",
        prefix: <IconCoins />,
      },
      {
        children: "Transactions",
        prefix: <IconHistory />,
      },
      {
        children: "Payments",
        prefix: <IconReceiptDollar />,
      },
      {
        children: "Exchange",
        prefix: <IconWorldDollar />,
        suffix: (
          <Badge theme="gray" variant="soft">
            Soon
          </Badge>
        ),
        disabled: true,
      },
    ],

    Other: [
      {
        children: "Settings",
        prefix: <IconSettings />,
        suffix: <Shortcut>⌘K</Shortcut>,
      },
      {
        children: "Support",
        prefix: <IconHeadset />,
        loading: true,
      },
    ],
  }

  return (
    <ThemeProvider theme="blue">
      <CompanyProvider company={company}>
        <MenuProvider>
          <div className="flex min-h-screen">
            <Sidebar>
              <NavCompany />
              <Sidebar.Separator />

              <Sidebar.Content>
                {Object.entries(menus).map(([label, items], i) => (
                  <Sidebar.Menu key={i}>
                    <Sidebar.Heading>{label}</Sidebar.Heading>

                    {items.map((item, j) => (
                      <MenuItem key={j} {...item} />
                    ))}
                  </Sidebar.Menu>
                ))}
              </Sidebar.Content>

              <Sidebar.Separator />

              <NavUser />
            </Sidebar>

            <main className="flex-1">
              <Container>{children}</Container>
            </main>
          </div>

          <Toaster />
          <Checkout />
        </MenuProvider>
      </CompanyProvider>
    </ThemeProvider>
  )
}
