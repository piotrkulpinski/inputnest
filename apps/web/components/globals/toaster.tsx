import { clsx } from "clsx"
import type { ComponentPropsWithoutRef } from "react"
import { Toaster as Sonner } from "sonner"

export const Toaster = (props: ComponentPropsWithoutRef<typeof Sonner>) => {
  return (
    <Sonner
      offset="20px"
      className="!z-[60]"
      richColors
      toastOptions={{
        className: clsx([
          "!rounded !border-0 !bg-white !py-2.5 !shadow !ring-1 !ring-gray-200",
          "data-[type=error]:!text-red-700/90 data-[type=success]:!text-green-700/90",
        ]),
      }}
      {...props}
    />
  )
}
