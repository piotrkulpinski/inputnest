import { AvatarGroup } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

import { Shimmer } from "~/components/interface/shimmer"

export const VotesSkeleton = (props: HTMLAttributes<HTMLElement>) => {
  return (
    <AvatarGroup size="sm" {...props}>
      {Array.from({ length: 5 }).map((_, i) => (
        <AvatarGroup.Item key={i} />
      ))}

      <Shimmer />
    </AvatarGroup>
  )
}
