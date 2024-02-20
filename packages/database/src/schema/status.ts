import * as z from "zod"

import { colorSchema, idSchema } from "./index"

export const statusSchema = z.object({
  name: z.string().trim().min(3),
  color: colorSchema,
  order: z.coerce.number().int().min(0).default(99),
  isDefault: z.coerce.boolean().default(false),
})

export const statusRelationSchema = z.object({
  companyId: z.string(),
})

export const createStatusSchema = statusSchema.merge(statusRelationSchema)
export const updateStatusSchema = statusSchema.merge(idSchema)

export type StatusSchema = z.infer<typeof statusSchema>
