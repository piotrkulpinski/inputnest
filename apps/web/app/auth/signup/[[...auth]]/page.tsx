import { ClerkLoading, SignUp } from "@clerk/nextjs"
import { IconLoader } from "@curiousleaf/design"

import { AuthLayout } from "~/components/auth/AuthLayout"

export default function SignUpPage() {
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
