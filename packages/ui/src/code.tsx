import type { HTMLAttributes } from "react"

export function Code({ children, className }: HTMLAttributes<HTMLElement>) {
  return <code className={className}>{children}</code>
}
