import { cx } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"


export const List = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cx("flex flex-wrap items-center gap-x-3 gap-y-2", className)} {...props} />
}
