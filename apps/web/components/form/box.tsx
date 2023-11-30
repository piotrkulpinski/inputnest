import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { forwardRef } from "react"
import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react"

import { formInputVariants } from "~/components/form/controls/input"

export const formBoxGroupVariants = cva("flex flex-wrap gap-y-2 gap-x-3 w-full", {
  variants: {
    boxed: {
      true: "@md:grid @md:grid-auto-fill-xs",
    },
  },
})

export type FormBoxProps = LabelHTMLAttributes<HTMLLabelElement> & {
  label?: ReactNode
  suffix?: ReactNode
}

export const FormBox = forwardRef<HTMLLabelElement, FormBoxProps>((props, ref) => {
  const { children, className, label, suffix, ...rest } = props

  return (
    <label
      className={formInputVariants({
        hoverable: true,
        fullWidth: false,
        className,
      })}
      ref={ref}
      {...rest}
    >
      {children}

      {label && (
        <span className="truncate text-sm font-medium peer-data-[state=unchecked]:opacity-75">
          {label}
        </span>
      )}

      <Slot className="ml-auto">{suffix}</Slot>
    </label>
  )
})

export const FormBoxGroup = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement> & VariantProps<typeof formBoxGroupVariants>
>(({ className, boxed, ...props }, ref) => {
  return <div className={formBoxGroupVariants({ boxed, className })} ref={ref} {...props} />
})
