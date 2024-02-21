"use client"

import { Container } from "@curiousleaf/design"
import { notFound, useParams } from "next/navigation"
import type { PropsWithChildren } from "react"

import { Toaster } from "~/components/globals/Toaster"
import { WorkspaceProvider } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc"

export default function WorkspaceLayout({ children }: PropsWithChildren) {
  const { workspace: slug } = useParams() as { workspace: string }

  const { data: workspace, isLoading, isSuccess } = api.workspaces.getBySlug.useQuery({ slug })

  if (isLoading) {
    return "loading..."
  }

  if (!isSuccess || !workspace) {
    notFound()
  }

  return (
    <WorkspaceProvider workspace={workspace}>
      <Container>{children}</Container>
      <Toaster />
    </WorkspaceProvider>
  )
}
