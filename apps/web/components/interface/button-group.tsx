import { cx } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"


export const ButtonGroup = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return <div className={cx("buttons group flex -space-x-px", className)} {...props} />
}
