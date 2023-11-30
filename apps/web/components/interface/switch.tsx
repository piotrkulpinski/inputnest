"use client"

import { Slot } from "@radix-ui/react-slot"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { forwardRef } from "react"
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react"

import { focusVisibleClasses } from "~/utils/classes"

const switchVariants = cva(
  [
    "peer relative flex w-[2em] shrink-0 rounded-full shadow-inner",
    "disabled:text-gray-400 disabled:pointer-events-none",
    "data-[state=checked]:bg-current data-[state=unchecked]:bg-gray-300",
    focusVisibleClasses,
  ],
  {
    variants: {
      hasError: {
        true: "ring-1 ring-offset-1 ring-red-700/80",
      },
    },
  },
)

const switchThumbVariants = cva(
  "group grid place-items-center pointer-events-none block m-[0.125em] h-[0.875em] w-[0.875em] data-[state=checked]:translate-x-full rounded-full bg-white transition",
)

type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
  VariantProps<typeof switchVariants> & {
    onIcon?: ReactNode
    offIcon?: ReactNode
  }

export const Switch = forwardRef<ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, hasError, onIcon, offIcon, ...props }, ref) => (
    <SwitchPrimitives.Root ref={ref} className={switchVariants({ hasError, className })} {...props}>
      <SwitchPrimitives.Thumb className={switchThumbVariants()}>
        <Slot className="text-[0.5em] text-current group-data-[state=unchecked]:hidden">
          {onIcon}
        </Slot>

        <Slot className="text-[0.5em] text-gray-500 group-data-[state=checked]:hidden">
          {offIcon}
        </Slot>
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  ),
)
