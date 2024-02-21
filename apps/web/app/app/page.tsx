import { db } from "@repo/database"
import { redirect } from "next/navigation"
import { config } from "~/config"
import { auth } from "~/services/auth"

export default async function Route() {
  const session = await auth()
  const userId = session?.user?.id

  const workspace = await db.workspace
    .findFirstOrThrow({
      where: { members: { some: { userId, role: { in: ["Owner", "Manager"] } } } },
      select: { slug: true },
    })
    .catch(() => redirect(config.routes.onboarding))

  redirect(config.routes.dashboard + workspace.slug)
}
