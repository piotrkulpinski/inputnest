import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import type { PropsWithChildren } from "react"
import { Checkout } from "~/components/globals/Checkout"
import { Toaster } from "~/components/globals/Toaster"

import { config } from "~/config"
import { env } from "~/env"
import { TRPCProvider } from "~/providers/TrpcProvider"

import "~/public/globals.css"
import { auth } from "~/services/auth"

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const title = [config.title, config.tagline].filter(Boolean).join(" – ")
const description = config.description ?? ""

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: config.title,
    title,
    description,
    url: env.NEXT_PUBLIC_URL,
    images: [
      {
        url: "/ogimage.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={`${sansFont.variable} font-sans scroll-smooth`}>
        <SessionProvider session={session}>
          <TRPCProvider headers={headers()}>{children}</TRPCProvider>
        </SessionProvider>

        <Toaster />
        <Checkout />
      </body>
    </html>
  )
}
