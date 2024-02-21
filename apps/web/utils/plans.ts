import type { Subscription } from "@inputnest/database"

import { config } from "~/config"

export const getSubscriptionPlan = (subscription?: Subscription | null) => {
  return config.plans.find(({ product }) => product === subscription?.productId) ?? config.plans[0]
}
