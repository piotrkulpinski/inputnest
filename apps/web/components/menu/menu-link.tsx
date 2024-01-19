import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"
import { forwardRef } from "react"

import { Clickable } from "~/components/interface/clickable"
import type { MenuItem } from "~/index"

type MenuLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  item: MenuItem
  level?: number
}

export const MenuLink = forwardRef<HTMLButtonElement, MenuLinkProps>((props, ref) => {
  const pathname = usePathname()
  const { className, item, level = 0, ...rest } = props
  const { href, target, prefix, suffix, title } = item

  if (!href) {
    return null
  }

  const isActive =
    pathname === href ||
    (!item.end && pathname.startsWith(href) && pathname.charAt(href.length) === "/")

  const clickableProps = {
    className,
    isActive,
    prefix,
    suffix: suffix ?? (isActive ? <ChevronRightIcon className="!text-xxs !stroke-2" /> : undefined),
    asChild: true,
  }

  return (
    <Clickable
      ref={ref}
      style={level >= 2 ? { paddingLeft: `${(level - 1) * 1.875}rem` } : undefined}
      {...clickableProps}
    >
      <Link href={href} target={target ?? rest.target}>
        {title}
      </Link>
    </Clickable>
  )
})
