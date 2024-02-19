import { AvatarGroup, Shimmer } from "@curiousleaf/design"
import type { HTMLAttributes } from "react"

export const VotesSkeleton = (props: HTMLAttributes<HTMLElement>) => {
  return (
    <AvatarGroup size="sm" {...props}>
      {Array.from({ length: 5 }).map((_, i) => (
        <AvatarGroup.Item key={i} className="grayscale" />
      ))}

      <Shimmer />
    </AvatarGroup>
  )
}
