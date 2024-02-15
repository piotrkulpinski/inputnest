import { cx } from "@curiousleaf/design"
import { Slot } from "@radix-ui/react-slot"
import type { HTMLAttributes } from "react"
import { forwardRef } from "react"

import { IconLogo } from "~/components/interface/icons/logo"
import { Slottable } from "~/components/utils/slottable"

type LogoProps = HTMLAttributes<HTMLElement> & {
  asChild?: boolean
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>((props, ref) => {
  const { children, className, asChild, ...rest } = props
  const Comp = asChild ? Slot : "div"

  return (
    <Comp className={cx("flex shrink-0 items-center gap-2", className)} ref={ref} {...rest}>
      <Slottable child={children} asChild={asChild}>
        {(child) => (
          <>
            <IconLogo className="h-icon w-icon" />
            {!!child && <span className="whitespace-nowrap font-semibold">{child}</span>}
          </>
        )}
      </Slottable>
    </Comp>
  )
})
