import { Modal } from "@curiousleaf/design"
import { redirect } from "next/navigation"
import { AuthSignIn } from "~/components/auth/AuthSignIn"
import { BasicLayout } from "~/components/layouts/basic/BasicLayout"
import { config } from "~/config"
import { auth } from "~/services/auth"

export default async function SignInPage() {
  const session = await auth()

  if (session?.user?.email) {
    redirect(config.routes.dashboard)
  }

  return (
    <Modal size="sm">
      <BasicLayout
        title="Sign in to your account"
        description={`An ${config.title} account is all you need to start collecting customer feedback.`}
      >
        <AuthSignIn />
      </BasicLayout>
    </Modal>
  )
}
