import { NextRequest, NextResponse } from "next/server"
import { getSubdomainFromHost } from "~/utils/requests"

export function middleware({ url, nextUrl, headers }: NextRequest) {
  const { pathname, searchParams } = nextUrl
  const host = headers.get("host")

  // Get the subdomain of the request (e.g. demo)
  const subdomain = getSubdomainFromHost(host ?? "")

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

  // Ignore every other request
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     */
    "/((?!api|_next/static|_next/image|pattern.svg|favicon.ico|robots.txt).*)",
  ],
}
