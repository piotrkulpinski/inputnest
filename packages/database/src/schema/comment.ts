import * as z from "zod"

import { idSchema } from "./index"

export const commentSchema = z.object({
  content: z.string().trim().min(3),
  isPrivate: z.coerce.boolean().default(false),
  isPinned: z.coerce.boolean().default(false),
  parentId: z.string().nullish(),
})

export const commentRelationSchema = z.object({
  postId: z.string(),
})

export const createCommentSchema = commentSchema.merge(commentRelationSchema)
export const updateCommentSchema = commentSchema.merge(idSchema)

export type CommentSchema = z.infer<typeof commentSchema>
