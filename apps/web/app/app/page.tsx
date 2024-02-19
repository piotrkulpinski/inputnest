import { db } from "@repo/database"
import { redirect } from "next/navigation"
import { config } from "~/config"

export default async function Route() {
  // TODO: Make sure to properly authenticate this
  const company = await db.company
    .findFirstOrThrow({
      // where: { slug: params.company },
      include: {
        domain: true,
        subscription: true,
        members: {
          where: { role: { in: ["Owner", "Manager"] } },
          include: { user: true },
        },
      },
    })
    .catch(() => redirect(config.routes.onboarding))

  redirect(config.routes.dashboard + company.slug)
}
