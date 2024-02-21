"use client"

import { Card, Header } from "@curiousleaf/design"
import { Theme } from "@repo/database"
import Image from "next/image"
import type { HTMLAttributes } from "react"
import { Form } from "~/components/form/Form"

import { useSettings } from "~/providers/SettingsProvider"

export const AppearanceForm = (props: HTMLAttributes<HTMLElement>) => {
  const { form, onSubmit, isLoading } = useSettings()

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
                {logo && <Image src={logo} alt="" width={48} height={48} className="h-6 w-auto" />}
              </Form.Uploader>
            </Form.Field>

            <Form.Field
              control={form.control}
              name="theme"
              label="Theme"
              hint="Select an interface theme for your public portal."
              required
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
              required
            >
              <Form.ColorPicker />
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
