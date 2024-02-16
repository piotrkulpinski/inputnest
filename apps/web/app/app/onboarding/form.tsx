"use client"

import { toSlugCase } from "@curiousleaf/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import type { CompanySchema } from "@repo/database"
import { companyDefaults, companySchema } from "@repo/database"
import type { HTMLAttributes } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { useComputedField } from "~/hooks/useComputedField"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { api } from "~/services/trpc"
import { getTenantHost } from "~/utils/helpers"
import { Form } from "~/components/form/Form"

export const OnboardingForm = ({ ...props }: HTMLAttributes<HTMLFormElement>) => {
  const apiUtils = api.useUtils()
  const { handleSuccess, handleError } = useMutationHandler()

  const form = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
    values: companyDefaults,
  })

  const { mutate: createCompany, isLoading } = api.companies.create.useMutation({
    onSuccess: async ({ slug }) => {
      handleSuccess({
        redirect: `/app/${slug}`,
        success: "Company created successfully",
      })

      // Invalidate the companies cache
      await apiUtils.companies.getAll.invalidate()
    },

    onError: error => handleError({ error, form }),
  })

  // Set the slug based on the name
  useComputedField({
    form,
    sourceField: "name",
    computedField: "slug",
    callback: toSlugCase,
  })

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(v => createCompany(v))} {...props}>
        <Form.Fieldset className="h-full">
          <Form.Field name="name" label="Name" required>
            <Form.Input placeholder="Acme Corporation" data-1p-ignore />
          </Form.Field>

          <Form.Field
            name="slug"
            label="Subdomain"
            hint="Your company is visible at this address."
            required
          >
            <Form.Affix suffix={getTenantHost()}>
              <Form.Input placeholder="acme" />
            </Form.Affix>
          </Form.Field>

          <Form.Button loading={isLoading} className="mt-auto w-full">
            Create Company
          </Form.Button>
        </Form.Fieldset>
      </Form>
    </FormProvider>
  )
}
