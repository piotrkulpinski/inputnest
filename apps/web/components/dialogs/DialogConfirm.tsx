"use client"

import { Button, Dialog, Header } from "@curiousleaf/design"
import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef, useState } from "react"
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger ref={ref} asChild>
        {children}
      </Dialog.Trigger>

      <FormProvider {...form}>
        <Dialog.Content asChild>
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Panel asChild>
              <Form.Fieldset>
                <Header size="h4" title={title} description={description}>
                  <Dialog.Close />
                </Header>

                {!!confirmText && (
                  <Form.Field
                    control={form.control}
                    name="confirm"
                    label={`Type "${confirmText}" to confirm`}
                    required
                  >
                    <Form.Input placeholder={confirmText} />
                  </Form.Field>
                )}
              </Form.Fieldset>
            </Dialog.Panel>

            <Dialog.Footer>
              <Form.Button theme={theme} disabled={!form.formState.isValid}>
                {label}
              </Form.Button>

              <Dialog.Cancel>{cancelLabel}</Dialog.Cancel>
            </Dialog.Footer>
          </Form>
        </Dialog.Content>
      </FormProvider>
    </Dialog>
  )
})
