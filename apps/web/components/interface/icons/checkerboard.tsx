import type { HTMLAttributes } from "react"

export const IconCheckerboard = ({ ...props }: HTMLAttributes<SVGElement>) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="M0 0h9v9H0z" />
      <path fill="currentColor" d="M9 9h9v9H9z" />
    </svg>
  )
}
