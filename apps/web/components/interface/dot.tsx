import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { forwardRef } from "react"
import type { HTMLAttributes } from "react"

const dotVariants = cva(
  "block w-[0.5em] h-[0.5em] rounded-full text-white hover:[&[href]]:opacity-80",
  {
    variants: {
      theme: {
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        red: "bg-red-500",
        green: "bg-emerald-500",
        orange: "bg-orange-500",
        yellow: "bg-yellow-500",
        gray: "bg-gray-600",
        silver: "bg-gray-200",
      },
    },
    defaultVariants: {
      theme: "blue",
    },
  },
)

type DotProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof dotVariants> & {
    asChild?: boolean
    color?: string
  }

export const Dot = forwardRef<HTMLElement, DotProps>((props, ref) => {
  const { className, asChild, color, theme, style, ...rest } = props
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      className={dotVariants({ theme, className })}
      style={{ backgroundColor: color, ...style }}
      ref={ref}
      {...rest}
    />
  )
})
