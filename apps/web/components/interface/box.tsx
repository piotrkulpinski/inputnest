import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { ComponentProps, ComponentPropsWithoutRef, HTMLAttributes } from "react"
import { forwardRef } from "react"

import { Header } from "~/components/interface/header"
import { cn } from "~/utils/helpers"

const boxVariants = cva(
  "bg-white border border-outline rounded-md text-sm overflow-clip !shadow-sm",
  {
    variants: {
      padded: {
        true: "flex flex-col gap-8 p-6 md:p-8",
      },
    },
    defaultVariants: {
      padded: true,
    },
  },
)

type BoxProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof boxVariants> & {
    asChild?: boolean
  }

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const { className, asChild, padded, ...rest } = props
  const Comp = asChild ? Slot : "div"

  return <Comp ref={ref} className={boxVariants({ padded, className })} {...rest} />
})

export const BoxHeader = ({ size = "h3", ...props }: ComponentPropsWithoutRef<typeof Header>) => {
  return <Header size={size} {...props} />
}

export const BoxFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "-mx-6 -mb-6 flex flex-row-reverse items-center justify-between gap-4 border-t border-outline bg-gray-50 p-6 md:-mx-8 md:-mb-8 md:p-8",
        className,
      )}
      {...props}
    />
  )
}

const boxOverlayVariants = cva(
  ["fixed left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)] !overflow-auto"],
  {
    variants: {
      size: {
        sm: "w-[26rem]",
        md: "w-[32rem]",
        lg: "w-[38rem]",
      },
      fixed: {
        true: "top-[10vh] max-h-[calc(90vh-2rem)]",
        false: "top-1/2 -translate-y-1/2 max-h-[calc(100vh-2rem)]",
      },
    },
    defaultVariants: {
      size: "sm",
      fixed: true,
    },
  },
)

type BoxOverlayProps = HTMLAttributes<HTMLElement> &
  ComponentProps<typeof Box> &
  VariantProps<typeof boxOverlayVariants>

export const BoxOverlay = ({ className, size, fixed, ...props }: BoxOverlayProps) => {
  return <Box className={boxOverlayVariants({ size, fixed, className })} {...props} />
}
