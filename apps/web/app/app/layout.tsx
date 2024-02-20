import { SessionProvider } from "next-auth/react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"
import { config } from "~/config"
import { env } from "~/env"
import { auth } from "~/services/auth"

export default async function AppLayout({ children }: PropsWithChildren) {
  const session = await auth()

  if (!session?.user?.email) {
    const redirectUrl = new URL(config.routes.signIn, env.NEXT_PUBLIC_URL)
    const headersList = headers()
    const currentUrl = headersList.get("x-url")

    if (currentUrl) {
      redirectUrl.searchParams.set("callbackUrl", currentUrl)
    }

    redirect(redirectUrl.toString())
  }

  return <SessionProvider session={session}>{children}</SessionProvider>
}
