import * as z from "zod"

import { colorSchema } from "./index"

export const statusSchema = z.object({
  name: z.string().trim().min(3),
  color: colorSchema,
  order: z.coerce.number().int().min(0).default(99),
  isDefault: z.coerce.boolean().default(false),
})

export type StatusSchema = z.infer<typeof statusSchema>
