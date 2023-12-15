import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { InputHTMLAttributes, ReactNode } from "react"
import { forwardRef, useRef } from "react"

import { cn } from "~/utils/helpers"
import { createSimpleContext } from "~/utils/providers"

const formAffixVariants = cva(
  "absolute z-10 top-1/2 -translate-y-1/2 px-3 text-sm/5 text-gray-500",
  {
    variants: {
      side: {
        left: "left-px",
        right: "right-px",
      },
      events: {
        false: "pointer-events-none",
      },
    },
    defaultVariants: {
      side: "left",
      events: false,
    },
  },
)

export type AffixContext = {
  prefixWidth?: number
  suffixWidth?: number
}

const AffixContext = createSimpleContext<AffixContext>("Affix")

type FormAffixProps = Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> &
  VariantProps<typeof formAffixVariants> & {
    prefix?: ReactNode
    suffix?: ReactNode
  }

export const FormAffix = forwardRef<HTMLDivElement, FormAffixProps>(
  ({ children, className, prefix, suffix, events, ...props }, ref) => {
    const prefixRef = useRef<HTMLDivElement>(null)
    const suffixRef = useRef<HTMLDivElement>(null)

    if (!prefix && !suffix) {
      return <>{children}</>
    }

    return (
      <AffixContext.Provider
        value={{
          prefixWidth: prefixRef.current?.offsetWidth,
          suffixWidth: suffixRef.current?.offsetWidth,
        }}
      >
        <div className={cn("relative flex w-full items-center", className)} ref={ref} {...props}>
          {!!prefix && (
            <div className={formAffixVariants({ side: "left", events })} ref={prefixRef}>
              {prefix}
            </div>
          )}

          {children}

          {!!suffix && (
            <div className={formAffixVariants({ side: "right", events })} ref={suffixRef}>
              {suffix}
            </div>
          )}
        </div>
      </AffixContext.Provider>
    )
  },
)

export const useAffix = AffixContext.useValue
