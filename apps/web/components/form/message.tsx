import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

import { useFormField } from "~/providers/field-provider"
import { cn } from "~/utils/helpers"

export const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { messageId, fieldState } = useFormField()
    const body = fieldState.error ? fieldState.error?.message : children

    if (!body) {
      return null
    }

    return (
      <p
        ref={ref}
        id={messageId}
        className={cn("w-full text-xs text-red-700/80 first-letter:uppercase", className)}
        {...props}
      >
        {body}.
      </p>
    )
  },
)