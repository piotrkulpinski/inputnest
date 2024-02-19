"use client"

import { Container } from "@curiousleaf/design"
import { notFound, useParams } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Toaster } from "~/components/globals/Toaster"
import { CompanyProvider } from "~/providers/CompanyProvider"
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
      <Container>{children}</Container>
      <Toaster />
    </CompanyProvider>
  )
}
