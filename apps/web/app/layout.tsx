import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { headers } from "next/headers"
import type { PropsWithChildren } from "react"

import { config } from "~/config"
import { env } from "~/env"
import { TRPCProvider } from "~/providers/trpc-provider"

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
    <html lang="en" className="scroll-smooth">
      <body className={`${sansFont.variable} font-sans`}>
        <ClerkProvider
          appearance={{
            layout: { socialButtonsVariant: "blockButton", shimmer: true },
            variables: { colorPrimary: "black" },
            elements: {
              rootBox: "w-full h-full",
              main: "gap-6",
              card: "w-full m-0 p-0 gap-4 bg-transparent shadow-none",
              header: "hidden",
              logoBox: "hidden",
              dividerLine: "bg-gray-200",
              formButtonPrimary: "bg-black text-white font-medium text-sm py-3 px-6 normal-case",
              formFieldLabel: "mb-1",
              formFieldInput: "border",
              footerActionText: "text-xs opacity-60",
              footerActionLink: "text-xs underline focus:shadow-none",
              socialButtonsBlockButton: "bg-white border tracking-wide hover:bg-gray-50",
              socialButtonsBlockButton__google: "order-first",
            },
          }}
        >
          <TRPCProvider headers={headers()}>{children}</TRPCProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
