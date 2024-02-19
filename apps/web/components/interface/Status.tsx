import { Dot, cx } from "@curiousleaf/design"
import { forwardRef } from "react"
import type { HTMLAttributes } from "react"

export const Status = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, color, ...rest } = props

  return (
    <span ref={ref} className={cx("flex items-center !gap-[1ch]", className)} {...rest}>
      <Dot style={{ color }} />
      {children}
    </span>
  )
})
