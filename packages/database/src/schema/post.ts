import * as z from "zod"

import { idSchema } from "./index"

export const postSchema = z.object({
  title: z.string().trim().min(1, "This field is required"),
  content: z.string().nullish(),
  boardId: z.string().min(1, "This field is required"),
  statusId: z.string().min(1, "This field is required"),
})

export const postRelationSchema = z.object({
  companyId: z.string(),
})

export const createPostSchema = postSchema.merge(postRelationSchema)
export const updatePostSchema = postSchema.merge(idSchema)

export type PostSchema = z.infer<typeof postSchema>
