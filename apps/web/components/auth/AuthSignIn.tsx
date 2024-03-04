"use client"

import { Divider, cx } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { HTMLAttributes, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { AuthButton } from "~/components/auth/AuthButton"
import { Form } from "~/components/form/Form"
import { config } from "~/config"

type AuthSignInProps = HTMLAttributes<HTMLDivElement>

export const AuthSignIn = ({ className, ...props }: AuthSignInProps) => {
  const [isPending, setIsPending] = useState(false)
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const callbackUrl = searchParams.get("callbackUrl") || config.routes.dashboard

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const schema = z.object({
    email: z.string().min(1).email(),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    setIsPending(true)
    signIn("nodemailer", { email: data.email, callbackUrl })
  }

  return (
    <div className={cx("flex flex-col gap-3", className)} {...props}>
      <AuthButton
        provider="google"
        variant="outline"
        prefix={<Image src="/images/google.svg" alt="" width={20} height={20} unoptimized />}
      />

      <AuthButton
        provider="github"
        variant="outline"
        prefix={<Image src="/images/github.svg" alt="" width={20} height={20} unoptimized />}
      />

      <Divider className="my-3" />

      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Form.Field control={form.control} name="email" isRequired>
            <Form.Input type="email" placeholder="jane@doe.com" />
          </Form.Field>

          <Form.Button isPending={isPending}>Continue with Email</Form.Button>
        </Form>
      </FormProvider>
    </div>
  )
}
