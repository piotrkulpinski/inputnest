import { Container } from "@curiousleaf/design"
import { notFound } from "next/navigation"
import { type PropsWithChildren, cache } from "react"
import { NavBar } from "~/app/tenant/[workspace]/NavBar"

import { Toaster } from "~/components/globals/Toaster"
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

export async function generateMetadata({ params }: Params) {
  const workspace = await getWorkspaceBySlug(params.workspace)

  return {
    title: `Feedback – ${workspace.name}`,
  }
}

export default async function WorkspaceLayout({ children, params }: PropsWithChildren<Params>) {
  const workspace = await getWorkspaceBySlug(params.workspace)

  return (
    <WorkspaceProvider workspace={workspace}>
      <NavBar />

      <div className="h-[150vh] py-10 bg-white">
        <Container>{children}</Container>
      </div>

      <Toaster />
    </WorkspaceProvider>
  )
}
