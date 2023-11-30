"use client"

import { useParams } from "next/navigation"

import { api } from "~/services/trpc"

export const SayHello = () => {
  const { company } = useParams() as { company: string }
  const { data, isLoading, isError } = api.companies.findBySlug.useQuery({ slug: company })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return "Error"
  }

  return data?.name
}
