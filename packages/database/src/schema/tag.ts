import * as z from "zod"

import { colorSchema } from "./index"

export const tagSchema = z.object({
  name: z.string().trim().min(1),
  color: colorSchema,
  order: z.coerce.number().int().min(0).default(99),
})

export type TagSchema = z.infer<typeof tagSchema>
