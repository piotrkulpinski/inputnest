import { Section, cx } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"
import { Children } from "react"

export const CommentTree = ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => {
  if (!Children.count(children)) {
    return null
  }

  return (
    <Section className={cx("relative my-4", className)} {...props}>
      <div className="absolute bottom-0 left-4 top-0 mt-8 w-[1px] bg-gray-200" />

      {children}
    </Section>
  )
}
