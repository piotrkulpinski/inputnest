"use client"

import { useUser } from "@clerk/nextjs"
import { Badge, Button, Dot, Dropdown, Paragraph, Prose, cx } from "@curiousleaf/design"
import { isRequestInFlight, NetworkStatus } from "@knocklabs/client"
import { BellIcon, CheckCheckIcon } from "lucide-react"
import Link from "next/link"
import type { HTMLAttributes } from "react"

import { Time } from "~/components/interface/time"
import { NotificationsProvider, useNotifications } from "~/providers/notifications-provider"
import { formatBadgeCount } from "~/utils/helpers"

const NavNotificationsDropdown = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const { feedClient, useFeedStore } = useNotifications()
  const { pageInfo, items, metadata, networkStatus } = useFeedStore
  const requestInFlight = isRequestInFlight(networkStatus)

  return (
    <Dropdown onOpenChange={() => metadata.unseen_count && feedClient.markAllAsSeen()}>
      <Dropdown.Trigger
        className={cx("rounded-full border p-1 text-xs hover:border-gray-300", className)}
      >
        <BellIcon />

        {!!metadata.unseen_count && (
          <Badge size="sm" className="absolute -right-2 -top-2 border border-white">
            {formatBadgeCount(metadata.unseen_count)}
          </Badge>
        )}
      </Dropdown.Trigger>

      <Dropdown.Content align="end" className="w-[18rem]" {...props}>
        <Dropdown.Label className="flex items-center justify-between">
          <strong className="truncate font-semibold">Notifications</strong>

          {!!items.length && (
            <Button
              size="sm"
              theme="secondary"
              variant="outline"
              suffix={<CheckCheckIcon />}
              onClick={() => feedClient.markAllAsRead()}
              disabled={!metadata.unread_count}
              className="-my-1"
            >
              Mark all as read
            </Button>
          )}
        </Dropdown.Label>

        <Dropdown.Group className="max-h-[25rem] overflow-y-auto !py-0">
          <Dropdown.Group>
            {items.length ? (
              items.map(item => (
                <Dropdown.Item
                  key={item.id}
                  prefix={
                    <Dot className={cx("mt-2", item.read_at ? "text-gray-300" : "text-primary")} />
                  }
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
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Label>
                <Paragraph>We&apos;ll let you know when we got something for you.</Paragraph>
              </Dropdown.Label>
            )}
          </Dropdown.Group>

          {!!pageInfo.after && (
            <Dropdown.Group>
              <Button
                size="sm"
                theme="secondary"
                variant="outline"
                onClick={() => feedClient.fetchNextPage()}
                loading={networkStatus === NetworkStatus.fetchMore}
                disabled={requestInFlight}
              >
                Load more
              </Button>
            </Dropdown.Group>
          )}
        </Dropdown.Group>
      </Dropdown.Content>
    </Dropdown>
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
