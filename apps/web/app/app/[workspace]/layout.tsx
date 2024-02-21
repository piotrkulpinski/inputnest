import { Container } from "@curiousleaf/design"
import { db, workspaceInclude } from "@inputnest/database"
import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

import { NavBar } from "~/components/navs/NavBar"
import { NavSide } from "~/components/navs/NavSide"
import { WorkspaceProvider } from "~/providers/WorkspaceProvider"
import { auth } from "~/services/auth"

type WorkspaceLayoutProps = PropsWithChildren<{ params: { workspace: string } }>

export default async function WorkspaceLayout({ children, params }: WorkspaceLayoutProps) {
  const session = await auth()
  const userId = session?.user?.id
  const slug = params.workspace

  const workspace = await db.workspace
    .findFirstOrThrow({
      where: { slug, members: { some: { userId, role: { in: ["Owner", "Manager"] } } } },
      include: workspaceInclude,
    })
    .catch(() => notFound())

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
