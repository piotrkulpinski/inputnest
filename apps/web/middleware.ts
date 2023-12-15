import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import { getValidSubdomain } from "~/utils/requests"

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

export default authMiddleware({
  publicRoutes: ["/", "/tenant/(.*)"],

  afterAuth: (auth, { url, nextUrl, headers }) => {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: url })
    }

    const { pathname, searchParams } = nextUrl
    const host = headers.get("host")!

    // Get the subdomain of the request (e.g. demo)
    const subdomain = getValidSubdomain(host)

    // Get the query string of the request (e.g. ?foo=bar)
    const params = searchParams.toString()

    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${pathname}${params.length > 0 ? `?${params}` : ""}`

    if (!subdomain) {
      // Ignore requests to the root domain
      return NextResponse.next()
    }

    // Subdomain is "app", rewrite to `/app/[slug]` dynamic route
    if ("app" === subdomain) {
      const newPath = `/app${path}`
      console.log(`>>> Rewriting: ${pathname} to ${newPath}`)
      return NextResponse.rewrite(new URL(newPath, url))
    }

    // Subdomain available, rewrite to `/[domain]/[slug] dynamic route
    const newPath = `/tenant/${subdomain}${path}`
    console.log(`>>> Rewriting: ${pathname} to ${newPath}`)
    return NextResponse.rewrite(new URL(newPath, url))
  },
})
