"use client"

import { useUser } from "@clerk/nextjs"
import { publishEscape } from "@curiousleaf/utils"
import { Crisp } from "crisp-sdk-web"
import type { MouseEventHandler } from "react"
import { useEffect, useState } from "react"

import { env } from "~/env"

export const useCrisp = () => {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  // Initialize Crisp and set event listeners
  useEffect(() => {
    Crisp.configure(env.NEXT_PUBLIC_CRISP_WEBSITE_ID, {
      autoload: false,
    })

    Crisp.session.onLoaded(() => {
      setIsLoading(false)
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
    if (user) {
      Crisp.user.setEmail(user.primaryEmailAddress?.emailAddress ?? "")
      Crisp.user.setAvatar(user.imageUrl)
      Crisp.user.setNickname(user.fullName ?? "")
    }
  }, [user])

  const toggleChat: MouseEventHandler = (e) => {
    if (!Crisp.isCrispInjected()) {
      e.preventDefault()
      setIsLoading(true)
    }

    if (!Crisp.chat.isVisible()) {
      Crisp.chat.open()
    } else {
      Crisp.chat.close()
    }
  }

  return { isLoading, toggleChat }
}
