"use client"

import { formatDateTime } from "@curiousleaf/utils"
import { forwardRef } from "react"
import type { HTMLAttributes } from "react"

import { useRelativeTime } from "~/hooks/use-relative-time"

type TimeProps = HTMLAttributes<HTMLTimeElement> & {
  date: Date
}

export const Time = forwardRef<HTMLTimeElement, TimeProps>(({ date, ...props }, ref) => {
  const time = useRelativeTime(date)

  return (
    <time title={formatDateTime(date)} ref={ref} {...props}>
      {time}
    </time>
  )
})
