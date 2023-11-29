'use client'

import { useClerk } from "@clerk/nextjs"

export const SignOut = () => {
  const { signOut } = useClerk()

  return (
    <button
      className="bg-black text-white font-medium text-sm py-3 px-6 normal-case"
      onClick={async () => await signOut()}
    >
      Sign Out
    </button>
  )
}
