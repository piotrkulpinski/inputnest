import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { HTMLAttributes, ReactNode } from "react"

import { FormLabel } from "~/components/form/label"
import { TooltipIcon } from "~/components/interface/tooltip"

const fieldVariants = cva(
  "flex flex-col flex-wrap items-start min-w-0 w-full justify-start gap-x-4 gap-y-2 @lg:flex-row @lg:flex-nowrap",
)

type FieldProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof fieldVariants> & {
    label?: ReactNode
    tooltip?: ReactNode
  }

export const Field = (props: FieldProps) => {
  const { children, className, label, tooltip, ...rest } = props

  return (
    <div className={fieldVariants({ className })} {...rest}>
      {label && (
        <div className="flex flex-wrap gap-1 @lg:mt-2 @lg:w-[30%] @lg:min-w-[10rem]">
          <FormLabel>{label}</FormLabel>
          <TooltipIcon className="ml-auto" content={tooltip} align="end" />
        </div>
      )}

      <div className="flex w-full min-w-0 flex-col gap-y-1.5 @lg:min-h-[2.375rem] @lg:justify-center">
        {children}
      </div>
    </div>
  )
}
