"use client"

import {
  Badge,
  Button,
  Dot,
  Dropdown,
  H6,
  MenuItem,
  Paragraph,
  Prose,
  cx,
} from "@curiousleaf/design"
import { NetworkStatus, isRequestInFlight } from "@knocklabs/client"
import { BellIcon, CheckCheckIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import type { HTMLAttributes } from "react"

import { Time } from "~/components/interface/Time"
import { NotificationsProvider, useNotifications } from "~/providers/NotificationsProvider"
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

      <Dropdown.Content side="top" align="start" className="w-[18rem]" {...props}>
        <Dropdown.Label className="flex items-center justify-between">
          <H6 className="grow truncate">Notifications</H6>

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

        {items.length ? (
          <Dropdown.Group className="max-h-[25rem] overflow-y-auto">
            {items.map(item => (
              <Dropdown.Item key={item.id} asChild>
                <MenuItem
                  prefix={
                    <Dot className={cx("mt-2", item.read_at ? "text-gray-300" : "text-primary")} />
                  }
                  onClick={() => feedClient.markAsRead(item)}
                  // className="!items-start"
                  asChild
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
                </MenuItem>
              </Dropdown.Item>
            ))}
          </Dropdown.Group>
        ) : (
          <Dropdown.Label>
            <Paragraph size="sm" className="text-gray-600">
              We&apos;ll let you know when we got something for you.
            </Paragraph>
          </Dropdown.Label>
        )}

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
      </Dropdown.Content>
    </Dropdown>
  )
}

export const NavNotifications = (props: HTMLAttributes<HTMLElement>) => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <NavNotificationsSkeleton />
  }

  if (status !== "authenticated" || !session.user?.id) {
    return null
  }

  return (
    <NotificationsProvider userId={session.user.id}>
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
