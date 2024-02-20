import { SessionProvider } from "next-auth/react"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"
import { config } from "~/config"
import { auth } from "~/services/auth"

export default async function AppLayout({ children }: PropsWithChildren) {
  const session = await auth()

  if (!session?.user?.email) {
    redirect(config.routes.signIn)
  }

  return <SessionProvider session={session}>{children}</SessionProvider>
}
