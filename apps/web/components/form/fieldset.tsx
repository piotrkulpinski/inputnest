import { cx } from "@curiousleaf/design"
import type { FieldsetHTMLAttributes } from "react"
import { forwardRef } from "react"

export const FormFieldset = forwardRef<
  HTMLFieldSetElement,
  FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => {
  return (
    <fieldset
      className={cx(
        "group relative flex w-full min-w-0 flex-col gap-x-4 gap-y-6 @container",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
