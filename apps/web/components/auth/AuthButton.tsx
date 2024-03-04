"use client"

import { Button, ButtonElement, IconSpinner, cx } from "@curiousleaf/design"
import { upperFirst } from "@curiousleaf/utils"
import type { BuiltInProviderType } from "next-auth/providers/index"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import type { ComponentProps } from "react"
import { forwardRef, useState } from "react"
import { config } from "~/config"

type AuthButtonProps = ComponentProps<typeof Button> & {
  provider: BuiltInProviderType
}

export const AuthButton = forwardRef<ButtonElement, AuthButtonProps>((props, ref) => {
  const { className, provider, theme = "secondary", variant = "outline", prefix, ...rest } = props

  const searchParams = useSearchParams()
  const error = searchParams?.get("error")

  const [isPending, setIsPending] = useState(false)

  const onClick = () => {
    setIsPending(true)

    signIn(provider, {
      callbackUrl: config.routes.dashboard,
      consent: error === "RefreshAccessTokenError",
    })
  }

  return (
    <Button
      ref={ref}
      theme={theme}
      variant={variant}
      prefix={isPending ? <IconSpinner /> : prefix}
      onClick={onClick}
      className={cx("w-full", className)}
      disabled={isPending}
      {...rest}
    >
      Continue with {upperFirst(provider)}
    </Button>
  )
})
