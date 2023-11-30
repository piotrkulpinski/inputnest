import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import type { HTMLAttributes, ReactElement } from "react"

import { containerGutterClasses } from "~/utils/classes"

const containerVariants = cva("w-full", {
  variants: {
    fullWidth: {
      true: "",
      false: "max-w-6xl mx-auto",
    },
    hasPadding: {
      true: containerGutterClasses,
    },
  },
  defaultVariants: {
    fullWidth: false,
    hasPadding: true,
  },
})

type ContainerProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof containerVariants> & {
    comp?: ReactElement
  }

export const Container = ({ className, fullWidth, hasPadding, ...props }: ContainerProps) => {
  return <div className={containerVariants({ fullWidth, hasPadding, className })} {...props} />
}
