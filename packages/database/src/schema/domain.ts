import * as z from "zod"

import { domainNameSchema } from "./index"

export const domainSchema = z.object({
  id: z.string().min(1),
  name: domainNameSchema.default(""),
  companyId: z.string().min(1),
})

export const domainCreateSchema = domainSchema.omit({ id: true })
