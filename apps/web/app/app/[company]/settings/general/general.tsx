"use client"

import type { HTMLAttributes } from "react"

import { useSettings } from "~/providers/settings-provider"
import { getTenantHost } from "~/utils/helpers"
import { Form } from "~/components/form/Form"
import { Card, Header } from "@curiousleaf/design"

export const CompanySettingsGeneralForm = (props: HTMLAttributes<HTMLElement>) => {
  const { form, onSubmit, isLoading } = useSettings()

  return (
    <Card asChild {...props}>
      <Form onSubmit={onSubmit}>
        <Card.Section>
          <Header title="General" description="View and update your company details." />

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
        </Card.Section>

        <Card.Footer>
          <Form.Button loading={isLoading}>Save Changes</Form.Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
