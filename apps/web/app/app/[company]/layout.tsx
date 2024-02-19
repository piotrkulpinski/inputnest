import { Container } from "@curiousleaf/design"
import { db } from "@repo/database"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Checkout } from "~/components/globals/Checkout"
import { Toaster } from "~/components/globals/Toaster"
import { NavBar } from "~/components/navs/NavBar"
import { NavSide } from "~/components/navs/NavSide"
import { CompanyProvider } from "~/providers/CompanyProvider"

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

        <Container size="sm" className="!p-2">
          {children}
        </Container>
      </div>

      <Toaster />
      <Checkout />
    </CompanyProvider>
  )
}
