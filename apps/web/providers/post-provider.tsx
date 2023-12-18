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

export const PostProvider = ({ children, post }: PostProviderProps) => {
  return <PostContext.Provider value={{ post }}>{children}</PostContext.Provider>
}

export const usePost = PostContext.useValue
