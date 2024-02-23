"use client"

import { Header } from "@curiousleaf/design"
import { useWorkspace } from "~/providers/WorkspaceProvider"

export default function Route() {
  const workspace = useWorkspace()

  return (
    <Header.Root>
      <Header.Title size="h1">Changelog</Header.Title>
      <Header.Description size="lg" content="Follow up on the latest improvements and updates." />
    </Header.Root>
  )
}
