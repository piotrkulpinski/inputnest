import { Container } from "@curiousleaf/design"
import { companyInclude, db } from "@repo/database"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Checkout } from "~/components/globals/Checkout"
import { Toaster } from "~/components/globals/Toaster"
import { NavBar } from "~/components/navs/NavBar"
import { NavSide } from "~/components/navs/NavSide"
import { CompanyProvider } from "~/providers/CompanyProvider"
import { auth } from "~/services/auth"

type CompanyLayoutProps = PropsWithChildren<{ params: { company: string } }>

export default async function CompanyLayout({ children, params }: CompanyLayoutProps) {
  const session = await auth()
  const userId = session?.user?.id
  const slug = params.company

  const company = await db.company
    .findFirstOrThrow({
      where: { slug, members: { some: { userId, role: { in: ["Owner", "Manager"] } } } },
      include: companyInclude,
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
