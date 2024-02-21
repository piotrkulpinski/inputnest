import { OnboardingForm } from "~/app/app/onboarding/OnboardingForm"
import { BasicLayout } from "~/components/layouts/BasicLayout"

export default function OnboardingRoute() {
  return (
    <BasicLayout
      title="Create workspace"
      description="A workspace could be an organization or a team. You can create multiple workspaces under your account."
    >
      <OnboardingForm />
    </BasicLayout>
  )
}
