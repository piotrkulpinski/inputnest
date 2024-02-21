"use client"

import { WorkspaceWithMembers } from "@repo/database"
import type { PropsWithChildren } from "react"

import type { RouterOutputs } from "~/services/trpc"
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