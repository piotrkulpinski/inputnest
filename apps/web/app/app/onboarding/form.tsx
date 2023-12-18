"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import type { CompanySchema } from "@repo/database"
import { companyDefaults, companySchema } from "@repo/database"
import type { HTMLAttributes } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { FormAffix } from "~/components/form/affix"
import { FormInput } from "~/components/form/controls/input"
import { FormField } from "~/components/form/field"
import { FormFieldset } from "~/components/form/fieldset"
import { Button } from "~/components/interface/button"
import { useFormSlug } from "~/hooks/use-form-slug"
import { useMutationHandler } from "~/hooks/use-mutation-handler"
import { api } from "~/services/trpc"
import { getTenantHost } from "~/utils/helpers"

export const OnboardingForm = ({ ...props }: HTMLAttributes<HTMLFormElement>) => {
  const apiUtils = api.useUtils()
  const { handleSuccess, handleError } = useMutationHandler()

  const form = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
    values: companyDefaults,
  })

  const { mutate: createCompany, isLoading } = api.companies.create.useMutation({
    onSuccess: async ({ slug }) => {
      // Invalidate the companies cache
      await apiUtils.companies.getAll.invalidate()

      // Redirect with success message
      handleSuccess({
        redirect: `/${slug}`,
        success: "Company created successfully",
      })
    },

    onError: (error) => handleError({ error, form }),
  })

  // Set the slug based on the name
  useFormSlug({
    form,
    invokerField: "name",
    targetField: "slug",
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((v) => createCompany(v))} className="contents" {...props}>
        <FormFieldset className="h-full">
          <FormField name="name" label="Name" required>
            <FormInput placeholder="Acme Corporation" data-1p-ignore />
          </FormField>

          <FormField
            name="slug"
            label="Subdomain"
            hint="Your company is visible at this address."
            required
          >
            <FormAffix suffix={getTenantHost()}>
              <FormInput placeholder="acme" />
            </FormAffix>
          </FormField>

          <Button isLoading={isLoading} className="mt-auto w-full">
            Create Company
          </Button>
        </FormFieldset>
      </form>
    </FormProvider>
  )
}
