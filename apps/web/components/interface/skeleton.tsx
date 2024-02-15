import { Button, H5 } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { Card, CardActions, CardPanel } from "~/components/interface/card"
import { Shimmer } from "~/components/interface/shimmer"

export const Skeleton = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <Card {...props}>
      <CardPanel theme="gray" flex="row">
        <H5 className="w-40 rounded bg-current opacity-10">&nbsp;</H5>

        <CardActions>
          <Button theme="secondary" variant="outline" loading>
            Edit
          </Button>

          <Button theme="secondary" variant="outline" loading>
            Delete
          </Button>
        </CardActions>

        <Shimmer />
      </CardPanel>
    </Card>
  )
}
