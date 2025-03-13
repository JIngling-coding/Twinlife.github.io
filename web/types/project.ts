export type Project = {
  id: string
  name: string
  category: string
  description: string
  progress: number
  tasks: { total: number; completed: number }
  members: number
  dueDate: string
  status: "进行中" | "已完成" | "规划中"
}

