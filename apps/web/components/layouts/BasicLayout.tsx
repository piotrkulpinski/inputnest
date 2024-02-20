"use client"

import { Card, H3, Paragraph } from "@curiousleaf/design"
import Link from "next/link"
import type { HTMLAttributes, ReactNode } from "react"

import { Logo } from "~/components/interface/Logo"
import { config } from "~/config"

type BasicLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode
  description?: ReactNode
}

export const BasicLayout = ({ children, title, description }: BasicLayoutProps) => {
  return (
    <Card className="fixed left-1/2 top-[10vh] max-h-[calc(90vh-2rem)] w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 overflow-y-auto">
      <Card.Panel className="flex flex-col items-start gap-3">
        <Logo asChild>
          <Link href={config.routes.dashboard}>{config.title}</Link>
        </Logo>

        <H3 className="mt-5">{title}</H3>

        {!!description && (
          <Paragraph size="sm" className="opacity-60">
            {description}
          </Paragraph>
        )}
      </Card.Panel>

      <Card.Panel theme="gray" asChild>
        {children}
      </Card.Panel>
    </Card>
  )
}