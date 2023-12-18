import type { CompanySchema } from "./src/schema/company"

declare global {
  namespace PrismaJson {
    type CompanySettingsJson = CompanySchema["settings"]
  }
}

export * from "@prisma/client"

export * from "./src/client"
export * from "./src/types"
export * from "./src/schema"
export * from "./src/schema/board"
export * from "./src/schema/comment"
export * from "./src/schema/company"
export * from "./src/schema/domain"
export * from "./src/schema/post"
export * from "./src/schema/status"
export * from "./src/schema/tag"
export * from "./src/schema/user"
export * from "./src/schema/vote"
