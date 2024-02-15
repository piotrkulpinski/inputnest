import { cx } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"
import { Children } from "react"

import { Section } from "~/components/interface/section"

export const CommentTree = ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => {
  if (!Children.count(children)) {
    return null
  }

  return (
    <Section className={cx("relative mt-4", className)} {...props}>
      <div className="absolute bottom-0 left-4 top-0 mt-8 w-[1px] bg-outline" />

      {children}
    </Section>
  )
}
