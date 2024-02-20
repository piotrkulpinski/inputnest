import { db } from "@repo/database"
import { redirect } from "next/navigation"
import { config } from "~/config"
import { auth } from "~/services/auth"

export default async function Route() {
  const session = await auth()
  const userId = session?.user?.id

  const company = await db.company
    .findFirstOrThrow({
      where: { members: { some: { userId, role: { in: ["Owner", "Manager"] } } } },
      select: { slug: true },
    })
    .catch(() => redirect(config.routes.onboarding))

  redirect(config.routes.dashboard + company.slug)
}
