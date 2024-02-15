"use client"

import { Button } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef, useState } from "react"
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { BoxFooter, BoxHeader } from "~/components/interface/box"
import {
  DialogCancel,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "~/components/interface/dialog"
import { Form } from "~/components/form/Form"

type DialogConfirmProps = HTMLAttributes<HTMLButtonElement> &
  ComponentPropsWithoutRef<typeof Button> & {
    label?: ReactNode
    title?: ReactNode
    description?: string
    cancelLabel?: ReactNode
    onConfirm: () => void
    confirmText?: string
  }

export const DialogConfirm = forwardRef<HTMLButtonElement, DialogConfirmProps>((props, ref) => {
  const {
    children,
    label = "Delete",
    title = "Are you sure?",
    description = "This action cannot be undone. This will permanently remove your data from our servers.",
    cancelLabel,
    theme = "negative",
    onConfirm,
    confirmText,
  } = props

  const [isOpen, setIsOpen] = useState(false)

  const schema = z.object({
    confirm: confirmText ? z.literal(confirmText) : z.undefined(),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = () => {
    setIsOpen(false)
    onConfirm()
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger ref={ref} asChild>
        {children}
      </DialogTrigger>

      <FormProvider {...form}>
        <DialogContent asChild>
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <BoxHeader title={title} description={description}>
              <DialogClose />
            </BoxHeader>

            {!!confirmText && (
              <Form.Fieldset>
                <Form.Field
                  control={form.control}
                  name="confirm"
                  label={`Type ${confirmText} to confirm`}
                  required
                >
                  <Form.Input placeholder={confirmText} />
                </Form.Field>
              </Form.Fieldset>
            )}

            <BoxFooter>
              <Form.Button theme={theme} disabled={!form.formState.isValid}>
                {label}
              </Form.Button>

              <DialogCancel>{cancelLabel}</DialogCancel>
            </BoxFooter>
          </Form>
        </DialogContent>
      </FormProvider>
    </DialogRoot>
  )
})
