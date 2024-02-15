"use client"

import type { HTMLAttributes } from "react"

import { Box, BoxHeader, BoxFooter } from "~/components/interface/box"
import { useSettings } from "~/providers/settings-provider"
import { getTenantHost } from "~/utils/helpers"
import { Form } from "~/components/form/Form"

export const CompanySettingsGeneralForm = (props: HTMLAttributes<HTMLElement>) => {
  const { form, onSubmit, isLoading } = useSettings()

  return (
    <Box asChild {...props}>
      <Form onSubmit={onSubmit}>
        <BoxHeader title="General" description="View and update your company details." />

        <Form.Fieldset>
          <Form.Field
            control={form.control}
            name="name"
            label="Name"
            hint="Used as a logo fallback, and to identify your company on the dashboard."
            required
          >
            <Form.Input data-1p-ignore />
          </Form.Field>

          <Form.Field
            control={form.control}
            name="slug"
            label="Subdomain"
            hint="Your company is visible at this address."
            required
          >
            <Form.Affix suffix={getTenantHost()} className="max-w-sm">
              <Form.Input />
            </Form.Affix>
          </Form.Field>
        </Form.Fieldset>

        <BoxFooter>
          <Form.Button loading={isLoading}>Save Changes</Form.Button>
        </BoxFooter>
      </Form>
    </Box>
  )
}
