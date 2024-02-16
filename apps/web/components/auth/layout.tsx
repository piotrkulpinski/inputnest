"use client"

import { Card, H3, Paragraph } from "@curiousleaf/design"
import Link from "next/link"
import type { HTMLAttributes, ReactNode } from "react"

import { Logo } from "~/components/interface/logo"
import { config } from "~/config"

type AuthLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode
  subtitle?: ReactNode
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <Card className="fixed left-1/2 top-[10vh] max-h-[calc(90vh-2rem)] w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 overflow-y-auto">
      <Card.Panel className="flex flex-col items-start gap-3">
        <Logo asChild>
          <Link href="/">{config.title}</Link>
        </Logo>

        <H3 className="mt-5">{title}</H3>

        {!!subtitle && (
          <Paragraph size="sm" className="opacity-60">
            {subtitle}
          </Paragraph>
        )}
      </Card.Panel>

      <Card.Footer className="md:py-6" asChild>
        {children}
      </Card.Footer>
    </Card>
  )
}
