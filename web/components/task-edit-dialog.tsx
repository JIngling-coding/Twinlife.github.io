"use client"

import { useState } from "react"
import { X, PlusCircle, Trash } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { Task, TaskPeriod } from "@/types/task"

// 任务类型
type TaskType = {
  id: string
  name: string
  project: string
  dueDate: string
  tags: string[]
  priority: "高" | "中" | "低"
  department: string
  status: "进行中" | "已完成" | "待处理"
  description?: string
  period?: TaskPeriod
  subtasks?: Task[]
  periodIndicator?: string
}

interface TaskEditDialogProps {
  task: TaskType | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: TaskType) => void
}

export function TaskEditDialog({ task, open, onOpenChange, onSave }: TaskEditDialogProps) {
  const [editedTask, setEditedTask] = useState<TaskType | null>(task)
  const [newTag, setNewTag] = useState("")

  if (!editedTask) return null

  const handleChange = (field: keyof TaskType, value: any) => {
    setEditedTask({ ...editedTask, [field]: value })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !editedTask.tags.includes(newTag.trim())) {
      setEditedTask({
        ...editedTask,
        tags: [...editedTask.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setEditedTask({
      ...editedTask,
      tags: editedTask.tags.filter((t) => t !== tag),
    })
  }

  const handleSave = () => {
    // If this is a recurring task, ensure the period indicator is in the name
    if (editedTask.period && editedTask.periodIndicator) {
      // Extract the base name without any existing period indicator
      let baseName = editedTask.name
      if (editedTask.periodIndicator) {
        const regex = new RegExp(`-${editedTask.periodIndicator}$`)
        baseName = editedTask.name.replace(regex, "")
      }

      // Add the period indicator to the name
      editedTask.name = `${baseName}-${editedTask.periodIndicator}`
    }

    onSave(editedTask)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>编辑任务</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">任务名称</Label>
            <Input id="name" value={editedTask.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="project">项目</Label>
              <Input
                id="project"
                value={editedTask.project}
                onChange={(e) => handleChange("project", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">截止日期</Label>
              <Input
                id="dueDate"
                type="date"
                value={editedTask.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>标签</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {editedTask.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="添加新标签"
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              />
              <Button type="button" onClick={handleAddTag} size="sm">
                添加
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="priority">优先级</Label>
              <Select value={editedTask.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="高">高</SelectItem>
                  <SelectItem value="中">中</SelectItem>
                  <SelectItem value="低">低</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">状态</Label>
              <Select value={editedTask.status} onValueChange={(value) => handleChange("status", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="进行中">进行中</SelectItem>
                  <SelectItem value="已完成">已完成</SelectItem>
                  <SelectItem value="待处理">待处理</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="department">部门</Label>
            <Input
              id="department"
              value={editedTask.department}
              onChange={(e) => handleChange("department", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={editedTask.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label>周期设置</Label>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={!!editedTask.period}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleChange("period", { type: "daily", interval: 1 })
                    } else {
                      handleChange("period", undefined)
                    }
                  }}
                />
                <Label>设为周期任务</Label>
              </div>

              {editedTask.period && (
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={editedTask.period.type}
                    onValueChange={(value) =>
                      handleChange("period", { ...editedTask.period, type: value as TaskPeriod["type"] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择周期类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">每天</SelectItem>
                      <SelectItem value="weekly">每周</SelectItem>
                      <SelectItem value="monthly">每月</SelectItem>
                      <SelectItem value="quarterly">每季度</SelectItem>
                      <SelectItem value="yearly">每年</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2">
                    <span>每隔</span>
                    <Input
                      type="number"
                      min="1"
                      value={editedTask.period.interval}
                      onChange={(e) =>
                        handleChange("period", {
                          ...editedTask.period,
                          interval: Number.parseInt(e.target.value) || 1,
                        })
                      }
                      className="w-20"
                    />
                    <span>
                      {editedTask.period.type === "daily" && "天"}
                      {editedTask.period.type === "weekly" && "周"}
                      {editedTask.period.type === "monthly" && "月"}
                      {editedTask.period.type === "quarterly" && "季度"}
                      {editedTask.period.type === "yearly" && "年"}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <Label>周期标识</Label>
                    <Input
                      value={editedTask.periodIndicator || ""}
                      onChange={(e) => handleChange("periodIndicator", e.target.value)}
                      placeholder={
                        editedTask.period.type === "daily"
                          ? "D123"
                          : editedTask.period.type === "weekly"
                            ? "W12"
                            : editedTask.period.type === "monthly"
                              ? "M3"
                              : editedTask.period.type === "quarterly"
                                ? "Q2"
                                : "Y2024"
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      例如: 每周任务使用 W12 表示第12周, 每月任务使用 M3 表示3月
                    </p>
                  </div>

                  <div className="col-span-2">
                    <Label>结束日期（可选）</Label>
                    <Input
                      type="date"
                      value={editedTask.period?.endDate || ""}
                      onChange={(e) =>
                        handleChange("period", {
                          ...editedTask.period,
                          endDate: e.target.value || undefined,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>子任务</Label>
            <div className="space-y-2">
              {editedTask.subtasks?.map((subtask, index) => (
                <div key={subtask.id} className="flex items-center space-x-2">
                  <Input
                    value={subtask.name}
                    onChange={(e) => {
                      const newSubtasks = [...(editedTask.subtasks || [])]
                      newSubtasks[index] = { ...subtask, name: e.target.value }
                      handleChange("subtasks", newSubtasks)
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newSubtasks = editedTask.subtasks?.filter((_, i) => i !== index)
                      handleChange("subtasks", newSubtasks)
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  const newSubtask: Task = {
                    id: `subtask-${Date.now()}`,
                    name: "",
                    project: editedTask.project,
                    dueDate: editedTask.dueDate,
                    tags: [],
                    priority: "中",
                    department: editedTask.department,
                    status: "待办",
                    isCompleted: false,
                    parentId: editedTask.id,
                  } as any
                  handleChange("subtasks", [...(editedTask.subtasks || []), newSubtask])
                }}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                添加子任务
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

