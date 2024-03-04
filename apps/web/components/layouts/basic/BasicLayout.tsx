"use client"

import { Card, Header, HeaderProps } from "@curiousleaf/design"
import Link from "next/link"
import type { HTMLAttributes } from "react"

import { Logo } from "~/components/interface/Logo"
import { BasicLayoutAuth } from "~/components/layouts/basic/BasicLayoutAuth"
import { config } from "~/config"

type BasicLayoutProps = HTMLAttributes<HTMLDivElement> &
  HeaderProps & {
    /**
     * Determines whether to show the logo.
     * @default true
     */
    showLogo?: boolean
  }

export const BasicLayout = ({ children, showLogo = true, ...props }: BasicLayoutProps) => {
  return (
    <>
      <Card className="overflow-y-auto">
        <Card.Panel className="flex flex-col items-start gap-8">
          {showLogo && (
            <Logo asChild>
              <Link href={config.routes.dashboard}>{config.title}</Link>
            </Logo>
          )}

          <Header size="h2" {...props} />
        </Card.Panel>

        {children && (
          <Card.Panel theme="gray" asChild>
            {children}
          </Card.Panel>
        )}
      </Card>

      <BasicLayoutAuth className="mt-4" />
    </>
  )
}
