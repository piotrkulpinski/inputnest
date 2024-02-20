import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import type { PropsWithChildren } from "react"

import { config } from "~/config"
import { env } from "~/env"
import { TRPCProvider } from "~/providers/TrpcProvider"

import "~/public/globals.css"

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
  return (
    <html lang="en" className={`${sansFont.variable} font-sans scroll-smooth`}>
      <body className="bg-gray-50 bg-[url('/pattern.svg')] bg-fixed bg-top bg-repeat-x">
        <TRPCProvider headers={headers()}>{children}</TRPCProvider>
      </body>
    </html>
  )
}
