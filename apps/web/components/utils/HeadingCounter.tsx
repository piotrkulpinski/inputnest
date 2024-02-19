import type { HTMLAttributes } from "react"

type HeadingCounterProps = HTMLAttributes<HTMLElement> & {
  data?: unknown[]
}

export const HeadingCounter = ({ children, data, ...props }: HeadingCounterProps) => {
  return (
    <>
      {children}{" "}
      {data && (
        <span className="text-gray-400" {...props}>
          ({data.length})
        </span>
      )}
    </>
  )
}
