import { isLightColor } from "@curiousleaf/utils"
import * as z from "zod"

import { Theme } from "@prisma/client"
import { colorSchema, idSchema, isReservedSlug, slugSchema } from "./index"

export const workspaceSchema = z.object({
  name: z.string().trim().min(3).default(""),
  slug: slugSchema
    .min(3)
    .refine(slug => !isReservedSlug(slug), {
      message: "This slug name is reserved",
    })
    .default(""),
  theme: z.nativeEnum(Theme).default(Theme.System),
  logo: z.string().nullish(),
  brandColor: colorSchema
    .nullish()
    .refine(color => !color || !isLightColor(color), {
      message: "Choose a color that has a better contrast ratio with white",
    })
    .default("#0051FF"),
})

export const createWorkspaceSchema = workspaceSchema
export const updateWorkspaceSchema = workspaceSchema.merge(idSchema)

export type WorkspaceSchema = z.infer<typeof workspaceSchema>
