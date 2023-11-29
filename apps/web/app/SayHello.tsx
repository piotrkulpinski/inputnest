'use client'

import { api } from "../utils/trpc"

export const SayHello = () => {
  const { data, isLoading, isSuccess } = api.example.sayHello.useQuery({ name: 'Piotr' })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isSuccess) {
    return null
  }

  return (
    data?.greeting
  )
}
