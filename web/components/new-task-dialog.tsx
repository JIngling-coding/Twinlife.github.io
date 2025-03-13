"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Task, Project } from "@/types/task"
import { Calendar } from "@/components/ui/calendar"

interface NewTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: Task) => void
  projects: Project[]
  departments: string[]
  tags: string[]
}

export function NewTaskDialog({ open, onOpenChange, onSave, projects, departments, tags }: NewTaskDialogProps) {
  const [newTask, setNewTask] = useState<Partial<Task>>({
    name: "",
    project: "",
    dueDate: "",
    tags: [],
    priority: "中",
    department: "",
    status: "待办",
    description: "",
  })
  const [newTag, setNewTag] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringType, setRecurringType] = useState<"每天" | "每周" | "每两周" | "每月" | "每季度" | "每年">("每周")
  const [recurringTime, setRecurringTime] = useState("09:00")
  const [recurringDay, setRecurringDay] = useState<number>(1)
  const [recurringDayOfWeek, setRecurringDayOfWeek] = useState<number>(1)
  const [recurringDate, setRecurringDate] = useState<Date | undefined>(undefined)
  const [isEditingYear, setIsEditingYear] = useState(false)
  const [editingYear, setEditingYear] = useState("")
  const yearInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: keyof Task, value: any) => {
    setNewTask({ ...newTask, [field]: value })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !newTask.tags?.includes(newTag.trim())) {
      setNewTask({
        ...newTask,
        tags: [...(newTask.tags || []), newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setNewTask({
      ...newTask,
      tags: newTask.tags?.filter((t) => t !== tag) || [],
    })
  }

  const handleSave = () => {
    if (newTask.name && newTask.project && newTask.dueDate) {
      const taskToSave: Task = {
        id: `task-${Date.now()}`,
        ...newTask,
        tags: newTask.tags || [],
        isCompleted: false,
      } as Task

      if (isRecurring) {
        const periodTypeMap = {
          每天: "daily",
          每周: "weekly",
          每两周: "biweekly",
          每月: "monthly",
          每季度: "quarterly",
          每年: "yearly",
        }

        const [hours, minutes] = recurringTime.split(":").map(Number)

        taskToSave.period = {
          type: periodTypeMap[recurringType] as "daily" | "weekly" | "biweekly" | "monthly" | "quarterly" | "yearly",
          interval: recurringType === "每两周" ? 2 : 1,
          dayOfWeek: recurringType === "每周" || recurringType === "每两周" ? recurringDayOfWeek : undefined,
          dayOfMonth: recurringType === "每月" ? recurringDay : undefined,
          time: `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
        }

        if (recurringType === "每季度" && recurringDate) {
          taskToSave.period.dayOfMonth = recurringDate.getDate()
          taskToSave.period.month = recurringDate.getMonth() % 3 // 确保月份在 0-2 之间
        } else if (recurringType === "每年" && recurringDate) {
          taskToSave.period.dayOfMonth = recurringDate.getDate()
          taskToSave.period.month = recurringDate.getMonth()
        }
      }

      onSave(taskToSave)
      setNewTask({
        name: "",
        project: "",
        dueDate: "",
        tags: [],
        priority: "中",
        department: "",
        status: "待办",
        description: "",
      })
      setIsRecurring(false)
      setRecurringType("每周")
      setRecurringDay(1)
      setRecurringDayOfWeek(1)
      setRecurringTime("09:00")
      setRecurringDate(undefined)
    }
  }

  const handleYearDoubleClick = () => {
    setIsEditingYear(true)
    setEditingYear(recurringDate ? recurringDate.getFullYear().toString() : new Date().getFullYear().toString())
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingYear(e.target.value)
  }

  const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const year = Number.parseInt(editingYear, 10)
      if (!isNaN(year) && year > 0) {
        const newDate = new Date(recurringDate || new Date())
        newDate.setFullYear(year)
        setRecurringDate(newDate)
      }
      setIsEditingYear(false)
    }
  }

  useEffect(() => {
    if (isEditingYear && yearInputRef.current) {
      yearInputRef.current.focus()
    }
  }, [isEditingYear])

  const CustomCalendarHeader = ({ date, ...props }: { date: Date }) => {
    return (
      <div className="flex justify-center items-center py-2">
        {isEditingYear ? (
          <input
            ref={yearInputRef}
            type="number"
            value={editingYear}
            onChange={handleYearChange}
            onKeyDown={handleYearKeyDown}
            onBlur={() => setIsEditingYear(false)}
            className="w-16 text-center border rounded"
          />
        ) : (
          <span onDoubleClick={handleYearDoubleClick} className="cursor-pointer">
            {format(date, "yyyy")}
          </span>
        )}
        <span className="ml-2">{format(date, "MMMM")}</span>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>新建任务</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">
                任务名称
              </Label>
              <Input
                id="name"
                value={newTask.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="project" className="text-xs">
                项目
              </Label>
              <Select value={newTask.project} onValueChange={(value) => handleChange("project", value)}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="选择项目" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="dueDate" className="text-xs">
                截止日期
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full h-8 justify-start text-left font-normal",
                      !newTask.dueDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newTask.dueDate ? format(new Date(newTask.dueDate), "PP") : <span>选择日期</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newTask.dueDate ? new Date(newTask.dueDate) : undefined}
                    onSelect={(date) => handleChange("dueDate", date?.toISOString().split("T")[0])}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-1">
              <Label htmlFor="priority" className="text-xs">
                优先级
              </Label>
              <Select value={newTask.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="选择优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="高">高</SelectItem>
                  <SelectItem value="中">中</SelectItem>
                  <SelectItem value="低">低</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="department" className="text-xs">
              部门
            </Label>
            <Select value={newTask.department} onValueChange={(value) => handleChange("department", value)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="选择部门" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="tags" className="text-xs">
              标签
            </Label>
            <div className="flex flex-wrap gap-1 mb-1">
              {newTask.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs py-0 h-5">
                  {tag}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                </Badge>
              ))}
            </div>
            <Select
              value=""
              onValueChange={(value) => {
                if (value === "new") {
                  // Handle new tag creation
                } else {
                  handleChange("tags", [...(newTask.tags || []), value])
                }
              }}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="选择或新建标签" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
                <SelectItem value="new">
                  <span className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    新建标签
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="recurring"
              checked={isRecurring}
              onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
            />
            <Label htmlFor="recurring" className="text-sm">
              周期任务
            </Label>
          </div>
          {isRecurring && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">重复类型</Label>
                <RadioGroup
                  value={recurringType}
                  onValueChange={(value) => setRecurringType(value as typeof recurringType)}
                  className="grid grid-cols-3 gap-2"
                >
                  {["每天", "每周", "每两周", "每月", "每季度", "每年"].map((type) => (
                    <div key={type} className="flex items-center space-x-1">
                      <RadioGroupItem value={type} id={type} />
                      <Label htmlFor={type} className="text-xs">
                        {type}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {recurringType === "每天" && (
                <div className="space-y-1">
                  <Label className="text-xs">时间</Label>
                  <Input
                    type="time"
                    value={recurringTime}
                    onChange={(e) => setRecurringTime(e.target.value)}
                    className="h-8 w-full"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {(recurringType === "每周" || recurringType === "每两周") && (
                  <div className="space-y-1">
                    <Label className="text-xs">周期日</Label>
                    <Select
                      value={recurringDayOfWeek.toString()}
                      onValueChange={(value) => setRecurringDayOfWeek(Number.parseInt(value))}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="选择重复日" />
                      </SelectTrigger>
                      <SelectContent>
                        {["周日", "周一", "周二", "周三", "周四", "周五", "周六"].map((day, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {recurringType === "每月" && (
                  <div className="space-y-1">
                    <Label className="text-xs">每月日期</Label>
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      value={recurringDay}
                      onChange={(e) => setRecurringDay(Number.parseInt(e.target.value))}
                      placeholder="每月几号"
                      className="h-8"
                    />
                  </div>
                )}

                {(recurringType === "每季度" || recurringType === "每年") && (
                  <div className="space-y-1">
                    <Label className="text-xs">{recurringType === "每季度" ? "每季度日期" : "每年日期"}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-8 justify-start text-left font-normal",
                            !recurringDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {recurringDate ? format(recurringDate, "yyyy-MM-dd") : <span>选择日期</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={recurringDate}
                          onSelect={setRecurringDate}
                          initialFocus
                          components={{
                            Header: CustomCalendarHeader,
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                <div className="space-y-1">
                  <Label className="text-xs">结束日期（可选）</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-8 justify-start text-left font-normal",
                          !newTask.period?.endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTask.period?.endDate ? (
                          format(new Date(newTask.period.endDate), "yyyy-MM-dd")
                        ) : (
                          <span>选择结束日期</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newTask.period?.endDate ? new Date(newTask.period.endDate) : undefined}
                        onSelect={(date) =>
                          handleChange("period", {
                            ...newTask.period,
                            endDate: date ? date.toISOString().split("T")[0] : undefined,
                          })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="description" className="text-xs">
              描述
            </Label>
            <Textarea
              id="description"
              value={newTask.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={2}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave} className="w-full">
            创建
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

