import { getInitials } from "@curiousleaf/utils"
import { forwardRef, type HTMLAttributes } from "react"

import { Avatar } from "~/components/interface/avatar"
import { cn } from "~/utils/helpers"

type BlurbProps = HTMLAttributes<HTMLElement> & {
  src: string | null
  title: string
  description?: string
}

export const Blurb = forwardRef<HTMLDivElement, BlurbProps>((props, ref) => {
  const { className, children, src, title, description, ...rest } = props

  return (
    <div ref={ref} className={cn("flex items-center gap-3 text-start", className)} {...rest}>
      <Avatar src={src} fallback={getInitials(title, 2)} size="xl" className="max-xs:hidden" />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium">{title}</span>
        {description && (
          <span className="truncate text-xs leading-tight text-gray-500">{description}</span>
        )}
      </div>

      {children}
    </div>
  )
})
