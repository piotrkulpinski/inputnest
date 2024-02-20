import Image from "next/image"
import { redirect } from "next/navigation"
import { SignInButton } from "~/app/auth/signin/SignInButton"
import { BasicLayout } from "~/components/layouts/BasicLayout"
import { config } from "~/config"
import { auth } from "~/services/auth"

export default async function SignInPage() {
  const session = await auth()

  if (session?.user?.email) {
    redirect(config.routes.dashboard)
  }

  return (
    <BasicLayout
      title="Sign in to your account"
      description="An InputNest account is all you need to start collecting customer feedback."
    >
      <div className="flex flex-col gap-4">
        <SignInButton
          provider="google"
          variant="solid"
          prefix={<Image src="/google.svg" alt="" width={20} height={20} unoptimized />}
        />
      </div>
    </BasicLayout>
  )
}
