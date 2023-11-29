import * as z from "zod"

import { colorSchema, idSchema } from "."

export const statusDefaults = {
  name: "",
  color: "",
  order: 99,
  isDefault: false,
}

export const statusSchema = z.object({
  name: z.string().trim().min(3),
  color: colorSchema,
  order: z.coerce.number().int().min(0),
  isDefault: z.coerce.boolean(),
})

export const statusRelationSchema = z.object({
  companyId: z.string(),
})

export const createStatusSchema = statusSchema.merge(statusRelationSchema)
export const updateStatusSchema = statusSchema.merge(idSchema)

export type StatusSchema = z.infer<typeof statusSchema>
