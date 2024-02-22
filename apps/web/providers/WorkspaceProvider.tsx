"use client"

import { RouterOutputs } from "@inputnest/api"
import { WorkspaceWithMembers } from "@inputnest/database"
import type { PropsWithChildren } from "react"

import { createSimpleContext } from "~/utils/providers"

type Workspace = NonNullable<RouterOutputs["workspaces"]["getBySlug"]>

const WorkspaceContext = createSimpleContext<WorkspaceWithMembers>("Workspace")

type WorkspaceProviderProps = PropsWithChildren<{
  workspace: WorkspaceWithMembers
}>

export const WorkspaceProvider = ({ workspace, ...props }: WorkspaceProviderProps) => {
  return <WorkspaceContext.Provider value={workspace} {...props} />
}

export const useWorkspace = WorkspaceContext.useValue
