import * as z from "zod"

import { idSchema, isReservedSlug, slugSchema } from "."
// import { config } from "~/config"
// import { isLightColor } from "~/utils/helpers"

export enum Theme {
  light = "light",
  dark = "dark",
  user = "user",
}

export const companyDefaults = {
  name: "",
  slug: "",
  settings: {
    company: {
      theme: Theme.user,
      color: "#0051FF",
      // tagline: `My new ${config.title} company! 👋`,
      // description: `This is a company built with ${config.title}!`,
    },
  },
}

export const companySchema = z.object({
  name: z.string().trim().min(3),
  slug: slugSchema.min(3).refine((slug) => !isReservedSlug(slug), {
    message: "this slug name is reserved",
  }),
  settings: z.object({
    company: z.object({
      logo: z.string().optional(),
      favicon: z.string().optional(),
      theme: z.nativeEnum(Theme),
      // color: colorSchema.refine((color) => !isLightColor(color), {
      //   message: "choose a color that has a better contrast ratio with white",
      // }),
      // tagline: z.string().max(100),
      // description: z.string().max(250),
    }),
  }),
})

export const createCompanySchema = companySchema
export const updateCompanySchema = companySchema.merge(idSchema)

export type CompanySchema = z.infer<typeof companySchema>
