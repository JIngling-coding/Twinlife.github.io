export type TaskStatus = "进行中" | "待办" | "已完成" | "已延期"

export type TaskPeriod = {
  type: "daily" | "weekly" | "biweekly" | "monthly" | "yearly" | "quarterly"
  interval: number
  dayOfWeek?: number // for weekly and biweekly tasks
  dayOfMonth?: number // for monthly tasks
  endDate?: string // 结束日期，可选
}

export type Task = {
  id: string
  name: string
  project: string
  dueDate: string
  tags: string[]
  priority: "高" | "中" | "低"
  department: string
  status: TaskStatus
  description?: string
  isCompleted: boolean
  parentId?: string // 父任务ID
  subtasks?: Task[] // 子任务
  period?: TaskPeriod // 周期任务设置
  recurringProcessed?: boolean // 标记是否已处理过周期任务
  periodIndicator?: string // 周期标识，如 W12, M3, Q2 等
}

export type Project = {
  id: string
  name: string
  category: string
  description: string
  progress: number
  tasks: {
    total: number
    completed: number
  }
  members: number
  dueDate: string
  status: "进行中" | "已完成" | "规划中"
}

