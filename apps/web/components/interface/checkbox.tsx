import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { IconCheck } from "@tabler/icons-react"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { forwardRef } from "react"
import type { ComponentPropsWithoutRef, ElementRef } from "react"

import { focusVisibleClasses } from "~/utils/classes"

const checkboxVariants = cva(
  [
    "peer flex items-center justify-center h-4 w-4 shrink-0 appearance-none rounded bg-white border border-outline text-black text-xxs transition-none",
    "disabled:bg-gray-100 disabled:text-gray-400 disabled:pointer-events-none",
    "data-[state=checked]:border-black data-[state=checked]:bg-black data-[state=checked]:text-white",
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

export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>
>(({ className, hasError, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={checkboxVariants({ hasError, className })}
    {...props}
  >
    <CheckboxPrimitive.Indicator asChild>
      <IconCheck className="!h-3.5 !w-3.5 !stroke-2" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
