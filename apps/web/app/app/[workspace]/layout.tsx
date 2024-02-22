import { Container } from "@curiousleaf/design"
import { notFound } from "next/navigation"
import { type PropsWithChildren, cache } from "react"

import { NavBar } from "~/components/navs/NavBar"
import { NavSide } from "~/components/navs/NavSide"
import { WorkspaceProvider } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc/server"

type Params = {
  params: { workspace: string }
}

export const getWorkspaceBySlug = cache(async (slug: string) => {
  const workspace = await api.workspaces.getBySlug.query({ slug })

  if (!workspace) {
    notFound()
  }

  return workspace
})

export default async function WorkspaceLayout({ children, params }: PropsWithChildren<Params>) {
  const workspace = await getWorkspaceBySlug(params.workspace)

  return (
    <WorkspaceProvider workspace={workspace}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <NavBar className="lg:hidden" />
        <NavSide className="max-lg:hidden" floating />

        <Container size="sm" className="!p-2">
          {children}
        </Container>
      </div>
    </WorkspaceProvider>
  )
}
