"use client"

import { Header } from "@curiousleaf/design"
import { useWorkspace } from "~/providers/WorkspaceProvider"

export default function Route() {
  const workspace = useWorkspace()

  return (
    <Header.Root>
      <Header.Title size="h1">Roadmap</Header.Title>
      <Header.Description
        size="lg"
        content="Follow our indie hacker journey with 100% transparency"
      />
    </Header.Root>
  )
}
