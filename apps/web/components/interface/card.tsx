import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import { GripVerticalIcon } from "lucide-react"
import type { ComponentPropsWithoutRef, ElementRef, HTMLProps } from "react"
import { forwardRef } from "react"

import { Box } from "~/components/interface/box"
import { List } from "~/components/interface/list"
import { cn } from "~/utils/helpers"

export const Card = forwardRef<ElementRef<typeof Box>, ComponentPropsWithoutRef<typeof Box>>(
  ({ className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        padded={false}
        className={cn(
          "group/card divide-outline relative w-full divide-y overflow-clip hover:[&[href]]:z-10 hover:[&[href]]:border-gray-300",
          className,
        )}
        {...props}
      />
    )
  },
)

const cardPanelVariants = cva("px-4 py-4 sm:px-6 md:gap-4", {
  variants: {
    theme: {
      white: "bg-white",
      gray: "bg-gray-50",
    },
    flex: {
      row: "flex flex-wrap items-center gap-3",
      column: "flex flex-col gap-3",
    },
  },
  defaultVariants: {
    theme: "white",
  },
})

type CardPanelProps = HTMLProps<HTMLDivElement> & VariantProps<typeof cardPanelVariants>

export const CardPanel = ({ className, theme, flex, ...props }: CardPanelProps) => {
  return <div className={cardPanelVariants({ theme, flex, className })} {...props} />
}

export const CardActions = ({ className, ...props }: HTMLProps<HTMLDivElement>) => {
  return <List className={cn("ml-auto w-full empty:contents md:w-auto", className)} {...props} />
}

type CardDraggableProps = ComponentPropsWithoutRef<typeof GripVerticalIcon> & {
  isDragging?: boolean
}

export const CardDraggable = ({ className, isDragging, ...props }: CardDraggableProps) => {
  return (
    <GripVerticalIcon
      className={cn(
        "text-sm text-gray-300 transition hover:text-gray-500 focus:outline-none",
        isDragging ? "cursor-grabbing text-gray-500" : "cursor-grab",
        className,
      )}
      {...props}
    />
  )
}
