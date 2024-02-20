import { OnboardingForm } from "~/app/app/onboarding/OnboardingForm"
import { BasicLayout } from "~/components/layouts/BasicLayout"

export default function OnboardingRoute() {
  return (
    <BasicLayout
      title="Create company"
      description="A company could be an organization or a team. You can create multiple companies under your account."
    >
      <OnboardingForm />
    </BasicLayout>
  )
}
