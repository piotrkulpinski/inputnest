"use client"

import { api } from "../utils/trpc"

export const SayHello = () => {
  const { data, isLoading, isError } = api.example.sayHello.useQuery({ name: "Piotr" })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return "Error"
  }

  return data?.greeting
}
