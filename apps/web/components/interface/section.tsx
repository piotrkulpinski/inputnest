import { cx } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"


export const Section = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <section className={cx("flex flex-col gap-6 md:gap-8", className)} {...props} />
}
