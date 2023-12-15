import type { FieldsetHTMLAttributes } from "react"
import { forwardRef } from "react"

import { cn } from "~/utils/helpers"

export const FormFieldset = forwardRef<
  HTMLFieldSetElement,
  FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => {
  return (
    <fieldset
      className={cn(
        "group relative flex w-full min-w-0 flex-col gap-x-4 gap-y-6 @container",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
