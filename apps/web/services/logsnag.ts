import { LogSnag } from "@logsnag/node"

import { env } from "~/env"

export const logsnag = new LogSnag({
  token: env.LOGSNAG_TOKEN,
  project: "userpledge",
})
