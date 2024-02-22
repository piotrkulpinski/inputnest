import { Button, Card, H5, Series, Shimmer } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

export const Skeleton = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <Card {...props}>
      <Card.Row theme="gray">
        <H5 className="w-40 rounded bg-current opacity-10">&nbsp;</H5>

        <Series>
          <Button size="md" theme="secondary" variant="outline" isPending>
            Edit
          </Button>

          <Button size="md" theme="secondary" variant="outline" isPending>
            Delete
          </Button>
        </Series>

        <Shimmer />
      </Card.Row>
    </Card>
  )
}
