import { Modal } from "@curiousleaf/design"
import { redirect } from "next/navigation"
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
        title="Check your email"
        description="Please check your email inbox, spam, or junk folders for the magic link we've sent. Clicking on the link will instantly sign you into your account."
      />
    </Modal>
  )
}
