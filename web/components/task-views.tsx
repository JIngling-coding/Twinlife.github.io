"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  ListFilter,
  LayoutGrid,
  Clock,
  Star,
  Activity,
  Sun,
  Coffee,
  ChevronDown,
  Search,
  Plus,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TaskEditDialog } from "./task-edit-dialog"
import { FieldEditPopover } from "./field-edit-popover"
import { TaskCheckbox } from "./task-checkbox"
import type { TaskStatus } from "@/types/task"
import { TaskManagementPopover } from "./task-management-popover"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { getTagColors, type priorityColors, cn, getPriorityStyles, getDepartmentStyles } from "@/utils/tag-colors"

import { NewTaskDialog } from "./new-task-dialog"
import { NewProjectDialog } from "./new-project-dialog"
import { NewHabitDialog } from "./new-habit-dialog"
import { DateEditDialog } from "./date-edit-dialog"

// 项目类型
type Project = {
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

// 任务类型
type Task = {
  id: string
  name: string
  project: string
  dueDate: string
  tags: string[]
  priority: "高" | "中" | "低"
  department: string
  status: "进行中" | "已完成" | "待处理" | "待办"
  description?: string
  isCompleted?: boolean
  subtasks?: Task[]
  parentId?: string
  period?: {
    type: "daily" | "weekly" | "monthly" | "yearly" | "quarterly"
    interval: number
    endDate?: string
  }
  // Add a flag to track if a recurring task has been processed
  recurringProcessed?: boolean
  // Add a field to store the period indicator
  periodIndicator?: string
}

// 习惯类型
type Habit = {
  id: string
  name: string
  icon: React.ReactNode
  bgColor: string
  color: string
  count: number
  completedDays: number[]
}

export function TaskViews() {
  const [view, setView] = useState("tasks")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  // Use a ref to track tasks that have already been processed
  const processedTasksRef = useRef<Set<string>>(new Set())

  // 添加以下状态
  const [managementPopoverTask, setManagementPopoverTask] = useState<Task | null>(null)
  const [isManagementPopoverOpen, setIsManagementPopoverOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "全部">("全部")

  // 新增状态
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false)
  const [newItemType, setNewItemType] = useState<"task" | "project" | "habit">("task")

  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)
  const [isNewHabitDialogOpen, setIsNewHabitDialogOpen] = useState(false)

  // 添加这些状态
  const [departments, setDepartments] = useState<string[]>(["市场部", "技术部", "人力资源部", "财务部", "运营部"])
  const [allTags, setAllTags] = useState<string[]>(["重要", "紧急", "长期", "短期", "会议", "报告", "客户", "内部"])

  const [dateEditTask, setDateEditTask] = useState<Task | null>(null)
  const [isDateEditDialogOpen, setIsDateEditDialogOpen] = useState(false)

  // 示例数据
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "网站重设计",
      category: "设计",
      description: "公司官网的全面重设计和开发",
      progress: 65,
      tasks: { total: 24, completed: 16 },
      members: 4,
      dueDate: "2024-04-15",
      status: "进行中",
    },
    {
      id: "2",
      name: "移动应用开发",
      category: "开发",
      description: "开发一个跨平台的移动应用",
      progress: 40,
      tasks: { total: 32, completed: 13 },
      members: 6,
      dueDate: "2024-05-20",
      status: "进行中",
    },
    {
      id: "3",
      name: "市场营销活动",
      category: "营销",
      description: "为新产品策划和执行市场营销活动",
      progress: 15,
      tasks: { total: 18, completed: 3 },
      members: 3,
      dueDate: "2024-06-10",
      status: "规划中",
    },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "完成季度报告提案-Q1",
      project: "客户提案",
      dueDate: "2024-03-10",
      tags: ["工作", "文档"],
      priority: "高",
      department: "市场部",
      status: "进行中",
      description: "准备第一季度的业绩报告和下季度的预测分析",
      isCompleted: false,
      period: {
        type: "quarterly",
        interval: 1,
      },
      periodIndicator: "Q1",
      subtasks: [
        {
          id: "1-1",
          name: "收集数据",
          project: "客户提案",
          dueDate: "2024-03-08",
          tags: ["工作"],
          priority: "高",
          department: "市场部",
          status: "进行中",
          isCompleted: false,
          parentId: "1",
        },
        {
          id: "1-2",
          name: "制作图表",
          project: "客户提案",
          dueDate: "2024-03-09",
          tags: ["工作"],
          priority: "高",
          department: "市场部",
          status: "进行中",
          isCompleted: false,
          parentId: "1",
        },
      ],
    },
    {
      id: "2",
      name: "每周健康检查-W11",
      project: "健康",
      dueDate: "2024-03-15",
      tags: ["个人", "健康"],
      priority: "中",
      department: "人力资源部",
      status: "待办",
      description: "每周健康状况记录",
      isCompleted: false,
      period: {
        type: "weekly",
        interval: 1,
      },
      periodIndicator: "W11",
      subtasks: [
        {
          id: "2-1",
          name: "测量体重",
          project: "健康",
          dueDate: "2024-03-15",
          tags: ["个人"],
          priority: "中",
          department: "人力资源部",
          status: "待办",
          isCompleted: false,
          parentId: "2",
        },
        {
          id: "2-2",
          name: "记录血压",
          project: "健康",
          dueDate: "2024-03-15",
          tags: ["个人"],
          priority: "中",
          department: "人力资源部",
          status: "待办",
          isCompleted: false,
          parentId: "2",
        },
      ],
    },
    {
      id: "3",
      name: "季度财务审计-Q1",
      project: "财务",
      dueDate: "2024-03-31",
      tags: ["工作", "财务"],
      priority: "高",
      department: "财务部",
      status: "待办",
      description: "每季度财务审计和报告",
      isCompleted: false,
      period: {
        type: "quarterly",
        interval: 1,
      },
      periodIndicator: "Q1",
    },
    {
      id: "4",
      name: "每两周团队会议-W10",
      project: "管理",
      dueDate: "2024-03-20",
      tags: ["工作", "会议"],
      priority: "中",
      department: "管理部",
      status: "待办",
      description: "双周团队进度同步会议",
      isCompleted: false,
      period: {
        type: "weekly",
        interval: 2,
      },
      periodIndicator: "W10",
    },
  ])

  // 习惯数据
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "早起",
      icon: <Sun className="h-4 w-4" />,
      bgColor: "bg-yellow-50",
      color: "bg-yellow-400",
      count: 15,
      completedDays: [0, 3, 6],
    },
    {
      id: "2",
      name: "运动",
      icon: <Activity className="h-4 w-4" />,
      bgColor: "bg-orange-50",
      color: "bg-orange-400",
      count: 18,
      completedDays: [0, 2, 4, 6],
    },
    {
      id: "3",
      name: "买衣服",
      icon: <Calendar className="h-4 w-4" />,
      bgColor: "bg-blue-50",
      color: "bg-blue-400",
      count: 11,
      completedDays: [1, 5],
    },
    {
      id: "4",
      name: "维生素",
      icon: <Clock className="h-4 w-4" />,
      bgColor: "bg-purple-50",
      color: "bg-purple-400",
      count: 19,
      completedDays: [0, 1, 2, 3, 4],
    },
    {
      id: "5",
      name: "18:30后不喝水",
      icon: <Coffee className="h-4 w-4" />,
      bgColor: "bg-cyan-50",
      color: "bg-cyan-400",
      count: 10,
      completedDays: [2, 5, 6],
    },
    {
      id: "6",
      name: "早睡",
      icon: <Clock className="h-4 w-4" />,
      bgColor: "bg-red-50",
      color: "bg-red-400",
      count: 3,
      completedDays: [0],
    },
    {
      id: "7",
      name: "阅读",
      icon: <Calendar className="h-4 w-4" />,
      bgColor: "bg-green-50",
      color: "bg-green-400",
      count: 7,
      completedDays: [1, 3, 5],
    },
    {
      id: "8",
      name: "冥想",
      icon: <Activity className="h-4 w-4" />,
      bgColor: "bg-indigo-50",
      color: "bg-indigo-400",
      count: 5,
      completedDays: [2, 4],
    },
    {
      id: "9",
      name: "写日记",
      icon: <Calendar className="h-4 w-4" />,
      bgColor: "bg-pink-50",
      color: "bg-pink-400",
      count: 12,
      completedDays: [0, 3, 6],
    },
  ])

  // 处理任务双击编辑
  const handleTaskDoubleClick = (task: Task) => {
    setManagementPopoverTask(task)
    setIsManagementPopoverOpen(true)
  }

  // 处理任务保存
  const handleTaskSave = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  // 处理单个字段编辑
  const handleFieldEdit = (taskId: string, field: keyof Task, value: any) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, [field]: value } : task)))
  }

  const handleTaskToggle = (taskId: string, checked: boolean) => {
    // First, check if we've already processed this task to prevent duplicates
    if (checked && processedTasksRef.current.has(taskId)) {
      return
    }

    const updateTaskStatus = (task: Task): Task => {
      if (task.id === taskId) {
        // If this is a recurring task that's being completed, we need to generate a new task
        if (checked && task.period && !task.recurringProcessed) {
          const nextTask = generateNextRecurringTask(task)
          if (nextTask) {
            // Add this task ID to the processed set
            processedTasksRef.current.add(taskId)

            // Schedule the new task to be added in the next render cycle
            setTimeout(() => {
              setTasks((prev) => [...prev, nextTask])
            }, 0)
          }
        }

        return {
          ...task,
          isCompleted: checked,
          status: checked ? "已完成" : task.status === "已完成" ? "进行中" : task.status,
          // Mark this task as processed so we don't generate duplicates
          recurringProcessed: checked ? true : false,
          subtasks: task.subtasks?.map((subtask) => ({
            ...subtask,
            isCompleted: checked,
            status: checked ? "已完成" : subtask.status === "已完成" ? "进行中" : subtask.status,
          })),
        }
      }

      if (task.subtasks?.some((subtask) => subtask.id === taskId)) {
        const updatedSubtasks = task.subtasks.map((subtask) =>
          subtask.id === taskId
            ? {
                ...subtask,
                isCompleted: checked,
                status: checked ? "已完成" : subtask.status === "已完成" ? "进行中" : subtask.status,
              }
            : subtask,
        )

        const allSubtasksCompleted = updatedSubtasks.every((subtask) => subtask.isCompleted)
        return {
          ...task,
          isCompleted: allSubtasksCompleted,
          status: allSubtasksCompleted ? "已完成" : "进行中",
          subtasks: updatedSubtasks,
        }
      }

      return task
    }

    setTasks(tasks.map(updateTaskStatus))
  }

  // Update the generateNextRecurringTask function to handle period indicators and copy subtasks
  const generateNextRecurringTask = (task: Task) => {
    if (!task.period) return null

    const currentDate = new Date(task.dueDate)
    const nextDate = new Date(currentDate)
    let nextPeriodIndicator = ""

    switch (task.period.type) {
      case "daily":
        nextDate.setDate(currentDate.getDate() + task.period.interval)
        // Calculate day of year for daily tasks
        const startOfYear = new Date(nextDate.getFullYear(), 0, 0)
        const diff = nextDate.getTime() - startOfYear.getTime()
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
        nextPeriodIndicator = `D${dayOfYear}`
        break
      case "weekly":
        nextDate.setDate(currentDate.getDate() + task.period.interval * 7)
        // Calculate week number for weekly tasks
        if (task.periodIndicator && task.periodIndicator.startsWith("W")) {
          const currentWeek = Number.parseInt(task.periodIndicator.substring(1))
          nextPeriodIndicator = `W${currentWeek + task.period.interval}`
        } else {
          // If no existing indicator, calculate the week number
          const firstDayOfYear = new Date(nextDate.getFullYear(), 0, 1)
          const pastDaysOfYear = (nextDate.getTime() - firstDayOfYear.getTime()) / 86400000
          const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
          nextPeriodIndicator = `W${weekNumber}`
        }
        break
      case "monthly":
        nextDate.setMonth(currentDate.getMonth() + task.period.interval)
        // Calculate month number for monthly tasks
        if (task.periodIndicator && task.periodIndicator.startsWith("M")) {
          const currentMonth = Number.parseInt(task.periodIndicator.substring(1))
          nextPeriodIndicator = `M${(currentMonth % 12) + task.period.interval}`
        } else {
          nextPeriodIndicator = `M${nextDate.getMonth() + 1}`
        }
        break
      case "quarterly":
        nextDate.setMonth(currentDate.getMonth() + task.period.interval * 3)
        // Calculate quarter number for quarterly tasks
        if (task.periodIndicator && task.periodIndicator.startsWith("Q")) {
          const currentQuarter = Number.parseInt(task.periodIndicator.substring(1))
          nextPeriodIndicator = `Q${(currentQuarter % 4) + task.period.interval}`
        } else {
          const quarter = Math.floor(nextDate.getMonth() / 3) + 1
          nextPeriodIndicator = `Q${quarter}`
        }
        break
      case "yearly":
        nextDate.setFullYear(currentDate.getFullYear() + task.period.interval)
        // Use year for yearly tasks
        nextPeriodIndicator = `Y${nextDate.getFullYear()}`
        break
    }

    if (task.period.endDate && nextDate > new Date(task.period.endDate)) {
      return null
    }

    // Extract the base name without the period indicator
    let baseName = task.name
    if (task.periodIndicator) {
      baseName = task.name.replace(`-${task.periodIndicator}`, "")
    }

    // Generate a new task ID
    const newTaskId = `${task.id.split("-")[0]}-${Date.now()}`

    // Create new subtasks with updated IDs, parent reference, and dates
    const newSubtasks = task.subtasks?.map((subtask) => {
      // Calculate the difference in days between the parent task due date and the subtask due date
      const parentDate = new Date(task.dueDate)
      const subtaskDate = new Date(subtask.dueDate)
      const daysDifference = Math.round((subtaskDate.getTime() - parentDate.getTime()) / (1000 * 60 * 60 * 24))

      // Apply the same difference to the new parent task due date
      const newSubtaskDate = new Date(nextDate)
      newSubtaskDate.setDate(newSubtaskDate.getDate() + daysDifference)

      return {
        ...subtask,
        id: `${subtask.id.split("-")[0]}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        parentId: newTaskId,
        dueDate: newSubtaskDate.toISOString().split("T")[0],
        status: "待办",
        isCompleted: false,
      }
    })

    return {
      ...task,
      id: newTaskId,
      name: `${baseName}-${nextPeriodIndicator}`,
      dueDate: nextDate.toISOString().split("T")[0],
      status: "待办",
      isCompleted: false,
      recurringProcessed: false, // Reset the processed flag for the new task
      periodIndicator: nextPeriodIndicator,
      subtasks: newSubtasks,
    }
  }

  const handleDateClick = (task: Task) => {
    setDateEditTask(task)
    setIsDateEditDialogOpen(true)
  }

  const handleDateEdit = (taskId: string, newDate: string, comment: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, dueDate: newDate }
        }
        if (task.subtasks) {
          const updatedSubtasks = task.subtasks.map((subtask) =>
            subtask.id === taskId ? { ...subtask, dueDate: newDate } : subtask,
          )
          return { ...task, subtasks: updatedSubtasks }
        }
        return task
      }),
    )
    // Here you would typically send the comment to your backend or store it
    console.log(`Task ${taskId} date changed to ${newDate}. Comment: ${comment}`)
  }

  // Remove the useEffect that was causing the infinite loop
  // We now handle recurring tasks directly in the handleTaskToggle function

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "进行中":
        return "text-blue-500 border-blue-500"
      case "已完成":
        return "text-green-500 border-green-500"
      case "待处理":
      case "待办":
        return "text-yellow-500 border-yellow-500"
      default:
        return ""
    }
  }

  // First, let's add a helper function to format the period information
  const formatPeriodLabel = (period?: Task["period"]) => {
    if (!period) return null

    switch (period.type) {
      case "daily":
        return period.interval === 1 ? "每天" : `每${period.interval}天`
      case "weekly":
        return period.interval === 1 ? "每周" : `每${period.interval}周`
      case "monthly":
        return period.interval === 1 ? "每月" : `每${period.interval}月`
      case "yearly":
        return period.interval === 1 ? "每年" : `每${period.interval}年`
      case "quarterly":
        return period.interval === 1 ? "每季度" : `每${period.interval}季度`
      default:
        return "周期"
    }
  }

  // Add a useEffect to reset the processed tasks ref when tasks change
  useEffect(() => {
    // Only keep IDs that still exist in the tasks array
    const currentTaskIds = new Set(tasks.map((task) => task.id))
    const newProcessedTasks = new Set<string>()

    processedTasksRef.current.forEach((id) => {
      if (currentTaskIds.has(id)) {
        newProcessedTasks.add(id)
      }
    })

    processedTasksRef.current = newProcessedTasks
  }, [tasks])

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "全部" || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // 新增函数
  const handleNewTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
    setIsNewTaskDialogOpen(false)
  }

  const handleNewProject = (newProject: Project) => {
    setProjects([...projects, newProject])
    setIsNewProjectDialogOpen(false)
  }

  const handleNewHabit = (newHabit: Habit) => {
    setHabits([...habits, newHabit])
    setIsNewHabitDialogOpen(false)
  }

  // 修改 handleNewItemClick 函数
  const handleNewItemClick = () => {
    switch (view) {
      case "projects":
        setIsNewProjectDialogOpen(true)
        break
      case "habits":
        setIsNewHabitDialogOpen(true)
        break
      default:
        setIsNewTaskDialogOpen(true)
    }
  }

  const handleNewItemSave = (item: any) => {
    switch (newItemType) {
      case "task":
        setTasks([...tasks, item])
        break
      case "project":
        setProjects([...projects, item])
        break
      case "habit":
        // Assuming you have a setHabits function
        // setHabits([...habits, item])
        break
    }
    setIsNewItemDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={view === "tasks" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("tasks")}
            className="flex items-center gap-2"
          >
            <ListFilter className="h-4 w-4" />
            任务
          </Button>
          <Button
            variant={view === "projects" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("projects")}
            className="flex items-center gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            项目
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("calendar")}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            日历
          </Button>
          <Button
            variant={view === "priority" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("priority")}
            className="flex items-center gap-2"
          >
            <Star className="h-4 w-4" />
            优先级
          </Button>
          <Button
            variant={view === "habits" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("habits")}
            className="flex items-center gap-2"
          >
            <Activity className="h-4 w-4" />
            习惯
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            筛选
          </Button>
          <Button size="sm" className="flex items-center gap-2" onClick={handleNewItemClick}>
            + 新建{view === "projects" ? "项目" : view === "habits" ? "习惯" : "任务"}
          </Button>
        </div>
      </div>

      {/* 项目视图 */}
      {view === "projects" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {project.category}
                    </Badge>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>进度</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      {project.tasks.completed}/{project.tasks.total} 任务
                    </span>
                    <span>{project.members} 成员</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>截止: {project.dueDate}</span>
                    <Badge variant="outline">{project.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 任务列表视图 */}
      {view === "tasks" && (
        <div className="border rounded-lg overflow-hidden">
          <div className="max-h-[calc(100vh-220px)] overflow-auto">
            <table className="w-full">
              {/* Updated table header */}
              <thead className="sticky top-0 z-10 bg-background">
                <tr className="border-b bg-muted/50">
                  {/* Remove the checkbox column */}
                  <th className="text-left p-2 font-medium">
                    <div className="flex items-center gap-2">
                      {/* 新增加号按钮移到最前面 */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setIsNewTaskDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground">任务</span>
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder=""
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="h-6 w-6 pl-7 pr-2 text-xs bg-muted/50 focus:w-[120px] transition-all duration-300"
                        />
                      </div>
                      <Select
                        value={statusFilter}
                        onValueChange={(value) => setStatusFilter(value as TaskStatus | "全部")}
                      >
                        <SelectTrigger className="h-6 w-[100px] text-xs bg-muted/50 border-0">
                          <SelectValue placeholder="所有状态" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="全部">所有状态</SelectItem>
                          <SelectItem value="进行中">进行中</SelectItem>
                          <SelectItem value="已完成">已完成</SelectItem>
                          <SelectItem value="待处理">待处理</SelectItem>
                          <SelectItem value="待办">待办</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </th>
                  <th className="text-center p-2 font-medium">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs text-muted-foreground">项目</span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </th>
                  <th className="text-center p-2 font-medium">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs text-muted-foreground">截止日期</span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </th>
                  <th className="text-center p-2 font-medium">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs text-muted-foreground">标签</span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </th>
                  <th className="text-center p-2 font-medium">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs text-muted-foreground">优先级</span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </th>
                  <th className="text-center p-2 font-medium">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs text-muted-foreground">部门</span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <TaskCheckbox task={task} onToggle={handleTaskToggle} />
                          <span
                            className="text-sm font-medium cursor-pointer"
                            onDoubleClick={() => handleTaskDoubleClick(task)}
                          >
                            {task.name}
                          </span>
                          <Badge variant="outline" className={`${getStatusColor(task.status)} text-xs px-1 py-0`}>
                            {task.status}
                          </Badge>
                          {task.period && (
                            <Badge variant="outline" className="text-purple-500 border-purple-500 text-xs px-1 py-0">
                              {formatPeriodLabel(task.period)}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-sm text-center">
                        <FieldEditPopover
                          field="project"
                          value={task.project}
                          onSave={(value) => handleFieldEdit(task.id, "project", value)}
                        >
                          <div className="flex justify-center items-center h-full">{task.project}</div>
                        </FieldEditPopover>
                      </td>
                      <td className="p-2 text-sm text-center">
                        <div
                          className="flex justify-center items-center h-full cursor-pointer group"
                          onClick={() => handleDateClick(task)}
                        >
                          <span>{task.dueDate}</span>
                          <Edit className="h-4 w-4 ml-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <FieldEditPopover
                          field="tags"
                          value={task.tags}
                          onSave={(value) => handleFieldEdit(task.id, "tags", value)}
                        >
                          <div className="flex gap-1 flex-wrap justify-center items-center h-full">
                            {task.tags.map((tag) => {
                              const colors = getTagColors(tag)
                              return (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className={`${colors.bg} ${colors.text} border ${colors.border} text-xs px-1 py-0`}
                                >
                                  {tag}
                                </Badge>
                              )
                            })}
                          </div>
                        </FieldEditPopover>
                      </td>
                      <td className="p-2 text-center">
                        <FieldEditPopover
                          field="priority"
                          value={task.priority}
                          options={["高", "中", "低"]}
                          onSave={(value) => handleFieldEdit(task.id, "priority", value)}
                        >
                          <div className="flex justify-center items-center h-full">
                            <Badge
                              variant="outline"
                              className={`${getPriorityStyles(task.priority as keyof typeof priorityColors)} text-xs px-1 py-0`}
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        </FieldEditPopover>
                      </td>
                      <td className="p-2 text-center">
                        <FieldEditPopover
                          field="department"
                          value={task.department}
                          onSave={(value) => handleFieldEdit(task.id, "department", value)}
                        >
                          <div className="flex justify-center items-center h-full">
                            <Badge variant="outline" className={`${getDepartmentStyles()} text-xs px-1 py-0`}>
                              {task.department}
                            </Badge>
                          </div>
                        </FieldEditPopover>
                      </td>
                    </tr>
                    {/* Subtasks */}
                    {task.subtasks?.map((subtask) => (
                      <tr key={subtask.id} className="border-b bg-gray-50 hover:bg-gray-100">
                        <td className="p-1 pl-6">
                          <div className="flex items-center gap-1">
                            <TaskCheckbox task={subtask} onToggle={handleTaskToggle} />
                            <span
                              className="text-xs cursor-pointer"
                              onDoubleClick={() => handleTaskDoubleClick(subtask)}
                            >
                              {subtask.name}
                            </span>
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(subtask.status)} text-[10px] px-1 py-0`}
                            >
                              {subtask.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-1 text-xs text-center">
                          <div className="flex justify-center items-center h-full">{subtask.project}</div>
                        </td>
                        <td className="p-1 text-xs text-center">
                          <div
                            className="flex justify-center items-center h-full cursor-pointer group"
                            onClick={() => handleDateClick(subtask)}
                          >
                            <span>{subtask.dueDate}</span>
                            <Edit className="h-3 w-3 ml-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex gap-1 flex-wrap justify-center items-center h-full">
                            {subtask.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-[10px] px-1 py-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex justify-center items-center h-full">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[10px] px-1 py-0",
                                getPriorityStyles(subtask.priority as keyof typeof priorityColors),
                              )}
                            >
                              {subtask.priority}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-1 text-center">
                          <div className="flex justify-center items-center h-full">
                            <Badge variant="outline" className={cn("text-[10px] px-1 py-0", getDepartmentStyles())}>
                              {subtask.department}
                            </Badge>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 优先级视图 */}
      {view === "priority" && (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">重要且紧急</CardTitle>
              <p className="text-sm text-muted-foreground">需要立即关注和处理的任务</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="font-medium">完成季度报告</div>
                <div className="text-sm text-muted-foreground">3/8 △</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="font-medium">修复网站关键错误</div>
                <div className="text-sm text-muted-foreground">3/9 △</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-500">重要但不紧急</CardTitle>
              <p className="text-sm text-muted-foreground">需要规划和安排时间处理的任务</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium">制定年度战略计划</div>
                <div className="text-sm text-muted-foreground">4/15</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium">学习新技能</div>
                <div className="text-sm text-muted-foreground">3/30</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-yellow-500">紧急但不重要</CardTitle>
              <p className="text-sm text-muted-foreground">可以考虑委派给他人的任务</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium">回复邮件</div>
                <div className="text-sm text-muted-foreground">3/8 △</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="font-medium">团队会议</div>
                <div className="text-sm text-muted-foreground">3/10 △</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-500">既不重要也不紧急</CardTitle>
              <p className="text-sm text-muted-foreground">可以考虑删减或最后处理的任务</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium">整理文件</div>
                <div className="text-sm text-muted-foreground">3/20</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium">浏览行业新闻</div>
                <div className="text-sm text-muted-foreground">3/25</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 日历视图 */}
      {view === "calendar" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle>{format(new Date(), "yyyy年MM月", { locale: zhCN })}</CardTitle>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              + 添加任务
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px bg-muted">
              {["周日", "周一", "周二", "周三", "周四", "周五", "周六"].map((day) => (
                <div key={day} className="bg-background p-3 text-center text-sm font-medium">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="bg-background p-3 min-h-[100px] relative">
                  <span className="text-sm text-muted-foreground">{i + 1}</span>
                  {/* 示例事件 */}
                  {i === 9 && <div className="mt-1 p-1 text-xs bg-blue-50 text-blue-700 rounded">10:00 团队会议</div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 习惯培养视图 - 改为多列紧凑布局 */}
      {view === "habits" && (
        <div className="space-y-4">
          {/* 统计数据 - 更紧凑的布局 */}
          <div className="grid grid-cols-4 gap-3">
            <Card className="p-3">
              <div className="text-2xl font-bold">19</div>
              <div className="text-xs text-gray-500">事件总数</div>
            </Card>
            <Card className="p-3">
              <div className="text-2xl font-bold">90</div>
              <div className="text-xs text-gray-500">记录次数</div>
            </Card>
            <Card className="p-3">
              <div className="text-2xl font-bold">23</div>
              <div className="text-xs text-gray-500">使用天数</div>
            </Card>
            <Card className="p-3">
              <div className="text-2xl font-bold">27</div>
              <div className="text-xs text-gray-500">记录天数</div>
            </Card>
          </div>

          {/* 视图切换 */}
          <Tabs defaultValue="week" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-gray-100">
              <TabsTrigger value="week" className="rounded-full">
                周
              </TabsTrigger>
              <TabsTrigger value="month" className="rounded-full">
                月
              </TabsTrigger>
            </TabsList>

            <TabsContent value="week" className="mt-4">
              {/* 周视图标签 */}
              <div className="flex justify-between text-xs text-gray-500 px-1 mb-2">
                <span>一</span>
                <span>二</span>
                <span>三</span>
                <span>四</span>
                <span>五</span>
                <span>六</span>
                <span>日</span>
              </div>

              {/* 习惯列表 - 周视图 - 更多列更紧凑 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {habits.map((habit) => (
                  <div key={habit.id} className="space-y-1 p-2 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button className={`p-1.5 rounded-full ${habit.bgColor} hover:opacity-80 transition-opacity`}>
                          <div className="text-current">{habit.icon}</div>
                        </button>
                        <span className="text-sm font-medium truncate">{habit.name}</span>
                      </div>
                      <div className="text-xs text-gray-500">x{habit.count}</div>
                    </div>
                    <div className="flex rounded-full overflow-hidden bg-gray-100 w-full h-4">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-full flex-1 ${habit.completedDays.includes(i) ? habit.color : "bg-transparent"} ${i > 0 ? "border-l border-white" : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="month" className="mt-4">
              {/* 月份导航 */}
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium">{format(new Date(), "yyyy年MM月", { locale: zhCN })}</span>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* 习惯列表 - 月视图 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {habits.slice(0, 6).map((habit) => (
                  <div key={habit.id} className="space-y-2 p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className={`p-2 rounded-full ${habit.bgColor} hover:opacity-80 transition-opacity`}>
                          <div className="text-current">{habit.icon}</div>
                        </button>
                        <span className="font-medium">{habit.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">x{habit.count}</div>
                    </div>
                    <div className="flex rounded-full overflow-hidden bg-gray-100 w-full h-5">
                      {Array.from({ length: 31 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-full flex-1 ${i % 3 === 0 ? habit.color : "bg-transparent"} ${i > 0 ? "border-l border-white" : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* 任务编辑对话框 */}
      <TaskEditDialog
        task={editingTask}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleTaskSave}
      />
      <TaskManagementPopover
        task={managementPopoverTask}
        open={isManagementPopoverOpen}
        onOpenChange={setIsManagementPopoverOpen}
        onSave={handleTaskSave}
      />

      {/* 新增新建任务对话框 */}
      <NewTaskDialog
        open={isNewTaskDialogOpen}
        onOpenChange={setIsNewTaskDialogOpen}
        onSave={handleNewTask}
        projects={projects}
        departments={departments}
        tags={allTags}
      />
      <NewProjectDialog
        open={isNewItemDialogOpen && newItemType === "project"}
        onOpenChange={setIsNewItemDialogOpen}
        onSave={handleNewItemSave}
      />
      <NewHabitDialog
        open={isNewItemDialogOpen && newItemType === "habit"}
        onOpenChange={setIsNewItemDialogOpen}
        onSave={handleNewItemSave}
      />
      <NewProjectDialog
        open={isNewProjectDialogOpen}
        onOpenChange={setIsNewProjectDialogOpen}
        onSave={handleNewProject}
      />
      <NewHabitDialog open={isNewHabitDialogOpen} onOpenChange={setIsNewHabitDialogOpen} onSave={handleNewHabit} />
      <DateEditDialog
        task={dateEditTask}
        open={isDateEditDialogOpen}
        onOpenChange={setIsDateEditDialogOpen}
        onSave={handleDateEdit}
      />
    </div>
  )
}

export default TaskViews

