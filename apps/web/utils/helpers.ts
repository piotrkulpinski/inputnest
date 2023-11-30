import { removeHttp } from "@curiousleaf/utils"
import { hexToRgba } from "@uiw/color-convert"
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import type { ReactNode } from "react"
import { Children } from "react"
import { extendTailwindMerge } from "tailwind-merge"

import { config } from "~/config"
import { env } from "~/env"

/**
 * Delays the execution of the function by the specified amount of time.
 * @param delay - The amount of time to delay the execution of the function, in milliseconds.
 */
export const sleep = async (delay: number) => {
  new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * Combines multiple class names into a single string.
 * @param classes - The class names to combine.
 * @returns A string containing all the class names separated by a space.
 */
export const cn = (...classes: ClassValue[]): string => {
  const customTwMerge = extendTailwindMerge({
    extend: {
      classGroups: {
        "font-size": ["text-xxs", "text-xxxs"],
      },
    },
  })

  return customTwMerge(clsx(...classes))
}

/**
 * Checks if the given ReactNode is empty.
 *
 * @param children - The ReactNode to check.
 * @returns True if the ReactNode is empty, false otherwise.
 */
export const isChildrenEmpty = (children: ReactNode) => {
  return Children.count(children) === 0
}

/**
 * Formats the badge count to display on the UI.
 * If the count is greater than 9, it returns "9+".
 * Otherwise, it returns the count as a string.
 * @param count The number to format.
 * @returns The formatted badge count.
 */
export const formatBadgeCount = (count: number) => {
  return count > 9 ? "9+" : count
}

/**
 * Returns a label for the first search key shortcut found.
 * @returns The label for the shortcut.
 */
export const getShortcutLabel = () => {
  const shortcut = config.commandShortcuts[0]

  const { key, metaKey } = shortcut
  const label = `${metaKey ? "⌘" : ""}${key.toUpperCase()}`
  return label
}

/**
 * Check if a given color in hexadecimal format is a light color.
 *
 * @param hexa - The hexadecimal color code to check.
 * @returns A boolean indicating if the color is light.
 */
export const isLightColor = (hexa: string) => {
  const { r, g, b, a } = hexToRgba(hexa)
  const brightness = r * 0.299 + g * 0.587 + b * 0.114 + (1 - a) * 255

  return brightness > 186
}

/**
 * Returns the tenant host URL with the given slug.
 * @param slug - The slug of the tenant.
 * @returns The tenant host URL with the given slug.
 */
export const getTenantUrl = (slug?: string) => {
  return env.NEXT_PUBLIC_APP_URL.replace("*", slug ?? "")
}

/**
 * Returns the tenant host with the given slug.
 * @param slug - The slug of the tenant.
 * @returns The tenant host URL with the given slug.
 */
export const getTenantHost = (slug?: string) => {
  return removeHttp(getTenantUrl(slug))
}
