import { ClerkLoading, SignIn } from "@clerk/nextjs"
import { Loader } from "@curiousleaf/design"

import { AuthLayout } from "~/components/auth/layout"

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>
}

export default function SignInPage({ searchParams }: PageProps) {
  const redirectTo = searchParams.redirectTo as string | undefined

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="An UserPledge account is all you need to start collecting customer feedback."
    >
      <ClerkLoading>
        <Loader className="mx-auto" />
      </ClerkLoading>

      <SignIn redirectUrl={redirectTo} />
    </AuthLayout>
  )
}
