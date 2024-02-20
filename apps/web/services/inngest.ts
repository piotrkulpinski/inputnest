import { EventSchemas, Inngest } from "inngest"

import type { Events } from "~/functions"

export const inngest = new Inngest({
  id: "InputNest",
  schemas: new EventSchemas().fromRecord<Events>(),
})
