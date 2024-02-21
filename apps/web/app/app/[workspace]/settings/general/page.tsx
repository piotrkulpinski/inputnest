import { Section } from "@curiousleaf/design"
import { AppearanceForm } from "~/app/app/[workspace]/settings/general/AppearanceForm"
import { DeleteForm } from "~/app/app/[workspace]/settings/general/DeleteForm"
import { GeneralForm } from "~/app/app/[workspace]/settings/general/GeneralForm"
import { SettingsProvider } from "~/providers/SettingsProvider"

export default function SettingsGeneralPage() {
  return (
    <Section>
      <SettingsProvider>
        <GeneralForm />
      </SettingsProvider>

      <SettingsProvider>
        <AppearanceForm />
      </SettingsProvider>

      <DeleteForm />
    </Section>
  )
}
