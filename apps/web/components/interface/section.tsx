import type { HTMLAttributes } from "react"

import { cn } from "~/utils/helpers"

export const Section = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <section className={cn("flex flex-col gap-6 md:gap-8", className)} {...props} />
}
