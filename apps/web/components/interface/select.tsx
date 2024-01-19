"use client"

import * as SelectPrimitive from "@radix-ui/react-select"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon } from "lucide-react"
import { forwardRef } from "react"
import type { ComponentPropsWithoutRef, ElementRef } from "react"

import { formInputVariants } from "~/components/form/controls/input"

export const SelectRoot = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value
export const SelectIcon = SelectPrimitive.Icon

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & VariantProps<typeof formInputVariants>
>(({ className, hasError, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={formInputVariants({ hasError, hoverable: true, className })}
    {...props}
  >
    <div className="flex-1 truncate text-start">{children}</div>

    <SelectPrimitive.Icon asChild>
      <ChevronsUpDownIcon className="-mr-1 opacity-70" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

const selectScrollVariants = cva(
  "absolute z-10 flex items-center justify-center w-full h-8 bg-gray-50",
  {
    variants: {
      position: {
        top: "top-0",
        bottom: "bottom-0",
      },
    },
  },
)

const selectViewportVariants = cva("py-1", {
  variants: {
    position: {
      "item-aligned": "",
      popper:
        "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
    },
  },
})

const selectContentVariants = cva(
  [
    "relative z-50 min-w-[8rem] overflow-hidden rounded border border-outline bg-gray-50 shadow-md animate-in fade-in-80",
    "w-[--radix-select-trigger-width]",
  ],
  {
    variants: {
      position: {
        "item-aligned": "",
        popper: "max-h-[--radix-select-content-available-height] translate-y-1",
      },
    },
  },
)

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={selectContentVariants({ position, className })}
      position={position}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className={selectScrollVariants({ position: "top" })}>
        <ChevronUpIcon className="opacity-70" />
      </SelectPrimitive.ScrollUpButton>

      <SelectPrimitive.Viewport className={selectViewportVariants({ position })}>
        <SelectPrimitive.Group>{children}</SelectPrimitive.Group>
      </SelectPrimitive.Viewport>

      <SelectPrimitive.ScrollDownButton className={selectScrollVariants({ position: "bottom" })}>
        <ChevronDownIcon className="opacity-70" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

export const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={`py-1.5 pl-8 pr-2 text-xs font-semibold lg:text-sm ${className}`}
    {...props}
  />
))

const selectItemVariants = cva([
  "relative flex gap-2 min-w-0 w-full cursor-default select-none items-center rounded-sm py-2 px-3 text-sm",
  "hover:bg-gray-100 focus:bg-gray-100 focus-visible:outline-none",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
])

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={selectItemVariants({ className })} {...props}>
    <SelectPrimitive.ItemText asChild>
      <span className="flex-1 truncate text-start">{children}</span>
    </SelectPrimitive.ItemText>

    <SelectPrimitive.ItemIndicator asChild>
      <CheckIcon className="!h-4 !w-4 opacity-70" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
))

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={`-mx-1 my-1 h-px bg-gray-200 ${className}`}
    {...props}
  />
))
