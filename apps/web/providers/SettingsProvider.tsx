"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import type { CompanyWithMembers } from "@repo/database"
import { updateCompanySchema } from "@repo/database"
import type { FormEventHandler, PropsWithChildren } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { useMutationHandler } from "~/hooks/useMutationHandler"
import { useCompany } from "~/providers/CompanyProvider"
import { api } from "~/services/trpc"
import { createSimpleContext } from "~/utils/providers"

export type SettingsContext = {
  form: ReturnType<typeof useForm<CompanyWithMembers>>
  isLoading: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
}

const SettingsContext = createSimpleContext<SettingsContext>("Settings")

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const apiUtils = api.useUtils()
  const { handleSuccess, handleError } = useMutationHandler()
  const company = useCompany()

  const form = useForm({
    resolver: zodResolver(updateCompanySchema),
    values: company,
  })

  const { mutate: updateSettings, isLoading } = api.companies.update.useMutation({
    onSuccess: async ({ slug }) => {
      handleSuccess({
        refresh: company.slug === slug,
        redirect: company.slug !== slug ? `/app/${slug}/settings` : undefined,
        success: "Settings updated successfully",
      })

      // Invalidate the company list
      await apiUtils.companies.getAll.invalidate()
      await apiUtils.companies.getBySlug.invalidate({ slug })
    },

    onError: error => handleError({ error, form }),
  })

  const onSubmit = form.handleSubmit(data => {
    updateSettings(data)
  })

  return (
    <SettingsContext.Provider value={{ form, isLoading, onSubmit }}>
      <FormProvider {...form}>{children}</FormProvider>
    </SettingsContext.Provider>
  )
}

export const useSettings = SettingsContext.useValue