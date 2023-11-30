import { auth, ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import type { PropsWithChildren } from "react"

import { config } from "~/config"
import { env } from "~/env"

import { TRPCProvider } from "../providers/trpc-provider"
import "~/public/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const title = [config.title, config.tagline].filter(Boolean).join(" – ")
const description = config.description ?? ""

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    siteName: config.title,
    title,
    description,
    url: env.NEXT_PUBLIC_APP_URL,
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
  const { sessionId, getToken } = auth()
  const token = await getToken()

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ClerkProvider
          appearance={{
            layout: { socialButtonsVariant: "blockButton", shimmer: true },
            variables: { colorPrimary: "black" },
            elements: {
              rootBox: "w-full h-full",
              card: "w-full m-0 p-0 shadow-none",
              header: "hidden",
              logoBox: "hidden",
              formButtonPrimary: "bg-black text-white font-medium text-sm py-3 px-6 normal-case",
              formFieldLabel: "mb-1",
              footerActionText: "text-xs opacity-60",
              footerActionLink: "text-xs underline focus:shadow-none",
              socialButtonsBlockButton__google: "order-first",
            },
          }}
        >
          <TRPCProvider headers={headers()} sessionId={sessionId} token={token}>
            {children}
          </TRPCProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
