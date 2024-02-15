import { cx } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"


export const Shimmer = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cx(
        "pointer-events-none absolute inset-y-0 z-10 w-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent",
        className,
      )}
      {...props}
    />
  )
}
