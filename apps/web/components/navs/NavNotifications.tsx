import { useUser } from "@clerk/nextjs"
import { Paragraph, Prose } from "@curiousleaf/design"
import { isRequestInFlight, NetworkStatus } from "@knocklabs/client"
import { BellIcon, CheckCheckIcon } from "lucide-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"

import { Badge } from "~/components/interface/badge"
import { Button } from "~/components/interface/button"
import { Dot } from "~/components/interface/dot"
import {
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownLabel,
  DropdownRoot,
  DropdownTrigger,
} from "~/components/interface/dropdown"
import { Time } from "~/components/interface/time"
import { NotificationsProvider, useNotifications } from "~/providers/notifications-provider"
import { cn, formatBadgeCount } from "~/utils/helpers"

const NavNotificationsDropdown = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const { feedClient, useFeedStore } = useNotifications()
  const { pageInfo, items, metadata, networkStatus } = useFeedStore
  const requestInFlight = isRequestInFlight(networkStatus)

  return (
    <DropdownRoot onOpenChange={() => metadata.unseen_count && feedClient.markAllAsSeen()}>
      <DropdownTrigger
        className={cn("rounded-full border p-1 text-xs hover:border-gray-300", className)}
      >
        <BellIcon />

        {!!metadata.unseen_count && (
          <Badge size="sm" className="absolute -right-2 -top-2 border border-white">
            {formatBadgeCount(metadata.unseen_count)}
          </Badge>
        )}
      </DropdownTrigger>

      <DropdownContent align="end" className="w-[18rem]" {...props}>
        <DropdownLabel className="flex items-center justify-between">
          <strong className="truncate font-semibold">Notifications</strong>

          {!!items.length && (
            <Button
              theme="secondary"
              size="xs"
              suffix={<CheckCheckIcon />}
              onClick={() => feedClient.markAllAsRead()}
              disabled={!metadata.unread_count}
              className="-my-1"
            >
              Mark all as read
            </Button>
          )}
        </DropdownLabel>

        <DropdownGroup className="max-h-[25rem] overflow-y-auto !py-0">
          <DropdownGroup>
            {items.length ? (
              items.map((item) => (
                <DropdownItem
                  key={item.id}
                  prefix={<Dot theme={item.read_at ? "silver" : "blue"} className="mt-2" />}
                  onClick={() => feedClient.markAsRead(item)}
                  className="!items-start"
                >
                  <Link href={item.blocks[1]?.rendered ?? ""}>
                    <div className="whitespace-normal">
                      <Prose
                        dangerouslySetInnerHTML={{
                          __html: item.blocks[0]?.rendered ?? "",
                        }}
                      />

                      <Time
                        date={new Date(item.inserted_at)}
                        className="mt-1 text-xs text-gray-500"
                      />
                    </div>
                  </Link>
                </DropdownItem>
              ))
            ) : (
              <DropdownLabel>
                <Paragraph>We&apos;ll let you know when we got something for you.</Paragraph>
              </DropdownLabel>
            )}
          </DropdownGroup>

          {!!pageInfo.after && (
            <DropdownGroup>
              <Button
                theme="secondary"
                size="xs"
                onClick={() => feedClient.fetchNextPage()}
                isLoading={networkStatus === NetworkStatus.fetchMore}
                disabled={requestInFlight}
              >
                Load more
              </Button>
            </DropdownGroup>
          )}
        </DropdownGroup>
      </DropdownContent>
    </DropdownRoot>
  )
}

export const NavNotifications = (props: HTMLAttributes<HTMLElement>) => {
  const { user, isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return <NavNotificationsSkeleton />
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <NotificationsProvider userId={user.id}>
      <NavNotificationsDropdown {...props} />
    </NotificationsProvider>
  )
}

export const NavNotificationsSkeleton = () => {
  return (
    <span className="rounded-full border p-1 text-xs">
      <BellIcon />
    </span>
  )
}
