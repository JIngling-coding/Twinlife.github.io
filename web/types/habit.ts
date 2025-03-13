import type { ReactNode } from "react"

export type Habit = {
  id: string
  name: string
  icon: ReactNode
  bgColor: string
  color: string
  count: number
  completedDays: number[]
}

