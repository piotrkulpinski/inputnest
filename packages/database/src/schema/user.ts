import * as z from "zod"

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().optional(),
  customerId: z.string().optional(),
})
