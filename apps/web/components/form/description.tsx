import { cx } from "@curiousleaf/design"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { Markdown } from "~/components/interface/markdown"
import { useFormField } from "~/providers/field-provider"

export const FormDescription = forwardRef<
  ElementRef<typeof Markdown>,
  ComponentPropsWithoutRef<typeof Markdown>
>(({ className, ...props }, ref) => {
  const { descriptionId } = useFormField()

  return (
    <Markdown
      ref={ref}
      id={descriptionId}
      className={cx("text-xs text-gray-500", className)}
      {...props}
    />
  )
})
