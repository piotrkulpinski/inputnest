"use client"

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { Box } from "~/components/interface/box"
import { Clickable, ClickableClassContext } from "~/components/interface/clickable"
import { cn } from "~/utils/helpers"

const dropdownContentVariants = cva([
  "flex flex-col z-50 px-4 divide-y",
  "min-w-[--radix-dropdown-menu-trigger-width] max-h-[--radix-popper-available-height]",
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[side=bottom]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-top-2",
])

export const DropdownRoot = DropdownMenuPrimitive.Root
export const DropdownSub = DropdownMenuPrimitive.Sub

export const DropdownTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn("relative focus:outline-none", className)}
    {...props}
  />
))

export const DropdownGroup = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Group>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Group
    ref={ref}
    className={cn("group -mx-4 flex scroll-p-1 flex-col gap-1 p-1", className)}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Group>
))

export const DropdownContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> &
    VariantProps<typeof dropdownContentVariants>
>(({ className, sideOffset = 5, collisionPadding = 15, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <Box padded={false} asChild>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={dropdownContentVariants({ className })}
        {...props}
      />
    </Box>
  </DropdownMenuPrimitive.Portal>
))

export const DropdownItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  Omit<ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>, "prefix"> &
    ComponentPropsWithoutRef<typeof Clickable>
>(({ className, ...props }, ref) => (
  <ClickableClassContext.Provider value={cva(cn("px-3 rounded-md hover:bg-gray-100", className))}>
    <DropdownMenuPrimitive.Item ref={ref} asChild>
      <Clickable asChild {...props} />
    </DropdownMenuPrimitive.Item>
  </ClickableClassContext.Provider>
))

export const DropdownLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label ref={ref} className={cn("py-3", className)} {...props} />
))

export const DropdownSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-4 my-3 h-px bg-gray-200", className)}
    {...props}
  />
))

export const DropdownSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof DropdownItem>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger ref={ref} asChild>
    <DropdownItem className={className} {...props} />
  </DropdownMenuPrimitive.SubTrigger>
))

export const DropdownSubContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> &
    VariantProps<typeof dropdownContentVariants>
>(({ className, sideOffset = 5, alignOffset = -5, collisionPadding = 15, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <Box padded={false} asChild>
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
        className={dropdownContentVariants({ className })}
        {...props}
      />
    </Box>
  </DropdownMenuPrimitive.Portal>
))
