import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"
import { config } from "~/config"
import { auth } from "~/services/auth"

export default async function AppLayout({ children }: PropsWithChildren) {
  const session = await auth()

  if (!session?.user) {
    redirect(config.routes.signIn)
  }

  return <>{children}</>
}
