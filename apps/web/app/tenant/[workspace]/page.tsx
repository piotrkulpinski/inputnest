"use client"

import { useWorkspace } from "~/providers/WorkspaceProvider"

export default function Route() {
  const workspace = useWorkspace()
  return workspace.name
}
