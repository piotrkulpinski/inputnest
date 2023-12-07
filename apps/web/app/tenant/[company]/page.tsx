import { SayHello } from "~/app/tenant/[company]/SayHello"
import { SignOut } from "~/app/tenant/[company]/SignOut"

export default function Page() {
  return (
    <>
      <SayHello />
      <SignOut />
    </>
  )
}
