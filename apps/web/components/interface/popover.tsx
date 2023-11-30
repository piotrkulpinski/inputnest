"use client"

import * as PopoverPrimitive from "@radix-ui/react-popover"
import { IconX } from "@tabler/icons-react"
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react"
import { forwardRef } from "react"

import { focusVisibleClasses } from "~/utils/classes"
import { cn } from "~/utils/helpers"

const PopoverRoot = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, className, sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 min-w-[8rem] rounded-md border border-outline bg-white p-3 text-xxs text-gray-700 shadow-md",
        "focus:outline-none",
        className,
      )}
      {...props}
    >
      {children}

      <PopoverArrow />
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
))

const PopoverArrow = forwardRef<
  ElementRef<typeof PopoverPrimitive.Arrow>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn("fill-current text-white drop-shadow-sm", className)}
    {...props}
  />
))

const PopoverClose = forwardRef<
  ElementRef<typeof PopoverPrimitive.Close>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>(({ className = "", ...props }, ref) => (
  <PopoverPrimitive.Close
    ref={ref}
    className={cn([
      "ring-offset-background absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100",
      "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground disabled:pointer-events-none",
      focusVisibleClasses,
      className,
    ])}
    {...props}
  >
    <IconX />
    <span className="sr-only">Close</span>
  </PopoverPrimitive.Close>
))

type PopoverProps = Omit<ComponentPropsWithoutRef<typeof PopoverContent>, "content"> & {
  content?: ReactNode
  closeable?: boolean
}

export const Popover = ({ children, content, closeable, ...rest }: PopoverProps) => {
  if (!content) return <>{children}</>

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent collisionPadding={5} {...rest}>
        {!!closeable && <PopoverClose />}
        {content}
      </PopoverContent>
    </PopoverRoot>
  )
}
