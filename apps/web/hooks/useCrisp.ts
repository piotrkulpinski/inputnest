"use client"

import { publishEscape } from "@curiousleaf/utils"
import { Crisp } from "crisp-sdk-web"
import { useSession } from "next-auth/react"
import type { MouseEventHandler } from "react"
import { useEffect, useState } from "react"

import { env } from "~/env"

export const useCrisp = () => {
  const { data: session } = useSession()
  const [isPending, setIsPending] = useState(false)

  // Initialize Crisp and set event listeners
  useEffect(() => {
    Crisp.configure(env.NEXT_PUBLIC_CRISP_WEBSITE_ID, {
      autoload: false,
    })

    Crisp.session.onLoaded(() => {
      setIsPending(false)
      publishEscape()
    })

    Crisp.chat.onChatOpened(() => {
      Crisp.chat.show()
    })

    Crisp.chat.onChatClosed(() => {
      Crisp.chat.hide()
    })
  }, [])

  // Set Crisp user data
  useEffect(() => {
    if (session?.user) {
      Crisp.user.setEmail(session.user.email ?? "")
      Crisp.user.setAvatar(session.user.image ?? "")
      Crisp.user.setNickname(session.user.name ?? "")
    }
  }, [session])

  const toggleChat: MouseEventHandler = e => {
    if (!Crisp.isCrispInjected()) {
      e.preventDefault()
      setIsPending(true)
    }

    if (!Crisp.chat.isVisible()) {
      Crisp.chat.open()
    } else {
      Crisp.chat.close()
    }
  }

  return { isPending, toggleChat }
}
