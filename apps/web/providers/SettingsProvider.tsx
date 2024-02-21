"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import type { WorkspaceWithMembers } from "@inputnest/database"
import { updateWorkspaceSchema } from "@inputnest/database"
import type { FormEventHandler, PropsWithChildren } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useWorkspace } from "~/providers/WorkspaceProvider"
import { api } from "~/services/trpc"
import { createSimpleContext } from "~/utils/providers"

export type SettingsContext = {
  form: ReturnType<typeof useForm<WorkspaceWithMembers>>
  isLoading: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
}

const SettingsContext = createSimpleContext<SettingsContext>("Settings")

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const apiUtils = api.useUtils()
  const { handleSuccess, handleError } = useMutationHandler()
  const workspace = useWorkspace()

  const form = useForm({
    resolver: zodResolver(updateWorkspaceSchema),
    values: workspace,
  })

  const { mutate: updateWorkspace, isLoading } = api.workspaces.update.useMutation({
    onSuccess: async ({ slug }) => {
      handleSuccess({
        refresh: workspace.slug === slug,
        redirect: workspace.slug !== slug ? `/app/${slug}/settings` : undefined,
        success: "Settings updated successfully",
      })

      // Invalidate the workspace list
      await apiUtils.workspaces.getAll.invalidate()
      await apiUtils.workspaces.getBySlug.invalidate({ slug })
    },

    onError: error => handleError({ error, form }),
  })

  const onSubmit = form.handleSubmit(data => {
    updateWorkspace(data)
  })

  return (
    <SettingsContext.Provider value={{ form, isLoading, onSubmit }}>
      <FormProvider {...form}>{children}</FormProvider>
    </SettingsContext.Provider>
  )
}

export const useSettings = SettingsContext.useValue
