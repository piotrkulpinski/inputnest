import { Avatar, Button, Divider } from "@curiousleaf/design"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { BasicLayout } from "~/components/layouts/BasicLayout"
import { config } from "~/config"
import { api } from "~/services/trpc/server"

export default async function Route() {
  const workspaces = await api.workspaces.getAll.query()

  if (!workspaces.length) {
    redirect(config.routes.onboarding)
  }

  return (
    <BasicLayout
      title="Choose your workspace"
      description="Select from one of your existing workspaces or create a brand new one."
    >
      <div className="flex flex-col gap-y-2">
        {workspaces.map(({ id, name, slug, logo }) => (
          <Button
            key={id}
            theme="secondary"
            variant="outline"
            prefix={<Avatar src={logo} initials={name} shape="rounded" size="xs" />}
            className="justify-start"
            asChild
          >
            <Link href={`/app/${slug}`}>{name}</Link>
          </Button>
        ))}

        <Divider className="my-4" />

        <Button
          theme="secondary"
          variant="outline"
          prefix={<PlusIcon />}
          className="justify-start"
          asChild
        >
          <Link href={config.routes.onboarding}>Add New Workspace</Link>
        </Button>
      </div>
    </BasicLayout>
  )
}
