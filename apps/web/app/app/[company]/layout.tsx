// "use client"

import { Container } from "@curiousleaf/design"
import { db } from "@repo/database"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Checkout } from "~/components/globals/checkout"
import { Toaster } from "~/components/globals/toaster"
import { NavBar } from "~/components/navs/NavBar"
import { NavSide } from "~/components/navs/NavSide"
import { CompanyProvider } from "~/providers/company-provider"

type CompanyLayoutProps = PropsWithChildren<{ params: { company: string } }>

export default async function CompanyLayout({ children, params }: CompanyLayoutProps) {
  // TODO: Make sure to properly authenticate this
  const company = await db.company
    .findFirstOrThrow({
      where: { slug: params.company },
      include: {
        domain: true,
        subscription: true,
        members: {
          where: { role: { in: ["Owner", "Manager"] } },
          include: { user: true },
        },
      },
    })
    .catch(() => notFound())

  return (
    <CompanyProvider company={company}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <NavBar className="lg:hidden" />
        <NavSide className="max-lg:hidden" floating />

        <main className="m-2 grow">
          <Container size="sm" className="!p-0">
            {children}
          </Container>
        </main>
      </div>

      <Toaster />
      <Checkout />
    </CompanyProvider>
  )
}
