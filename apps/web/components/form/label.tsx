import * as LabelPrimitive from "@radix-ui/react-label"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { useFormField } from "~/providers/field-provider"
import { cn } from "~/utils/helpers"

export const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { controlId, required } = useFormField()

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "text-sm font-medium text-gray-700",
        required && "after:ml-0.5 after:text-red-600 after:content-['*']",
        className,
      )}
      htmlFor={controlId}
      {...props}
    />
  )
})
