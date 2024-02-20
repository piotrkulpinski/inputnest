import { isLightColor } from "@curiousleaf/utils"
import * as z from "zod"

import { Theme } from "@prisma/client"
import { colorSchema, idSchema, isReservedSlug, slugSchema } from "./index"

export const companySchema = z.object({
  name: z.string().trim().min(3),
  slug: slugSchema.min(3).refine(slug => !isReservedSlug(slug), {
    message: "This slug name is reserved",
  }),
  theme: z.nativeEnum(Theme).default(Theme.System),
  logo: z.string().nullish(),
  brandColor: colorSchema.nullish().refine(color => !color || !isLightColor(color), {
    message: "Choose a color that has a better contrast ratio with white",
  }),
})

export const createCompanySchema = companySchema
export const updateCompanySchema = companySchema.merge(idSchema)

export type CompanySchema = z.infer<typeof companySchema>
