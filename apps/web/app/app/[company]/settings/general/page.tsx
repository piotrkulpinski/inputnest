import { Section } from "@curiousleaf/design"
import { CompanySettingsAppearanceForm } from "~/app/app/[company]/settings/general/appearance"
import { CompanySettingsDeleteForm } from "~/app/app/[company]/settings/general/delete"
import { CompanySettingsGeneralForm } from "~/app/app/[company]/settings/general/general"
import { SettingsProvider } from "~/providers/settings-provider"

export default function CompanySettingsGeneralPage() {
  return (
    <Section>
      <SettingsProvider>
        <CompanySettingsGeneralForm />
      </SettingsProvider>

      <SettingsProvider>
        <CompanySettingsAppearanceForm />
      </SettingsProvider>

      <CompanySettingsDeleteForm />
    </Section>
  )
}
