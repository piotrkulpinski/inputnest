"use client"

import { useAuth, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import { config } from "~/config"

export const SignOut = () => {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { signOut } = useClerk()

  const handleClick = async () => {
    if (isSignedIn) {
      await signOut()
      router.push(config.routes.dashboard)
    } else {
      router.push(config.routes.signIn)
    }
  }

  return <button onClick={handleClick}>Sign {isSignedIn ? "Out" : "In"}</button>
}
