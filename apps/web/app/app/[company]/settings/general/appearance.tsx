"use client"

import type { HTMLAttributes } from "react"

import { FormColorPicker } from "~/components/form/controls/color-picker"
import { FormInput } from "~/components/form/controls/input"
import { FormRadio } from "~/components/form/controls/radio"
import { FormTextarea } from "~/components/form/controls/textarea"
import { FormUploader } from "~/components/form/controls/uploader"
import { FormField } from "~/components/form/field"
import { FormFieldset } from "~/components/form/fieldset"
import { Box, BoxFooter, BoxHeader } from "~/components/interface/box"
import { Button } from "~/components/interface/button"
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
    <Box asChild {...props}>
      <form onSubmit={onSubmit}>
        <BoxHeader
          title="Appearance"
          description="Upload your logo and favicon, and choose a theme for your website."
        />

        <FormFieldset>
          <FormField
            control={form.control}
            name="settings.company.logo"
            label="Logo"
            hint="Choose a theme for your website. Last option enables the theme switcher."
          >
            <FormUploader folder={id} fileSizeLimit={config.fileLimitSm}>
              {logo && <img src={getImage({ image: logo, height: 48 })} alt="" className="h-5" />}
            </FormUploader>
          </FormField>

          <FormField
            control={form.control}
            name="settings.company.favicon"
            label="Favicon"
            hint="Upload an icon for browser tabs, at least 32x32px"
          >
            <FormUploader folder={id} fileSizeLimit={config.fileLimitSm}>
              {favicon && (
                <img src={getImage({ image: favicon, height: 48 })} alt="" className="h-5" />
              )}
            </FormUploader>
          </FormField>

          <FormField
            control={form.control}
            name="settings.company.theme"
            label="Theme"
            hint="Default theme for your website. Last option enables the theme switcher."
            required
          >
            <FormRadio
              options={[
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
                { label: "User Preferred", value: "user" },
              ]}
            />
          </FormField>

          <FormField
            control={form.control}
            name="settings.company.color"
            label="Brand Color"
            hint="Primary color for your website."
            required
          >
            <FormColorPicker />
          </FormField>

          <FormField
            control={form.control}
            name="settings.company.tagline"
            label="Tagline"
            hint="A short, catchy description of the website. Max. 100 characters."
          >
            <FormInput />
          </FormField>

          <FormField
            control={form.control}
            name="settings.company.description"
            label="Description"
            hint="A longer description of the website. Temporarily used as a website intro. Max. 250 characters."
          >
            <FormTextarea minRows={3} />
          </FormField>
        </FormFieldset>

        <BoxFooter>
          <Button isLoading={isLoading}>Save Changes</Button>
        </BoxFooter>
      </form>
    </Box>
  )
}
