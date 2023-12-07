import type { MenuItem } from "~/index"

import { MenuContent } from "./menu-content"

type MenuProps = {
  items?: MenuItem[]
  level?: number
}

export const Menu = ({ items, level = 0 }: MenuProps) => {
  if (!items) {
    return null
  }

  return (
    <>
      {items.map((item, index) => (
        <MenuContent key={`${item.href}-${index}`} item={item} level={level} />
      ))}
    </>
  )
}
