import type { Subscription } from "@repo/database"

import { config } from "~/config"

export const getSubscriptionPlan = (subscription?: Subscription | null) => {
  return config.plans.find(({ product }) => product === subscription?.productId) ?? config.plans[0]
}
