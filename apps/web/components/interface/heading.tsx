import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

const headingVariants = cva(null, {
  variants: {
    size: {
      h1: "font-semibold text-2xl md:text-3xl",
      h2: "font-semibold text-xl md:text-2xl",
      h3: "font-semibold text-lg md:text-xl",
      h4: "font-semibold text-lg",
      h5: "font-medium text-base",
      h6: "font-medium text-sm",
    },
  },
  defaultVariants: {
    size: "h2",
  },
})

type HeadingProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof headingVariants> & {
    asChild?: boolean
  }

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { className, asChild, size, ...rest } = props
  const Comp = asChild ? Slot : size ?? "h2"

  return <Comp className={headingVariants({ size, className })} ref={ref} {...rest} />
})

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading size="h1" ref={ref} {...props} />
})

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading size="h2" ref={ref} {...props} />
})

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading size="h3" ref={ref} {...props} />
})

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading size="h4" ref={ref} {...props} />
})

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading size="h5" ref={ref} {...props} />
})

export const H6 = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return <Heading size="h6" ref={ref} {...props} />
})
