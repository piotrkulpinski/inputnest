import { colorsConfig } from "~/config/colors"
import { contentConfig } from "~/config/content"
import { filesConfig } from "~/config/files"
import { plansConfig } from "~/config/plans"
import { routesConfig } from "~/config/routes"

export const config = {
  title: "InputNest",
  tagline: "The easiest way to collect anything online",
  description:
    "Putting together a directory website was time consuming. InputNest lets you focus on the content and makes the entire process effortless.",

  // Command
  commandShortcuts: [{ key: "k", metaKey: true }] as const,

  // Modules
  ...routesConfig,
  ...plansConfig,
  ...contentConfig,
  ...colorsConfig,
  ...filesConfig,
}
