import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { forwardRef } from "react"
import type { HTMLAttributes, ReactNode } from "react"

import { Slottable } from "~/components/utils/slottable"

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 hover:[&[href]]:opacity-80",
    "font-medium whitespace-nowrap border border-transparent rounded-md text-center !leading-snug lw align-middle",
  ],
  {
    variants: {
      theme: {
        white: "bg-white border-gray-200 !text-gray-600",
        blue: "bg-blue-500 !text-white",
        blueSoft: "bg-blue-100/60 !text-blue-600",
        purple: "bg-purple-500 !text-white",
        purpleSoft: "bg-purple-100/75 !text-purple-600",
        red: "bg-red-500 !text-white",
        redSoft: "bg-red-50 !text-red-600",
        green: "bg-emerald-500 !text-white",
        greenSoft: "bg-emerald-100/60 !text-emerald-600",
        orange: "bg-orange-500 !text-white",
        orangeSoft: "bg-orange-50 !text-orange-600",
        yellow: "bg-yellow-500 !text-white",
        yellowSoft: "bg-yellow-50 !text-yellow-500",
        gray: "bg-gray-700 !text-white",
        graySoft: "bg-gray-100 !text-gray-600",
      },
      size: {
        sm: "px-1.5 py-px text-[0.6875rem]",
        md: "px-2 py-0.5 text-[0.75rem]",
        lg: "px-2.5 py-1 text-[0.8125rem]",
      },
    },
    defaultVariants: {
      theme: "graySoft",
      size: "md",
    },
  },
)

type BadgeProps = Omit<HTMLAttributes<HTMLElement>, "prefix"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    prefix?: ReactNode
    suffix?: ReactNode
  }

export const Badge = forwardRef<HTMLElement, BadgeProps>((props, ref) => {
  const { children, className, asChild, theme, size, prefix, suffix, ...rest } = props
  const Comp = asChild ? Slot : "span"

  return (
    <Comp className={badgeVariants({ theme, size, className })} ref={ref} {...rest}>
      <Slottable child={children} asChild={asChild}>
        {child => (
          <>
            <Slot className="-mx-0.5 shrink-0 text-[0.75em]" aria-hidden="true">
              {prefix}
            </Slot>

            {child}

            <Slot className="-mx-0.5 shrink-0 text-[0.75em]" aria-hidden="true">
              {suffix}
            </Slot>
          </>
        )}
      </Slottable>
    </Comp>
  )
})
