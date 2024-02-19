import type { Feed, FeedStoreState } from "@knocklabs/client"
import Knock from "@knocklabs/client"
import type { PropsWithChildren } from "react"
import { useEffect, useMemo, useRef } from "react"
import { useStore } from "zustand"

import { env } from "~/env"
import { createSimpleContext } from "~/utils/providers"

export type NotificationsContext = {
  knock: Knock
  feedClient: Feed
  useFeedStore: FeedStoreState
}

const NotificationsContext = createSimpleContext<NotificationsContext>("Notifications")

type NotificationsProviderProps = PropsWithChildren<{
  userId: string
}>

export const NotificationsProvider = ({ children, userId }: NotificationsProviderProps) => {
  const knockRef = useRef<Knock>()
  const feedClientRef = useRef<Feed>()

  const knockApiKey = env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY
  const knockFeedChannelId = env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID

  const knock = useMemo(() => {
    if (knockRef.current) knockRef.current.teardown()

    const knock = new Knock(knockApiKey)
    knock.authenticate(userId)
    knockRef.current = knock

    return knock
  }, [userId, knockApiKey])

  const feedClient = useMemo(() => {
    if (feedClientRef.current) feedClientRef.current.teardown()

    const feedClient = knock.feeds.initialize(knockFeedChannelId)

    feedClient.listenForUpdates()
    feedClientRef.current = feedClient

    return feedClient
  }, [knock, knockFeedChannelId])

  // When the feed client changes issue a re-fetch
  useEffect(() => {
    feedClient.fetch()
  }, [feedClient])

  const useFeedStore = useStore(feedClient.store)

  return (
    <NotificationsContext.Provider
      value={{
        knock,
        feedClient,
        useFeedStore,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotifications = NotificationsContext.useValue
