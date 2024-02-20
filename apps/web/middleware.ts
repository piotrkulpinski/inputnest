import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)

  // Store current request url in a custom header
  headers.set("x-url", request.url)

  return NextResponse.next({ request: { headers } })
}
