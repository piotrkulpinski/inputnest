import { Container } from "@curiousleaf/design"
import { db, workspaceInclude } from "@repo/database"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Toaster } from "~/components/globals/Toaster"
import { WorkspaceProvider } from "~/providers/WorkspaceProvider"

type WorkspaceParams = {
  params: { workspace: string }
}

export async function generateMetadata({ params }: WorkspaceParams) {
  const slug = params.workspace

  const workspace = await db.workspace
    .findFirstOrThrow({ where: { slug }, include: workspaceInclude })
    .catch(() => notFound())

  return {
    title: `Feedback – ${workspace.name}`,
  }
}

export default async function WorkspaceLayout({
  children,
  params,
}: PropsWithChildren<WorkspaceParams>) {
  const slug = params.workspace

  const workspace = await db.workspace
    .findFirstOrThrow({ where: { slug }, include: workspaceInclude })
    .catch(() => notFound())

  return (
    <WorkspaceProvider workspace={workspace}>
      <Container>{children}</Container>
      <Toaster />
    </WorkspaceProvider>
  )
}
