import { isProd } from "~/env"
import type { Plan } from "~/index"

export const plansConfig = {
  plans: [
    {
      name: "Free",
      description: "The essentials to get you started with InputNest.",
      features: [
        { text: "InputNest.site domain" },
        { text: "Unlimited CMS items" },
        { text: "Made in InputNest badge", type: "negative" },
      ],
      level: 0,
    },
    {
      name: "Basic",
      description: "Take your InputNest website to the next level.",
      features: [
        { text: "Custom domain" },
        { text: "Free SSL certificates" },
        { text: "Priority support" },
        { text: "All Free plan features" },
      ],
      featured: true,
      product: isProd ? "prod_OqdIHTiEk7D5Pu" : "prod_OqdIHTiEk7D5Pu",
      level: 1,
    },
    {
      name: "Business",
      description: "Turn your website into a money-making machine.",
      features: [
        { text: "Monetization features" },
        { text: "Unlimited backups" },
        { text: "Staging environment" },
        { text: "All Basic plan features" },
      ],
      product: isProd ? "prod_OqdJNE41ZOQLcT" : "prod_OqdJNE41ZOQLcT",
      level: 2,
    },
  ] satisfies Plan[],
}
