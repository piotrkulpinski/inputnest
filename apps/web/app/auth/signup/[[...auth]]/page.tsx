import { ClerkLoading, SignUp } from "@clerk/nextjs"
import { Loader } from "@curiousleaf/design"

import { AuthLayout } from "~/components/auth/layout"

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="An UserPledge account is all you need to start collecting customer feedback."
    >
      <ClerkLoading>
        <Loader className="mx-auto" />
      </ClerkLoading>

      <SignUp />
    </AuthLayout>
  )
}
