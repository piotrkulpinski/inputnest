"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { IconCircleFilled } from "@tabler/icons-react"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { forwardRef } from "react"
import type { ComponentPropsWithoutRef, ElementRef } from "react"

import { focusVisibleClasses } from "~/utils/classes"

export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>((props, ref) => {
  return <RadioGroupPrimitive.Root ref={ref} {...props} />
})

const radioGroupItemVariants = cva(
  [
    "peer flex items-center justify-center h-4 w-4 bg-white border border-outline rounded-full",
    "disabled:bg-gray-100 disabled:pointer-events-none",
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

export const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
    VariantProps<typeof radioGroupItemVariants>
>(({ children, className, hasError, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={radioGroupItemVariants({ hasError, className })}
      {...props}
    >
      <RadioGroupPrimitive.Indicator asChild>
        <IconCircleFilled className="!h-3 !w-3" />
      </RadioGroupPrimitive.Indicator>

      {children}
    </RadioGroupPrimitive.Item>
  )
})
