import { Knock } from "@knocklabs/node"

import { env } from "~/env"

export const knock = new Knock(env.KNOCK_API_KEY)
