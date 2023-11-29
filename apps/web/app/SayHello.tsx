'use client'

import { api } from "../utils/trpc"

export const SayHello = () => {
  const { data, isLoading } = api.example.sayHello.useQuery({ name: 'Piotr' })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    data?.greeting
  )
}
