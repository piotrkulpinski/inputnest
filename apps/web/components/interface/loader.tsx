import { IconLoader } from "@tabler/icons-react"
import { forwardRef, type SVGProps } from "react"

import { cn } from "~/utils/helpers"

export const Loader = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => {
    return <IconLoader ref={ref} className={cn("animate-spin", className)} {...props} />
  },
)
