import * as z from "zod"

import { idSchema } from "."

export const commentDefaults = {
  content: "",
  isPrivate: false,
  isPinned: false,
}

export const commentSchema = z.object({
  content: z.string().trim().min(3),
  isPrivate: z.coerce.boolean(),
  isPinned: z.coerce.boolean(),
  parentId: z.string().nullish(),
})

export const commentRelationSchema = z.object({
  postId: z.string(),
})

export const createCommentSchema = commentSchema.merge(commentRelationSchema)
export const updateCommentSchema = commentSchema.merge(idSchema)

export type CommentSchema = z.infer<typeof commentSchema>
