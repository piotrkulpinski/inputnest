import type { HTMLAttributes } from "react"

import { Button } from "~/components/interface/button"
import { Card, CardActions, CardPanel } from "~/components/interface/card"
import { H5 } from "~/components/interface/heading"
import { Shimmer } from "~/components/interface/shimmer"

export const Skeleton = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <Card {...props}>
      <CardPanel theme="gray" flex="row">
        <H5 className="w-40 rounded bg-current opacity-10">&nbsp;</H5>

        <CardActions>
          <Button theme="secondary" isLoading>
            Edit
          </Button>

          <Button theme="secondary" isLoading>
            Delete
          </Button>
        </CardActions>

        <Shimmer />
      </CardPanel>
    </Card>
  )
}
