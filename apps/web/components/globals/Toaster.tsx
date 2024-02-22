import { cx } from "@curiousleaf/design"
import type { ComponentPropsWithoutRef } from "react"
import { Toaster as Sonner } from "sonner"

export const Toaster = (props: ComponentPropsWithoutRef<typeof Sonner>) => {
  return (
    <Sonner
      gap={10}
      offset="20px"
      className="!z-[60]"
      richColors
      toastOptions={{
        className: cx(
          "!rounded !border-0 !bg-white !py-2.5 !shadow !ring-1 !ring-gray-200",
          "data-[type=error]:!text-red-dark/90 data-[type=success]:!text-green-dark/90",
        ),
      }}
      {...props}
    />
  )
}
