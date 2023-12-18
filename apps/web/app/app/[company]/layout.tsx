"use client"

import { notFound, useParams } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Checkout } from "~/components/globals/checkout"
import { Toaster } from "~/components/globals/toaster"
import { Container } from "~/components/interface/container"
import { NavCompany } from "~/components/navs/nav-company"
import { NavMain } from "~/components/navs/nav-main"
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

  return (
    <CompanyProvider company={company}>
      <MenuProvider>
        <div className="flex min-h-screen">
          <div className="sticky top-14 z-40 flex h-screen w-64 shrink-0 flex-col gap-y-5 overflow-y-scroll border-r bg-white p-5 max-lg:hidden max-lg:h-full xl:w-72">
            <NavCompany />
            <hr className="-mx-5" />
            <NavMain className="flex-1" />
            <hr className="-mx-5" />
            <NavUser />
          </div>

          <main className="flex-1 pb-10 pt-6 md:pb-12 md:pt-8">
            <Container>{children}</Container>
          </main>
        </div>

        <Toaster />
        <Checkout />
      </MenuProvider>
    </CompanyProvider>
  )
}
