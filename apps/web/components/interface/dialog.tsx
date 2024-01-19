"use client"

import { Loader } from "@curiousleaf/design"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { XIcon } from "lucide-react"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { forwardRef } from "react"

import { BoxOverlay } from "~/components/interface/box"
import { Button } from "~/components/interface/button"
import { cn } from "~/utils/helpers"

export const DialogRoot = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export const dialogOverlayVariants = cva(
  [
    "fixed inset-0 backdrop-blur bg-gray-100/50 duration-300",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  ],
  {
    variants: {
      type: {
        overlay: "z-50",
        slideout: "z-40",
      },
    },
    defaultVariants: {
      type: "overlay",
    },
  },
)

export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> &
    VariantProps<typeof dialogOverlayVariants>
>(({ className, type, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={dialogOverlayVariants({ type, className })}
    {...props}
  />
))

export const dialogContentVariants = cva([
  "duration-200 ease-in-out",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
  "data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2",
  "data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-4",
])

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    ComponentPropsWithoutRef<typeof BoxOverlay>
>(({ className, padded, size, fixed, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay type="overlay" />

    <BoxOverlay
      padded={padded}
      size={size}
      fixed={fixed}
      className={cn(dialogContentVariants(), className)}
      asChild
    >
      <DialogPrimitive.Content ref={ref} {...props} />
    </BoxOverlay>
  </DialogPrimitive.Portal>
))

export const dialogSlideoutVariants = cva([
  "fixed bottom-0 top-12 z-40 h-[calc(100vh-56px)] focus:ring-0",
  "overflow-auto duration-500",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=open]:fade-in data-[state=closed]:fade-out",
  "data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full",
])

export const DialogSlideout = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof dialogSlideoutVariants>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay type="slideout" />

    <DialogPrimitive.Content
      ref={ref}
      className={dialogSlideoutVariants({ className })}
      {...props}
    />
  </DialogPrimitive.Portal>
))

export const DialogClose = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref} className={cn("-my-1", className)} tabIndex={-1} {...props}>
    <XIcon />
  </DialogPrimitive.Close>
))

export const DialogCancel = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ children, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref} asChild {...props}>
    <Button type="button" theme="secondary">
      {children ?? "Cancel"}
    </Button>
  </DialogPrimitive.Close>
))

export const DialogLoading = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay type="overlay" />

    <DialogPrimitive.Content
      ref={ref}
      className="fixed left-1/2 top-1/4 z-50 -translate-x-1/2 focus:outline-none"
      {...props}
    >
      <Loader className="text-2xl" />
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
