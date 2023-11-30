import { ClerkLoading, SignUp } from "@clerk/nextjs"
import { IconLoader } from "@tabler/icons-react"

import { AuthLayout } from "~/components/auth/layout"

const SignUpPage = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="An UserPledge account is all you need to start collecting customer feedback."
    >
      <ClerkLoading>
        <IconLoader className="mx-auto" />
      </ClerkLoading>

      <SignUp />
    </AuthLayout>
  )
}

export default SignUpPage
