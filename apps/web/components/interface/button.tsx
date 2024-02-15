import { Loader, cx } from "@curiousleaf/design"
import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { forwardRef } from "react"
import type { ButtonHTMLAttributes, ReactNode } from "react"

import { Slottable } from "~/components/utils/slottable"
import { focusVisibleClasses } from "~/utils/classes"
import { isChildrenEmpty } from "~/utils/helpers"

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center align-middle cursor-pointer border rounded-md shadow-sm",
    "leading-snug break-normal whitespace-nowrap text-center font-medium hover:z-10",
    "disabled:opacity-60 disabled:pointer-events-none",
    "group-[.buttons]:rounded-none group-[.buttons]:first:rounded-l group-[.buttons]:last:rounded-r",
    focusVisibleClasses,
  ],
  {
    variants: {
      theme: {
        primary: "bg-blue-800 border-transparent text-white hover:bg-blue-800/95",
        secondary: "bg-white text-gray-600 border-outline hover:bg-gray-50 hover:border-gray-300",
        clean: "!p-0 -m-px bg-transparent border-transparent shadow-none hover:text-black",
      },
      size: {
        xs: "px-2 py-1 gap-[0.5ch] text-2xs",
        sm: "px-3 py-1.5 gap-[0.75ch] text-xs",
        md: "px-4 py-2 gap-[1ch] text-sm",
      },
      isActive: {
        true: "",
      },
      isDanger: {
        true: "",
      },
    },
    defaultVariants: {
      theme: "primary",
      size: "md",
    },
    compoundVariants: [
      {
        theme: "primary",
        isDanger: true,
        class: "bg-red-800 hover:bg-red-700",
      },
      {
        theme: "secondary",
        isDanger: true,
        class: "text-red-600 border-red-200 hover:bg-red-50 hover:border-red-600/40",
      },
      {
        theme: "primary",
        size: "md",
        class: "min-w-[8rem]",
      },
      {
        theme: "secondary",
        isActive: true,
        class: "z-20 !bg-blue-50 !border-blue-500 text-blue-600 grayscale-[35%]",
      },
    ],
  },
)

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean
    asChild?: boolean
    prefix?: ReactNode
    suffix?: ReactNode
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    disabled,
    theme,
    isDanger,
    isActive,
    size,
    asChild,
    isLoading,
    prefix,
    suffix,
    ...rest
  } = props
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      disabled={disabled ?? isLoading}
      className={cx(buttonVariants({ theme, size, isDanger, isActive, className }))}
      ref={ref}
      {...rest}
    >
      <Slottable child={children} asChild={asChild}>
        {(child) => (
          <>
            <div className={cx("contents", isLoading && "text-transparent")}>
              <Slot className="shrink-0" aria-hidden="true">
                {prefix}
              </Slot>

              {!isChildrenEmpty(child) && <span className="truncate">{child}</span>}

              <Slot className="shrink-0" aria-hidden="true">
                {suffix}
              </Slot>
            </div>

            {!!isLoading && <Loader className="absolute" />}
          </>
        )}
      </Slottable>
    </Comp>
  )
})
