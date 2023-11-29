import { CompanySchema } from "./src/schema/company"


declare global {
  namespace PrismaJson {
    type CompanySettingsJson = CompanySchema["settings"]
  }
}

export * from "@prisma/client"
export * from "./src/client"
