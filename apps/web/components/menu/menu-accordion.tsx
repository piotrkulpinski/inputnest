import { IconChevronDown } from "@tabler/icons-react"

import type { MenuItem } from "index"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/interface/accordion"
import { Menu } from "~/components/menu/menu"
import { MenuLink } from "~/components/menu/menu-link"

type MenuAccordionProps = {
  item: MenuItem
  level?: number
}

export const MenuAccordion = ({ item, level = 0 }: MenuAccordionProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="menu">
        <AccordionTrigger className="group flex w-full items-center gap-2.5">
          <MenuLink item={item} level={level} className="w-full" />

          <IconChevronDown className="-m-1 p-1 opacity-60 transition-transform group-hover:opacity-100 group-data-[state=open]:-rotate-180" />
        </AccordionTrigger>

        <AccordionContent>
          <Menu items={item.items} level={level + 1} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
