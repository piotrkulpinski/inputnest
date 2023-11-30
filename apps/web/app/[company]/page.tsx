import { SayHello } from "~/app/[company]/SayHello"
import { SignOut } from "~/app/[company]/SignOut"

export default function Page() {
  return (
    <>
      <SayHello />
      <SignOut />
    </>
  )
}
