"use client"

import { Avatar, Card, Header } from "@curiousleaf/design"
import { Theme } from "@inputnest/database"
import type { HTMLAttributes } from "react"
import { Form } from "~/components/form/Form"

import { useSettings } from "~/providers/SettingsProvider"

export const AppearanceForm = (props: HTMLAttributes<HTMLElement>) => {
  const { form, onSubmit, isPending } = useSettings()

  // Watch form values
  const id = form.getValues("id")
  const logo = form.watch("logo")

  return (
    <Card asChild {...props}>
      <Form onSubmit={onSubmit}>
        <Card.Section>
          <Header
            title="Appearance"
            description="You can customize your workspace's appearance from here."
          />

          <Form.Fieldset>
            <Form.Field
              control={form.control}
              name="logo"
              label="Logo"
              hint="Displayed in the header of your website. Recommended size: 96x96px."
            >
              <Form.Uploader folder={id}>
                {logo && <Avatar src={logo} alt="" shape="rounded" size="lg" />}
              </Form.Uploader>
            </Form.Field>

            <Form.Field
              control={form.control}
              name="theme"
              label="Theme"
              hint="Select an interface theme for your public portal."
              isRequired
            >
              <Form.RadioGroup
                options={[{ value: Theme.Light }, { value: Theme.Dark }, { value: Theme.System }]}
              />
            </Form.Field>

            <Form.Field
              control={form.control}
              name="brandColor"
              label="Brand Color"
              hint="Assign a brand color to your public portal."
              isRequired
            >
              <Form.ColorPicker />
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
