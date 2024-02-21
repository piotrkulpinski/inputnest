"use client"

import { Button, ButtonElement, IconLoader, cx } from "@curiousleaf/design"
import { capitalize } from "@curiousleaf/utils"
import type { BuiltInProviderType } from "next-auth/providers/index"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import type { ComponentProps } from "react"
import { forwardRef, useState } from "react"
import { config } from "~/config"

type SignInButtonProps = ComponentProps<typeof Button> & {
  provider: BuiltInProviderType
}

export const SignInButton = forwardRef<ButtonElement, SignInButtonProps>((props, ref) => {
  const { className, provider, theme = "secondary", variant = "outline", prefix, ...rest } = props

  const searchParams = useSearchParams()
  const error = searchParams?.get("error")

  const [loading, setIsLoading] = useState(false)

  const onClick = () => {
    setIsLoading(true)

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
      prefix={loading ? <IconLoader /> : prefix}
      onClick={onClick}
      className={cx("w-full", className)}
      disabled={loading}
      {...rest}
    >
      Continue with {capitalize(provider)}
    </Button>
  )
})
