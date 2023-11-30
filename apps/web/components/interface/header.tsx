import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { Heading } from "~/components/interface/heading"
import { List } from "~/components/interface/list"
import { Markdown } from "~/components/interface/markdown"

const headerVariants = cva("flex flex-wrap items-center gap-y-2 gap-x-6 lg:gap-x-12", {
  variants: {
    alignment: {
      left: "justify-between text-left",
      center: "justify-center text-center",
      right: "justify-end text-right",
    },
  },
  defaultVariants: {
    alignment: "left",
  },
})

type HeaderProps = Omit<ComponentPropsWithoutRef<typeof Heading>, "title"> &
  VariantProps<typeof headerVariants> & {
    title?: ReactNode
    description?: string
  }

export const Header = ({
  children,
  className,
  size = "h2",
  title,
  description,
  alignment,
  ...props
}: HeaderProps) => {
  return (
    <div className={headerVariants({ alignment, className })} {...props}>
      {!!title && <Heading size={size}>{title}</Heading>}
      {!!children && <List className="-my-2">{children}</List>}
      {!!description && <Markdown className="w-full text-gray-500" content={description} />}
    </div>
  )
}
