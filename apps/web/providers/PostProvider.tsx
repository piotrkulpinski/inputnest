import type { PropsWithChildren } from "react"

import type { RouterOutputs } from "~/services/trpc"
import { createSimpleContext } from "~/utils/providers"

type PostContext = {
  post: RouterOutputs["posts"]["get"]
}

const PostContext = createSimpleContext<PostContext>("Post")

type PostProviderProps = PropsWithChildren<{
  post: RouterOutputs["posts"]["get"]
}>

export const PostProvider = ({ post, ...props }: PostProviderProps) => {
  return <PostContext.Provider value={{ post }} {...props} />
}

export const usePost = PostContext.useValue
