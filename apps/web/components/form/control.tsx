import { Slot } from "@radix-ui/react-slot"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { useFormField } from "~/providers/field-provider"

export const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { controlId, descriptionId, messageId, fieldState } = useFormField()
  const hasError = !!fieldState.error
  const description = !hasError ? descriptionId : `${descriptionId} ${messageId}`

  return (
    <Slot
      ref={ref}
      id={controlId}
      aria-describedby={description}
      aria-invalid={hasError}
      {...props}
    />
  )
})
