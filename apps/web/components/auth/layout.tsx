"use client"

import Link from "next/link"
import type { HTMLAttributes, ReactNode } from "react"

import { BoxFooter, BoxOverlay } from "~/components/interface/box"
import { Copy } from "~/components/interface/copy"
import { H3 } from "~/components/interface/heading"
import { Logo } from "~/components/interface/logo"
import { config } from "~/config"

type AuthLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode
  subtitle?: ReactNode
}

export const AuthLayout = ({ children, title, subtitle, ...props }: AuthLayoutProps) => {
  return (
    <BoxOverlay {...props}>
      <div className="flex flex-1 flex-col gap-3 bg-white/50 backdrop-blur">
        <div className="mb-auto flex shrink-0 items-center">
          <Logo asChild>
            <Link href="/">{config.title}</Link>
          </Logo>
        </div>

        <H3 className="mt-5">{title}</H3>

        {!!subtitle && <Copy className="opacity-75">{subtitle}</Copy>}
      </div>

      <BoxFooter>{children}</BoxFooter>
    </BoxOverlay>
  )
}
