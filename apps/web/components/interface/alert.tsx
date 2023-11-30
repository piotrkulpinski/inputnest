import * as AlertPrimitive from "@radix-ui/react-alert-dialog"
import { IconX } from "@tabler/icons-react"
import type { VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import type { BoxProps } from "~/components/interface/box"
import { Box } from "~/components/interface/box"
import { Button } from "~/components/interface/button"
import {
  dialogContentVariants,
  dialogOverlayVariants,
  dialogSlideoutVariants,
} from "~/components/interface/dialog"
import { cn } from "~/utils/helpers"

export const AlertRoot = AlertPrimitive.Root
export const AlertTrigger = AlertPrimitive.Trigger

export const AlertOverlay = forwardRef<
  ElementRef<typeof AlertPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof AlertPrimitive.Overlay> &
    VariantProps<typeof dialogOverlayVariants>
>(({ className, type, ...props }, ref) => (
  <AlertPrimitive.Overlay
    ref={ref}
    className={dialogOverlayVariants({ type, className })}
    {...props}
  />
))

export const AlertContent = forwardRef<
  ElementRef<typeof AlertPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AlertPrimitive.Content> &
    VariantProps<typeof dialogContentVariants> &
    BoxProps
>(({ className, size, fixed, padded, ...props }, ref) => (
  <AlertPrimitive.Portal>
    <AlertOverlay type="overlay" />

    <Box padded={padded} asChild>
      <AlertPrimitive.Content
        ref={ref}
        className={dialogContentVariants({ size, fixed, className })}
        {...props}
      />
    </Box>
  </AlertPrimitive.Portal>
))

export const AlertSlideout = forwardRef<
  ElementRef<typeof AlertPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AlertPrimitive.Content> &
    VariantProps<typeof dialogSlideoutVariants>
>(({ className, ...props }, ref) => (
  <AlertPrimitive.Portal>
    <AlertOverlay type="slideout" />

    <AlertPrimitive.Content
      ref={ref}
      className={dialogSlideoutVariants({ className })}
      {...props}
    />
  </AlertPrimitive.Portal>
))

export const AlertClose = forwardRef<
  ElementRef<typeof AlertPrimitive.Cancel>,
  ComponentPropsWithoutRef<typeof AlertPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertPrimitive.Cancel ref={ref} className={cn("-my-1", className)} tabIndex={-1} {...props}>
    <IconX />
  </AlertPrimitive.Cancel>
))

export const AlertCancel = forwardRef<
  ElementRef<typeof AlertPrimitive.Cancel>,
  ComponentPropsWithoutRef<typeof AlertPrimitive.Cancel>
>(({ children, ...props }, ref) => (
  <AlertPrimitive.Cancel ref={ref} tabIndex={-1} asChild {...props}>
    <Button type="button" theme="secondary">
      {children || "Cancel"}
    </Button>
  </AlertPrimitive.Cancel>
))
