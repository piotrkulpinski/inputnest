import * as z from "zod"

import { slugSchema } from "./index"

export const boardSchema = z.object({
  name: z.string().trim().min(3),
  slug: slugSchema.min(3),
  order: z.coerce.number().int().min(0).default(99),
  isDefault: z.coerce.boolean().default(false),
})

export type BoardSchema = z.infer<typeof boardSchema>
