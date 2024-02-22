import * as z from "zod"

export const postSchema = z.object({
  title: z.string().trim().min(1, "This field is required"),
  content: z.string().nullish(),
  boardId: z.string().min(1, "This field is required"),
  statusId: z.string().min(1, "This field is required"),
})

export type PostSchema = z.infer<typeof postSchema>
