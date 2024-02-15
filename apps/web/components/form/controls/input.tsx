import { cx } from "@curiousleaf/design"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { InputHTMLAttributes } from "react"

import { useAffix } from "~/components/form/affix"
import { FormControl } from "~/components/form/control"
import { useFormField } from "~/providers/field-provider"
import { focusClasses } from "~/utils/classes"

export const formInputVariants = cva(
  [
    "peer flex gap-2 py-2 px-3 items-center justify-between min-w-0 bg-white border border-outline rounded-md shadow-sm text-sm/5 text-start resize-none transition placeholder:text-gray-400",

    // Disabled state
    "disabled:text-gray-400 disabled:bg-gray-50 disabled:opacity-70",
    "group-disabled:pointer-events-none group-disabled:opacity-70",
    "[&:has([disabled])]:pointer-events-none [&:has([disabled])]:opacity-70",

    // Focus state
    focusClasses,
  ],
  {
    variants: {
      hasError: {
        true: "!border-red-500",
      },
      mono: {
        true: "font-mono text-[0.875em] whitespace-pre break-normal overflow-x-auto",
      },
      hoverable: {
        true: "cursor-pointer hover:bg-gray-50 hover:border-gray-300",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      fullWidth: true,
    },
  },
)

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof formInputVariants>

export const FormInput = ({ className, mono, ...rest }: FormInputProps) => {
  const { field, fieldState } = useFormField()
  const { prefixWidth, suffixWidth } = useAffix()

  return (
    <FormControl>
      <input
        className={cx(formInputVariants({ hasError: !!fieldState.error, mono, className }))}
        style={{ paddingLeft: prefixWidth, paddingRight: suffixWidth }}
        {...field}
        {...rest}
      />
    </FormControl>
  )
}
