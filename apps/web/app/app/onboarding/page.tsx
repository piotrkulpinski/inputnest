import { OnboardingForm } from "~/app/app/onboarding/OnboardingForm"
import { AuthLayout } from "~/components/auth/AuthLayout"

export default function OnboardingRoute() {
  return (
    <AuthLayout
      title="Create company"
      subtitle="A company could be an organization or a team. You can create multiple companies under your account."
    >
      <OnboardingForm />
    </AuthLayout>
  )
}
