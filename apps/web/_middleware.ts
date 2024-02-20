import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import { getSubdomainFromHost } from "~/utils/requests"

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

export default authMiddleware({
  publicRoutes: [/^(?!\/app).*/],

  afterAuth: (auth, { url, nextUrl, headers }) => {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: url })
    }

    const { pathname, searchParams } = nextUrl
    const host = headers.get("host") || ""

    // Get the subdomain of the request (e.g. demo)
    const subdomain = getSubdomainFromHost(host)

    // Get the query string of the request (e.g. ?foo=bar)
    const params = searchParams.toString()

    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${pathname}${params.length > 0 ? `?${params}` : ""}`

    if (subdomain) {
      let newPath: string

      switch (subdomain) {
        case "auth":
          newPath = `/auth${path}`
          break
        default:
          newPath = `/tenant/${subdomain}${path}`
          break
      }

      console.log(`>>> Rewriting: ${path} to ${newPath}`)
      return NextResponse.rewrite(new URL(newPath, url))
    }

    // Ignore requests to the root domain
    return NextResponse.next()
  },
})
