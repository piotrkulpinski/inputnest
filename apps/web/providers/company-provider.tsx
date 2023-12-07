import type { PropsWithChildren } from "react"

import type { CompanyWithMembers } from "~/api/types/company"
import { createSimpleContext } from "~/utils/providers"

const CompanyContext = createSimpleContext<CompanyWithMembers>("Company")

type CompanyProviderProps = PropsWithChildren<{
  company: CompanyWithMembers
}>

export const CompanyProvider = ({ children, company }: CompanyProviderProps) => {
  return <CompanyContext.Provider value={company}>{children}</CompanyContext.Provider>
}

export const useCompany = CompanyContext.useValue
