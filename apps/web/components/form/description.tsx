import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { Markdown } from "~/components/interface/markdown"
import { useFormField } from "~/providers/field-provider"
import { cn } from "~/utils/helpers"

export const FormDescription = forwardRef<
  ElementRef<typeof Markdown>,
  ComponentPropsWithoutRef<typeof Markdown>
>(({ className, ...props }, ref) => {
  const { descriptionId } = useFormField()

  return (
    <Markdown
      ref={ref}
      id={descriptionId}
      className={cn("text-xs text-gray-500", className)}
      {...props}
    />
  )
})
