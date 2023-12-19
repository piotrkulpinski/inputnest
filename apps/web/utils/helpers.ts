import { removeHttp } from "@curiousleaf/utils"
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import type { ReactNode } from "react"
import { Children } from "react"
import { extendTailwindMerge } from "tailwind-merge"

import { config } from "~/config"
import { env } from "~/env"

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
 * Returns the tenant host URL with the given slug.
 * @param slug - The slug of the tenant.
 * @returns The tenant host URL with the given slug.
 */
export const getTenantUrl = (slug?: string) => {
  return env.NEXT_PUBLIC_TENANT_URL.replace("*", slug ?? "")
}

/**
 * Returns the tenant host with the given slug.
 * @param slug - The slug of the tenant.
 * @returns The tenant host URL with the given slug.
 */
export const getTenantHost = (slug?: string) => {
  return removeHttp(getTenantUrl(slug))
}
