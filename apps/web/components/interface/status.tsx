import { forwardRef } from "react"
import type { ComponentPropsWithoutRef } from "react"

import { Dot } from "~/components/interface/dot"
import { cn } from "~/utils/helpers"

export const Status = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Dot>>(
  (props, ref) => {
    const { children, className, color, ...rest } = props

    return (
      <div className={cn("flex items-center gap-[0.75em]", className)} ref={ref} {...rest}>
        <Dot color={color} />
        {children}
      </div>
    )
  },
)
