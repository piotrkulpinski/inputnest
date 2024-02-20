import { BrainIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { AuthButton } from "~/components/auth/AuthButton"
import { AuthLayout } from "~/components/auth/AuthLayout"
import { config } from "~/config"
import { auth } from "~/services/auth"

export default async function SignInPage() {
  const session = await auth()

  if (session?.user?.email) {
    redirect(config.routes.dashboard)
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="An UserPledge account is all you need to start collecting customer feedback."
    >
      <div className="flex flex-col gap-4">
        <AuthButton provider="google" variant="solid" prefix={<BrainIcon />} />
      </div>
    </AuthLayout>
  )
}
