import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

import { cn } from "~/utils/helpers"

type ShortcutProps = HTMLAttributes<HTMLElement>

export const Shortcut = forwardRef<HTMLElement, ShortcutProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <span
      className={cn(
        "ml-auto whitespace-nowrap rounded border bg-gray-50 px-1 text-xs tracking-widest text-gray-600",
        className,
      )}
      ref={ref}
      {...rest}
    />
  )
})
