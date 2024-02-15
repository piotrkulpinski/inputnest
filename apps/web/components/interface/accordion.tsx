import { cx } from "@curiousleaf/design"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

export const Accordion = AccordionPrimitive.Root
export const AccordionItem = AccordionPrimitive.Item
export const AccordionTrigger = AccordionPrimitive.Trigger

export const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cx(
      "overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  />
))
