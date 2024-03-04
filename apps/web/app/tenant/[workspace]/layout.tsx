import { Container, Series } from "@curiousleaf/design"
import { getColorObject } from "@curiousleaf/utils"
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
  const { hsl } = getColorObject(workspace.brandColor ?? "")

  return (
    <WorkspaceProvider workspace={workspace}>
      <style>{`
        :root {
          --color-primary-lighter: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l / 0.65}%);
          --color-primary-light: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l / 0.75}%);
          --color-primary: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);
          --color-primary-dark: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l / 1.2}%);
          --color-primary-darker: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l / 1.5}%);
        }
      `}</style>

      <NavBar />

      <div className="py-10 bg-white">
        <Container>
          {children}

          <Series className="mt-10">
            <div className="size-10 rounded bg-primary-lighter" />
            <div className="size-10 rounded bg-primary-light" />
            <div className="size-10 rounded bg-primary" />
            <div className="size-10 rounded bg-primary-dark" />
            <div className="size-10 rounded bg-primary-darker" />
          </Series>
        </Container>
      </div>

      <Toaster />
    </WorkspaceProvider>
  )
}
