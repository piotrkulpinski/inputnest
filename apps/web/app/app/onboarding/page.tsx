import { Modal } from "@curiousleaf/design"
import { OnboardingForm } from "~/app/app/onboarding/OnboardingForm"
import { BasicLayout } from "~/components/layouts/basic/BasicLayout"

export default function OnboardingRoute() {
  return (
    <Modal size="sm">
      <BasicLayout
        title="Create workspace"
        description="A workspace could be an organization or a team. You can create multiple workspaces under your account."
      >
        <OnboardingForm />
      </BasicLayout>
    </Modal>
  )
}
