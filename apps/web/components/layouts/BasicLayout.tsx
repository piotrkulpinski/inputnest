"use client"

import { Card, H3, Paragraph } from "@curiousleaf/design"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import type { HTMLAttributes, ReactNode } from "react"
import React from "react"
import { toast } from "sonner"

import { Logo } from "~/components/interface/Logo"
import { config } from "~/config"

type BasicLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode
  description?: ReactNode
}

export const BasicLayout = ({ children, title, description }: BasicLayoutProps) => {
  const { data: session, status } = useSession()

  const onLogout = async (e: React.MouseEvent) => {
    e.preventDefault()

    // Sign out
    await signOut()

    // Show success message
    toast.success("You have been successfully signed out.")
  }

  return (
    <div className="fixed left-1/2 top-[10dvh] max-h-[calc(90dvh-2rem)] w-[calc(100vw-2rem)] max-w-sm min-w-0 -translate-x-1/2 flex flex-col gap-4">
      <Card className="overflow-y-auto">
        <Card.Panel className="flex flex-col items-start gap-3">
          <Logo asChild>
            <Link href={config.routes.dashboard}>{config.title}</Link>
          </Logo>

          <H3 className="mt-5">{title}</H3>

          {!!description && (
            <Paragraph size="sm" wrap="pretty" className="opacity-60">
              {description}
            </Paragraph>
          )}
        </Card.Panel>

        <Card.Panel theme="gray" asChild>
          {children}
        </Card.Panel>
      </Card>

      {status === "authenticated" && (
        <div className="flex items-center gap-x-4 min-w-0 px-4 text-2xs text-gray-400/75 md:px-6">
          <Paragraph className="flex-1 text-2xs truncate">
            Signed in as: {session.user?.email}
          </Paragraph>

          <button type="button" onClick={onLogout} className="font-medium hover:text-gray-500">
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
