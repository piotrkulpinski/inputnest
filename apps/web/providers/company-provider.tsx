import type { PropsWithChildren } from "react"

import type { RouterOutputs } from "~/services/trpc"
import { createSimpleContext } from "~/utils/providers"

type Company = NonNullable<RouterOutputs["companies"]["findBySlug"]>

const CompanyContext = createSimpleContext<Company>("Company")

type CompanyProviderProps = PropsWithChildren<{
  company: Company
}>

export const CompanyProvider = ({ children, company }: CompanyProviderProps) => {
  return <CompanyContext.Provider value={company}>{children}</CompanyContext.Provider>
}

export const useCompany = CompanyContext.useValue
