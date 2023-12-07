import type { ReactNode } from "react"

export type WithOptionalProp<Type, Key extends keyof Type> = Pick<Partial<Type>, Key> &
  Omit<Type, Key>

export type WithRequiredProp<Type, Key extends keyof Type> = Type & {
  [Prop in Key]-?: Type[Prop]
}

/*
 ** Site Specific Types
 **/
export type MenuItem = {
  title: string
  href?: string
  target?: string
  prefix?: ReactNode
  suffix?: ReactNode
  items?: MenuItem[]
  end?: boolean
}

export type PlanInterval = "day" | "week" | "month" | "year"

export type Plan = {
  name: string
  description?: string
  features?: {
    text: string
    footnote?: ReactNode
    type?: "positive" | "negative"
  }[]
  featured?: boolean
  product?: string
  level: number
}
