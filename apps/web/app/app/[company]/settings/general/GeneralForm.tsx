"use client"

import type { HTMLAttributes } from "react"

import { Card, Header } from "@curiousleaf/design"
import { Form } from "~/components/form/Form"
import { useSettings } from "~/providers/SettingsProvider"
import { getTenantHost } from "~/utils/helpers"

export const GeneralForm = (props: HTMLAttributes<HTMLElement>) => {
  const { form, onSubmit, isLoading } = useSettings()

  return (
    <Card asChild {...props}>
      <Form onSubmit={onSubmit}>
        <Card.Section>
          <Header title="General" description="View and update your company details." />

          <Form.Fieldset>
            <Form.Field control={form.control} name="name" label="Company Name" required>
              <Form.Input data-1p-ignore className="max-w-lg" />
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

        <Card.Row direction="rowReverse">
          <Form.Button loading={isLoading}>Save Changes</Form.Button>
        </Card.Row>
      </Form>
    </Card>
  )
}
