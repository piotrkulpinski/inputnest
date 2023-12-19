"use client"

import type { HTMLAttributes } from "react"

import { FormAffix } from "~/components/form/affix"
import { FormInput } from "~/components/form/controls/input"
import { FormField } from "~/components/form/field"
import { FormFieldset } from "~/components/form/fieldset"
import { Box, BoxHeader, BoxFooter } from "~/components/interface/box"
import { Button } from "~/components/interface/button"
import { useSettings } from "~/providers/settings-provider"
import { getTenantHost } from "~/utils/helpers"

export const CompanySettingsGeneralForm = (props: HTMLAttributes<HTMLElement>) => {
  const { form, onSubmit, isLoading } = useSettings()

  return (
    <Box asChild {...props}>
      <form onSubmit={onSubmit}>
        <BoxHeader title="General" description="View and update your company details." />

        <FormFieldset>
          <FormField
            control={form.control}
            name="name"
            label="Name"
            hint="Used as a logo fallback, and to identify your company on the dashboard."
            required
          >
            <FormInput />
          </FormField>

          <FormField
            control={form.control}
            name="slug"
            label="Subdomain"
            hint="Your company is visible at this address."
            required
          >
            <FormAffix suffix={getTenantHost()} className="max-w-sm">
              <FormInput />
            </FormAffix>
          </FormField>
        </FormFieldset>

        <BoxFooter>
          <Button isLoading={isLoading}>Save Changes</Button>
        </BoxFooter>
      </form>
    </Box>
  )
}
