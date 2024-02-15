import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { HTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"

import { getImage } from "~/utils/images"

const avatarVariants = cva("relative flex items-center justify-center shrink-0", {
  variants: {
    size: {
      xs: "size-5 text-xxxs",
      sm: "size-6 text-2xs",
      md: "size-8 text-xs",
      lg: "size-10 text-sm",
      xl: "size-12 text-sm",
      '2xl': "size-16 text-base",
      '3xl': "size-20 text-base",
    },
    hasImage: {
      false: "bg-gray-200 text-gray-600",
    },
    shape: {
      square: "rounded",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
})

type AvatarProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof avatarVariants> & {
    src?: string | null
    fallback?: ReactNode
  }

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const { children, className, src, size, shape, fallback, ...rest } = props

  return (
    <div
      className={avatarVariants({ size, shape, hasImage: !!src, className })}
      ref={ref}
      {...rest}
    >
      {src ? (
        <img
          src={getImage({ image: src, width: 96, height: 96 })}
          width="96"
          height="96"
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        fallback && <span className="font-medium uppercase">{fallback}</span>
      )}

      {children}
    </div>
  )
})
