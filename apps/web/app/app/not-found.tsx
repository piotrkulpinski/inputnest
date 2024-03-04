import { Button } from "@curiousleaf/design"
import Link from "next/link"
import { BasicLayout } from "~/components/layouts/basic/BasicLayout"
import { config } from "~/config"

export default function NotFound() {
  return (
    <BasicLayout
      title="Page Not Found"
      description="The page you are looking for could not be found."
    >
      <div>
        <Button theme="secondary" asChild>
          <Link href={config.routes.dashboard}>Go to the home page</Link>
        </Button>
      </div>
    </BasicLayout>
  )
}
