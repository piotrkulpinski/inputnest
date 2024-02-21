"use client"

import { Slottable, cx } from "@curiousleaf/design"
import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

type LogoProps = HTMLAttributes<HTMLElement> & {
  asChild?: boolean
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>((props, ref) => {
  const { children, className, asChild, ...rest } = props
  const Comp = asChild ? Slot : "div"

  return (
    <Comp className={cx("flex shrink-0 items-center gap-2", className)} ref={ref} {...rest}>
      <Slottable child={children} asChild={asChild}>
        {child => (
          <>
            <svg
              xmlns="http://www.w3.workspace/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-icon"
            >
              <title>Logo</title>
              <path d="M19.939 3c.567 0 1.053.476 1.053 1.032v15.559c.04.277-.08.555-.283.754-.203.198-.446.278-.73.317l-15.925-.04c-.568 0-1.054-.476-1.054-1.031v-7.78c0-.555.486-1.032 1.054-1.032.567 0 1.053.477 1.053 1.032v6.748h13.778V4.032c0-.556.486-1.032 1.054-1.032zm-3.931 10.439c.567 0 1.053.476 1.053 1.032 0 .238-.121.516-.324.714-.202.198-.445.278-.73.318h-7.86c-.568 0-1.054-.477-1.054-1.032 0-.556.486-1.032 1.053-1.032h7.862zm0-5.24c.567 0 1.053.477 1.053 1.032-.04.278-.121.516-.324.715-.202.198-.445.278-.73.317h-7.86c-.568 0-1.054-.476-1.054-1.032 0-.555.486-1.032 1.053-1.032h7.862zm0-5.16c.567 0 1.053.477 1.053 1.033 0 .238-.121.516-.324.714-.202.199-.445.278-.73.318h-3.97c-.568 0-1.054-.477-1.054-1.032 0-.556.486-1.032 1.054-1.032h3.97z" />
            </svg>

            {child && <span className="whitespace-nowrap font-semibold">{child}</span>}
          </>
        )}
      </Slottable>
    </Comp>
  )
})
