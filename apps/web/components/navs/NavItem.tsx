import type { MenuItemElement, MenuItemProps } from "@curiousleaf/design"
import { Accordion, MenuItem } from "@curiousleaf/design"
import { isExternalLink } from "@curiousleaf/utils"
import { IconChevronDown } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { forwardRef, useMemo } from "react"

export type NavItemProps = MenuItemProps & {
  title: string
  href?: string
  target?: string
  items?: NavItemProps[]
  end?: boolean
}

const isItemActive = (item: Pick<NavItemProps, "href" | "end">, pathname: string) => {
  if (item.href && item.href !== "/") {
    if (item.end) {
      return pathname.endsWith(item.href)
    }

    return pathname.includes(item.href)
  }

  return false
}

const NavItemIndicator = () => {
  return (
    <div className="size-icon relative shrink-0">
      <div className="absolute -bottom-2 -top-2 left-1/2 -my-px w-px -translate-x-1/2 bg-gray-200/75 group-first/menu-item:-top-full group-last/menu-item:bottom-1/2" />
      <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-200 group-aria-[current=page]/menu-item:bg-current" />
    </div>
  )
}

const NavItemTrigger = () => {
  return <IconChevronDown className="group-data-[state=open]/menu-item:rotate-180" />
}

export const NavItemButton = forwardRef<MenuItemElement, NavItemProps>((props, ref) => {
  const { children, title, ...rest } = props

  return (
    <MenuItem ref={ref} {...rest}>
      {title}
      {children}
    </MenuItem>
  )
})

export const NavItemLink = forwardRef<MenuItemElement, NavItemProps>((props, ref) => {
  const { children, title, href, end, active, ...rest } = props

  const pathname = usePathname()
  const isActive = useMemo(() => isItemActive({ href, end }, pathname), [href, pathname])

  return (
    <MenuItem ref={ref} active={active ?? isActive} asChild {...rest}>
      <Link
        href={href ?? ""}
        target={isExternalLink(href) ? "_blank" : undefined}
        rel={isExternalLink(href) ? "noreferrer" : undefined}
      >
        {title}
        {children}
      </Link>
    </MenuItem>
  )
})

export const NavItem = forwardRef<MenuItemElement, NavItemProps>((props, ref) => {
  const { items, title, href } = props

  if (items?.length) {
    return (
      <Accordion.Item value={title} className="contents">
        <Accordion.Trigger asChild>
          <NavItemButton ref={ref} {...props} suffix={NavItemTrigger()} />
        </Accordion.Trigger>

        <Accordion.Content className="space-y-0.5">
          {items?.map((subItem, i) => <NavItem key={i} {...subItem} prefix={NavItemIndicator()} />)}
        </Accordion.Content>
      </Accordion.Item>
    )
  }

  if (!href) {
    return <NavItemButton ref={ref} {...props} />
  }

  return <NavItemLink ref={ref} {...props} />
})
