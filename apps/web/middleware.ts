import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import { getValidSubdomain } from "~/utils/requests"

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

export default authMiddleware({
  publicRoutes: ["/"],

  afterAuth: (auth, { url, nextUrl, headers }) => {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: url })
    }

    const { pathname, searchParams } = nextUrl
    const host = headers.get("host")

    // Get the subdomain of the request (e.g. demo)
    const subdomain = getValidSubdomain(host)

    // Get the query string of the request (e.g. ?foo=bar)
    const params = searchParams.toString()

    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${pathname}${params.length > 0 ? `?${params}` : ""}`

    // Subdomain available, rewrite to `/[domain]/[slug] dynamic route
    if (subdomain) {
      console.log(`>>> Rewriting: ${pathname} to /${subdomain}${path}`)
      return NextResponse.rewrite(new URL(`/${subdomain}${path}`, url))
    }

    // Ignore any other requests
    return NextResponse.next()
  },
})
