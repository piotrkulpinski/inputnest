"use client"

import { Container } from "@curiousleaf/design"
import { notFound, useParams } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Checkout } from "~/components/globals/checkout"
import { Toaster } from "~/components/globals/toaster"
import { NavBar } from "~/components/navs/NavBar"
import { NavSide } from "~/components/navs/NavSide"
import { CompanyProvider } from "~/providers/company-provider"
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
      <div className="flex min-h-[calc(100vh-1rem)] p-2 flex-col bg-gray-50 lg:flex-row">
        <NavBar className="lg:hidden" />
        <NavSide className="h-[calc(100vh-1rem)] rounded shadow-md max-lg:hidden" />

        <main className="flex-1">
          <Container>{children}</Container>
        </main>
      </div>

      <Toaster />
      <Checkout />
    </CompanyProvider>
  )
}
