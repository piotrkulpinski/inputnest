import { MenuHeading } from "~/components/menu/menu-heading"
import type { MenuItem } from "~/index"

import { Menu } from "./menu"
import { MenuAccordion } from "./menu-accordion"
import { MenuLink } from "./menu-link"

type MenuContentProps = {
  item: MenuItem
  level?: number
}

export const MenuContent = ({ item, level = 0 }: MenuContentProps) => {
  return (
    <>
      {/* Has child items and top level */}
      {!!item.items?.length && !level && (
        <>
          {!!item.href && <MenuLink item={item} level={level} />}
          {!item.href && <MenuHeading>{item.title}</MenuHeading>}
          <Menu items={item.items} level={level + 1} />
        </>
      )}

      {/* Has child items and not top level */}
      {!!item.items?.length && !!level && <MenuAccordion item={item} level={level} />}

      {/* Don't have child items */}
      {!item.items?.length && <MenuLink item={item} level={level} />}
    </>
  )
}
