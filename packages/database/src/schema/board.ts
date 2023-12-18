import * as z from "zod"

import { idSchema, slugSchema } from "./index"

export const boardDefaults = {
  name: "",
  slug: "",
  order: 99,
  isDefault: false,
}

export const boardSchema = z.object({
  name: z.string().trim().min(3),
  slug: slugSchema.min(3),
  order: z.coerce.number().int().min(0),
  isDefault: z.coerce.boolean(),
})

export const boardRelationSchema = z.object({
  companyId: z.string(),
})

export const createBoardSchema = boardSchema.merge(boardRelationSchema)
export const updateBoardSchema = boardSchema.merge(idSchema)

export type BoardSchema = z.infer<typeof boardSchema>
