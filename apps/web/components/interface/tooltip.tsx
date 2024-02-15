"use client"

import { Button, cx } from "@curiousleaf/design"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva } from "class-variance-authority"
import { InfoIcon } from "lucide-react"
import { forwardRef } from "react"
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react"

const tooltipContentVariants = cva(
  "text-2xs z-50 max-w-[12rem] overflow-hidden rounded-md border bg-white px-3 py-1 font-normal text-gray-700 shadow-sm",
  {
    variants: {
      align: {
        start: "text-start",
        center: "text-center",
        end: "text-end",
      },
    },
    defaultVariants: {
      align: "center",
    },
  },
)

const TooltipProvider = TooltipPrimitive.Provider
const TooltipRoot = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipPortal = TooltipPrimitive.Portal

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ children, className, align, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={tooltipContentVariants({ align, className })}
    {...props}
  >
    {children}
    <TooltipArrow />
  </TooltipPrimitive.Content>
))

const TooltipArrow = forwardRef<
  ElementRef<typeof TooltipPrimitive.Arrow>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cx("drop-shadow-px relative z-10 -mt-px block fill-current text-white", className)}
    {...props}
  />
))

export type TooltipProps = Omit<ComponentPropsWithoutRef<typeof TooltipContent>, "content"> & {
  content?: ReactNode
  delay?: number
}

export const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>((props, ref) => {
  const { children, className, content, delay = 0, sideOffset = 5, ...rest } = props

  if (!content) {
    return null
  }

  return (
    <TooltipProvider disableHoverableContent>
      <TooltipRoot delayDuration={delay}>
        <TooltipTrigger className={className} asChild onClick={e => e.preventDefault()} ref={ref}>
          {children}
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent collisionPadding={5} sideOffset={sideOffset} {...rest}>
            <p>{content}</p>
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  )
})

export const TooltipIcon = forwardRef<HTMLButtonElement, TooltipProps>((props, ref) => {
  return (
    <Tooltip ref={ref} {...props}>
      <InfoIcon />
    </Tooltip>
  )
})

type TooltipButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  tooltip?: string
}

export const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>(
  ({ tooltip, ...rest }, ref) => {
    return (
      <Tooltip content={tooltip}>
        <Button aria-label={tooltip} ref={ref} {...rest} />
      </Tooltip>
    )
  },
)
