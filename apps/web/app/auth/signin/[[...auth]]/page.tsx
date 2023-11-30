import { ClerkLoading, SignIn } from "@clerk/nextjs"
import { IconLoader } from "@tabler/icons-react"

import { AuthLayout } from "~/components/auth/layout"

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>
}

const SignInPage = ({ searchParams }: PageProps) => {
  const redirectTo = searchParams.redirectTo as string | undefined

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="An UserPledge account is all you need to start collecting customer feedback."
    >
      <ClerkLoading>
        <IconLoader className="mx-auto" />
      </ClerkLoading>

      <SignIn redirectUrl={redirectTo} />
    </AuthLayout>
  )
}

export default SignInPage