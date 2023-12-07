import * as z from "zod"

import { colorSchema, idSchema } from "."

export const tagDefaults = {
  name: "",
  color: "",
  order: 99,
}

export const tagSchema = z.object({
  name: z.string().trim().min(1),
  color: colorSchema,
  order: z.coerce.number().int().min(0),
})

export const tagRelationSchema = z.object({
  companyId: z.string(),
})

export const createTagSchema = tagSchema.merge(tagRelationSchema)
export const updateTagSchema = tagSchema.merge(idSchema)

export type TagSchema = z.infer<typeof tagSchema>
