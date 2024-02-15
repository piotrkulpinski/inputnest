import { IconLoader, cx } from "@curiousleaf/design"
import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { createContext, forwardRef, useContext } from "react"
import type { HTMLAttributes, ReactNode } from "react"

import { Slottable } from "~/components/utils/slottable"
import { focusVisibleClasses } from "~/utils/classes"

export const ClickableClassContext = createContext<typeof clickableVariants | undefined>(undefined)

const clickableVariants = cva(
  "flex items-center gap-2.5 min-w-0 py-2 text-sm text-start text-gray-700",
  {
    variants: {
      isActive: {
        true: "text-black",
      },
      isFocusable: {
        true: ["hover:text-black", focusVisibleClasses],
        false: "focus:outline-none",
      },
    },
    defaultVariants: {
      isFocusable: true,
    },
  },
)

type ClickableProps = Omit<HTMLAttributes<HTMLElement>, "prefix"> &
  VariantProps<typeof clickableVariants> & {
    asChild?: boolean
    prefix?: ReactNode
    suffix?: ReactNode
    isLoading?: boolean
    isDisabled?: boolean
  }

export const Clickable = forwardRef<HTMLButtonElement, ClickableProps>((props, ref) => {
  const clickableClass = useContext(ClickableClassContext)

  const {
    children,
    className,
    isActive,
    isFocusable,
    asChild,
    prefix,
    suffix,
    isLoading,
    ...rest
  } = props
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cx(
        clickableVariants({ isActive, isFocusable, className }),
        clickableClass?.({ isActive, isFocusable }),
      )}
      ref={ref}
      {...rest}
    >
      <Slottable child={children} asChild={asChild}>
        {child => (
          <>
            <Slot className={cx("shrink-0", isActive && "text-blue-700")}>{prefix}</Slot>
            <span className="flex-1 truncate">{child}</span>
            <Slot className="shrink-0 text-gray-500">{isLoading ? <IconLoader /> : suffix}</Slot>
          </>
        )}
      </Slottable>
    </Comp>
  )
})
