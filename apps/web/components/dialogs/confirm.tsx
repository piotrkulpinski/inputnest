"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef, useState } from "react"
import type { ComponentPropsWithoutRef, FormEvent, HTMLAttributes, ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

import { FormInput } from "~/components/form/controls/input"
import { FormField } from "~/components/form/field"
import { FormFieldset } from "~/components/form/fieldset"
import { BoxFooter, BoxHeader } from "~/components/interface/box"
import { Button } from "~/components/interface/button"
import {
  DialogCancel,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTrigger,
} from "~/components/interface/dialog"

type DialogConfirmProps = HTMLAttributes<HTMLButtonElement> &
  Pick<ComponentPropsWithoutRef<typeof Button>, "isDanger"> & {
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
    isDanger = true,
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

  const handleSubmit = (e: FormEvent) => {
    e.stopPropagation()

    const onSubmit = () => {
      setIsOpen(false)
      onConfirm()
    }

    form.handleSubmit(onSubmit)(e)
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger ref={ref} asChild>
        {children}
      </DialogTrigger>

      <FormProvider {...form}>
        <DialogContent asChild>
          <form onSubmit={handleSubmit}>
            <BoxHeader title={title} description={description}>
              <DialogClose />
            </BoxHeader>

            {!!confirmText && (
              <FormFieldset>
                <FormField name="confirm" label={`Type ${confirmText} to confirm`} required>
                  <FormInput placeholder={confirmText} />
                </FormField>
              </FormFieldset>
            )}

            <BoxFooter>
              <Button disabled={!form.formState.isValid} isDanger={isDanger}>
                {label}
              </Button>

              <DialogCancel>{cancelLabel}</DialogCancel>
            </BoxFooter>
          </form>
        </DialogContent>
      </FormProvider>
    </DialogRoot>
  )
})
