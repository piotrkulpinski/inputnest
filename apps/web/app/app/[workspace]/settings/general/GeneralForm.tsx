"use client"

import type { HTMLAttributes } from "react"

import { Card, Header } from "@curiousleaf/design"
import { Form } from "~/components/form/Form"
import { useSettings } from "~/providers/SettingsProvider"
import { getTenantHost } from "~/utils/helpers"

export const GeneralForm = (props: HTMLAttributes<HTMLElement>) => {
  const { form, onSubmit, isPending } = useSettings()

  return (
    <Card asChild {...props}>
      <Form onSubmit={onSubmit}>
        <Card.Section>
          <Header title="General" description="View and update your workspace details." />

          <Form.Fieldset>
            <Form.Field control={form.control} name="name" label="Workspace Name" isRequired>
              <Form.Input data-1p-ignore className="max-w-lg" />
            </Form.Field>

            <Form.Field
              control={form.control}
              name="slug"
              label="Subdomain"
              hint="Your workspace is visible at this address."
              isRequired
            >
              <Form.Affix suffix={getTenantHost()} className="max-w-sm">
                <Form.Input />
              </Form.Affix>
            </Form.Field>
          </Form.Fieldset>
        </Card.Section>

        <Card.Row direction="rowReverse">
          <Form.Button isPending={isPending}>Save Changes</Form.Button>
        </Card.Row>
      </Form>
    </Card>
  )
}
