"use client"

import { Card, Header } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"
import { Form } from "~/components/form/Form"

import { config } from "~/config"
import { useSettings } from "~/providers/settings-provider"
import { getImage } from "~/utils/images"

export const CompanySettingsAppearanceForm = (props: HTMLAttributes<HTMLElement>) => {
  const { form, onSubmit, isLoading } = useSettings()

  // Watch form values
  const id = form.getValues("id")
  const logo = form.watch("settings.company.logo")
  const favicon = form.watch("settings.company.favicon")

  return (
    <Card asChild {...props}>
      <Form onSubmit={onSubmit}>
        <Card.Section>
          <Header
            title="Appearance"
            description="Upload your logo and favicon, and choose a theme for your website."
          />

          <Form.Fieldset>
            <Form.Field
              control={form.control}
              name="settings.company.logo"
              label="Logo"
              hint="Choose a theme for your website. Last option enables the theme switcher."
            >
              <Form.Uploader folder={id} fileSizeLimit={config.fileLimitSm}>
                {logo && <img src={getImage({ image: logo, height: 48 })} alt="" className="h-5" />}
              </Form.Uploader>
            </Form.Field>

            <Form.Field
              control={form.control}
              name="settings.company.favicon"
              label="Favicon"
              hint="Upload an icon for browser tabs, at least 32x32px"
            >
              <Form.Uploader folder={id} fileSizeLimit={config.fileLimitSm}>
                {favicon && (
                  <img src={getImage({ image: favicon, height: 48 })} alt="" className="h-5" />
                )}
              </Form.Uploader>
            </Form.Field>

            <Form.Field
              control={form.control}
              name="settings.company.theme"
              label="Theme"
              hint="Default theme for your website. Last option enables the theme switcher."
              required
            >
              <Form.RadioGroup
                options={[
                  { label: "Light", value: "light" },
                  { label: "Dark", value: "dark" },
                  { label: "User Preferred", value: "user" },
                ]}
              />
            </Form.Field>

            <Form.Field
              control={form.control}
              name="settings.company.color"
              label="Brand Color"
              hint="Primary color for your website."
              required
            >
              <Form.ColorPicker />
            </Form.Field>

            <Form.Field
              control={form.control}
              name="settings.company.tagline"
              label="Tagline"
              hint="A short, catchy description of the website. Max. 100 characters."
            >
              <Form.Input />
            </Form.Field>

            <Form.Field
              control={form.control}
              name="settings.company.description"
              label="Description"
              hint="A longer description of the website. Temporarily used as a website intro. Max. 250 characters."
            >
              <Form.TextArea minRows={3} />
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
