"use client"

import { kebabCase } from "@curiousleaf/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import type { WorkspaceSchema } from "@inputnest/database"
import { workspaceSchema } from "@inputnest/database"
import type { HTMLAttributes } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { Form } from "~/components/form/Form"
import { useComputedField } from "~/hooks/useComputedField"
import { useMutationHandler } from "~/hooks/useMutationHandler"
import { api } from "~/services/trpc/client"
import { getTenantHost } from "~/utils/helpers"
import { getDefaults } from "~/utils/zod"

export const OnboardingForm = ({ ...props }: HTMLAttributes<HTMLFormElement>) => {
  const apiUtils = api.useUtils()
  const { handleSuccess, handleError } = useMutationHandler()

  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    values: getDefaults(workspaceSchema),
  })

  const { mutate: createWorkspace, isPending } = api.workspaces.create.useMutation({
    onSuccess: async ({ slug }) => {
      handleSuccess({
        redirect: `/app/${slug}`,
        success: "Workspace created successfully",
      })

      // Invalidate the workspaces cache
      await apiUtils.workspaces.getAll.invalidate()
    },

    onError: error => handleError({ error, form }),
  })

  // Set the slug based on the name
  useComputedField({
    form,
    sourceField: "name",
    computedField: "slug",
    callback: kebabCase,
  })

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(v => createWorkspace(v))} {...props}>
        <Form.Fieldset className="size-full">
          <Form.Field control={form.control} name="name" label="Name" isRequired>
            <Form.Input placeholder="Acme Corporation" data-1p-ignore />
          </Form.Field>

          <Form.Field
            control={form.control}
            name="slug"
            label="Subdomain"
            hint="Your workspace is visible at this address."
            isRequired
          >
            <Form.Affix suffix={getTenantHost()}>
              <Form.Input placeholder="acme" />
            </Form.Affix>
          </Form.Field>

          <Form.Button isPending={isPending} className="mt-auto w-full">
            Create Workspace
          </Form.Button>
        </Form.Fieldset>
      </Form>
    </FormProvider>
  )
}
