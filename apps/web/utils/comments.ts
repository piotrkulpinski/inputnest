import type { RouterOutputs } from "~/services/trpc"

export type Comment = RouterOutputs["comments"]["getAll"][number]
export type CommentWithChildren = Comment & { children: CommentWithChildren[] }

export const buildCommentsTree = (comments: Comment[]) => {
  const commentMap = new Map<string, CommentWithChildren>()
  const roots: CommentWithChildren[] = []

  // Map each comment to its ID, adding an empty children array
  comments.map(comment => commentMap.set(comment.id, { ...comment, children: [] }))

  // Attach children to their parents
  for (const comment of comments) {
    const commentElement = commentMap.get(comment.id)
    const parentCommentElement = comment.parentId ? commentMap.get(comment.parentId) : null
    const childrenMap = parentCommentElement ? parentCommentElement.children : roots

    if (commentElement) {
      childrenMap.push(commentElement)
    }
  }

  return roots
}
