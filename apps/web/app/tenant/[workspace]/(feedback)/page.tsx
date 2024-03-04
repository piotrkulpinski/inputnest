"use client"

import { Header } from "@curiousleaf/design"
import { useWorkspace } from "~/providers/WorkspaceProvider"

export default function Route() {
  const workspace = useWorkspace()

  return (
    <Header.Root>
      <Header.Title size="h1">Share your product feedback!</Header.Title>
      <Header.Description
        size="lg"
        content={`Please tell us what we can do to make ${workspace.name} the best product for you.`}
      />
    </Header.Root>
  )
}
