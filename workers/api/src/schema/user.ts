import * as z from "zod"

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  imageUrl: z.string().optional(),
  customerId: z.string().optional(),
})
