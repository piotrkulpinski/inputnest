import type { HTMLProps } from "react"

import { cn } from "~/utils/helpers"

export const MenuHeading = ({ className, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "mb-2 ml-1 mt-6 font-display text-xxs font-medium uppercase tracking-wide text-gray-400 first:mt-0 last:mb-0",
        className,
      )}
      {...props}
    />
  )
}
