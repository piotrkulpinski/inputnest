"use client"

import { CompanyWithMembers } from "@repo/database"
import type { PropsWithChildren } from "react"

import type { RouterOutputs } from "~/services/trpc"
import { createSimpleContext } from "~/utils/providers"

type Company = NonNullable<RouterOutputs["companies"]["getBySlug"]>

const CompanyContext = createSimpleContext<CompanyWithMembers>("Company")

type CompanyProviderProps = PropsWithChildren<{
  company: CompanyWithMembers
}>

export const CompanyProvider = ({ company, ...props }: CompanyProviderProps) => {
  return <CompanyContext.Provider value={company} {...props} />
}

export const useCompany = CompanyContext.useValue
