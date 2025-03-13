"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns"
import { zhCN } from "date-fns/locale"
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  Activity,
  Shirt,
  Pill,
  Coffee,
  Carrot,
  Bed,
  Home,
  BarChart2,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 习惯类型
type Habit = {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  count: number
}

// 习惯记录类型
type HabitRecord = {
  id: string
  habitId: string
  date: Date
  timestamp: number
}

// 统计数据类型
type Stats = {
  totalEvents: number
  totalRecords: number
  usageDays: number
  recordDays: number
}

export function HabitHeatmap() {
  // 当前选择的月份
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // 习惯列表
  const habits: Habit[] = [
    {
      id: "1",
      name: "早起",
      icon: <Sun className="h-5 w-5" />,
      color: "bg-yellow-400",
      bgColor: "bg-yellow-50",
      count: 15,
    },
    {
      id: "2",
      name: "运动",
      icon: <Activity className="h-5 w-5" />,
      color: "bg-orange-400",
      bgColor: "bg-orange-50",
      count: 18,
    },
    {
      id: "3",
      name: "买衣服",
      icon: <Shirt className="h-5 w-5" />,
      color: "bg-blue-400",
      bgColor: "bg-blue-50",
      count: 11,
    },
    {
      id: "4",
      name: "维生素",
      icon: <Pill className="h-5 w-5" />,
      color: "bg-purple-400",
      bgColor: "bg-purple-50",
      count: 19,
    },
    {
      id: "5",
      name: "18:30后不喝水",
      icon: <Coffee className="h-5 w-5" />,
      color: "bg-cyan-400",
      bgColor: "bg-cyan-50",
      count: 10,
    },
    {
      id: "6",
      name: "晚8点后不进食",
      icon: <Carrot className="h-5 w-5" />,
      color: "bg-red-400",
      bgColor: "bg-red-50",
      count: 8,
    },
    {
      id: "7",
      name: "早睡",
      icon: <Bed className="h-5 w-5" />,
      color: "bg-blue-400",
      bgColor: "bg-blue-50",
      count: 3,
    },
  ]

  // 习惯记录
  const [habitRecords, setHabitRecords] = useState<HabitRecord[]>(() => {
    const savedRecords = localStorage.getItem("habitRecords")
    return savedRecords ? JSON.parse(savedRecords) : []
  })

  // 统计数据
  const stats: Stats = {
    totalEvents: 19,
    totalRecords: 90,
    usageDays: 23,
    recordDays: 27,
  }

  // 当记录变化时保存到本地存储
  useEffect(() => {
    localStorage.setItem("habitRecords", JSON.stringify(habitRecords))
  }, [habitRecords])

  // 切换到上个月
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // 切换到下个月
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // 记录习惯完成
  const recordHabit = (habitId: string) => {
    const today = new Date()
    const existingRecord = habitRecords.find(
      (record) => record.habitId === habitId && isSameDay(new Date(record.date), today),
    )

    if (existingRecord) {
      setHabitRecords(habitRecords.filter((record) => record.id !== existingRecord.id))
    } else {
      const newRecord: HabitRecord = {
        id: `${habitId}-${today.getTime()}`,
        habitId,
        date: today,
        timestamp: today.getTime(),
      }
      setHabitRecords([...habitRecords, newRecord])
    }
  }

  // 获取某个习惯在某天是否完成
  const isHabitCompleted = (habitId: string, date: Date) => {
    return habitRecords.some((record) => record.habitId === habitId && isSameDay(new Date(record.date), date))
  }

  // 获取当月的所有日期
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  return (
    <div className="space-y-6">
      {/* 统计数据 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-3xl font-bold">{stats.totalEvents}</div>
          <div className="text-sm text-gray-500">事件总数</div>
        </Card>
        <Card className="p-4">
          <div className="text-3xl font-bold">{stats.totalRecords}</div>
          <div className="text-sm text-gray-500">记录次数</div>
        </Card>
        <Card className="p-4">
          <div className="text-3xl font-bold">{stats.usageDays}</div>
          <div className="text-sm text-gray-500">使用天数</div>
        </Card>
        <Card className="p-4">
          <div className="text-3xl font-bold">{stats.recordDays}</div>
          <div className="text-sm text-gray-500">记录天数</div>
        </Card>
      </div>

      {/* 视图切换 */}
      <Tabs defaultValue="month" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-full bg-gray-100">
          <TabsTrigger value="week" className="rounded-full">
            周
          </TabsTrigger>
          <TabsTrigger value="month" className="rounded-full">
            月
          </TabsTrigger>
          <TabsTrigger value="year" className="rounded-full">
            年
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 月份导航 */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-lg font-medium">{format(currentMonth, "yyyy年MM月", { locale: zhCN })}</span>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* 习惯列表 */}
      <div className="space-y-8">
        {habits.map((habit) => (
          <div key={habit.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* 习惯图标按钮 */}
                <button
                  onClick={() => recordHabit(habit.id)}
                  className={`p-3 rounded-full ${habit.bgColor} hover:opacity-80 transition-opacity`}
                >
                  <div className={`text-${habit.color.split("-")[1]}-500`}>{habit.icon}</div>
                </button>
                {/* 习惯名称 */}
                <span className="font-medium">{habit.name}</span>
              </div>
              {/* 完成次数 */}
              <div className="text-sm text-gray-500">x{habit.count}</div>
            </div>

            {/* 打卡记录 */}
            <div className="flex gap-1">
              <div className="flex rounded-full overflow-hidden bg-gray-100 w-full h-6">
                {daysInMonth.map((day) => {
                  const isCompleted = isHabitCompleted(habit.id, day)
                  return (
                    <div
                      key={day.toString()}
                      className={`h-full w-[3px] ${isCompleted ? habit.color : "bg-transparent"}`}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white py-2">
        <div className="container flex justify-around">
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <Home className="h-5 w-5" />
            <span className="text-xs">主页</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-900">
            <BarChart2 className="h-5 w-5" />
            <span className="text-xs">趋势</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <Settings className="h-5 w-5" />
            <span className="text-xs">设置</span>
          </button>
        </div>
      </div>
    </div>
  )
}

