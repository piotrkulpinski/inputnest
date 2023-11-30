import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { forwardRef } from "react"
import type { HTMLAttributes } from "react"

const copyVariants = cva(
  [
    "max-w-full [text-wrap:pretty] prose prose-gray",
    // Prose Link
    "prose-a:text-blue-700/75 prose-a:no-underline hover:prose-a:text-black",
    // Prose Code
    "prose-code:bg-gray-700/10 prose-code:text-[0.9em] prose-code:font-normal prose-code:text-gray-700 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:tracking-tight prose-code:before:content-none prose-code:after:content-none",
  ],
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-base md:text-lg",
        xl: "text-lg !leading-normal md:text-xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
)

type CopyProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof copyVariants> & {
    asChild?: boolean
  }

export const Copy = forwardRef<HTMLDivElement, CopyProps>((props, ref) => {
  const { className, size, asChild, ...rest } = props
  const Comp = asChild ? Slot : "div"

  return <Comp ref={ref} className={copyVariants({ size, className })} {...rest} />
})
