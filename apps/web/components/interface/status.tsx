import { Dot, cx } from "@curiousleaf/design"
import { forwardRef } from "react"
import type { HTMLAttributes } from "react"

export const Status = forwardRef<HTMLDivElement, HTMLAttributes<HTMLElement>>((props, ref) => {
  const { children, className, color, ...rest } = props

  return (
    <div ref={ref} className={cx("flex items-center gap-[0.75em]", className)} {...rest}>
      <Dot style={{ color }} />
      {children}
    </div>
  )
})
