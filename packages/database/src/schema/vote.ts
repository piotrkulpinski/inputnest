import * as z from "zod"

export const voteRelationSchema = z.object({
  postId: z.string(),
})
