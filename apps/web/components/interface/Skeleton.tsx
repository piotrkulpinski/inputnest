import { Button, Card, H5, Series } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"
import { Shimmer } from "~/components/interface/Shimmer"

export const Skeleton = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <Card {...props}>
      <Card.Row theme="gray">
        <H5 className="w-40 rounded bg-current opacity-10">&nbsp;</H5>

        <Series>
          <Button size="md" theme="secondary" variant="outline" loading>
            Edit
          </Button>

          <Button size="md" theme="secondary" variant="outline" loading>
            Delete
          </Button>
        </Series>

        <Shimmer />
      </Card.Row>
    </Card>
  )
}
