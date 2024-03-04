"use client"

import { Paragraph, cx } from "@curiousleaf/design"
import { signOut, useSession } from "next-auth/react"
import React, { HTMLAttributes } from "react"
import { toast } from "sonner"

export const BasicLayoutAuth = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const { data: session, status } = useSession()

  const onLogout = async (e: React.MouseEvent) => {
    e.preventDefault()

    // Sign out
    await signOut()

    // Show success message
    toast.success("You have been successfully signed out.")
  }

  if (status !== "authenticated") {
    return null
  }

  return (
    <div
      className={cx(
        "flex items-center gap-x-4 min-w-0 px-4 text-2xs text-gray-400/75 md:px-6",
        className,
      )}
      {...props}
    >
      <Paragraph className="flex-1 text-2xs truncate">
        Signed in as: {session.user?.email}
      </Paragraph>

      <button type="button" onClick={onLogout} className="font-medium hover:text-gray-500">
        Sign out
      </button>
    </div>
  )
}
