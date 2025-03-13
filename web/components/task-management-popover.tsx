"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Task } from "@/types/task"
import { getTagColors } from "@/utils/tag-colors"
import { cn, getPriorityStyles, getDepartmentStyles } from "@/utils/tag-colors"

interface TaskManagementPopoverProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updatedTask: Task) => void
}

const priorityColors = {
  高: { icon: "text-red-500" },
  中: { icon: "text-yellow-500" },
  低: { icon: "text-green-500" },
}

export function TaskManagementPopover({ task, open, onOpenChange, onSave }: TaskManagementPopoverProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(null)
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    setEditedTask(task)
  }, [task])

  if (!editedTask) return null

  const handleChange = (field: keyof Task, value: any) => {
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
    onSave(editedTask)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>任务管理</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">任务名称</Label>
            <Input id="name" value={editedTask.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={editedTask.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
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
              {editedTask.tags.map((tag) => {
                const colors = getTagColors(tag)
                return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`flex items-center gap-1 ${colors.bg} ${colors.text} border ${colors.border}`}
                  >
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                  </Badge>
                )
              })}
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
                  <SelectValue placeholder="选择优先级">
                    <Badge
                      variant="outline"
                      className={getPriorityStyles(editedTask.priority as keyof typeof priorityColors)}
                    >
                      {editedTask.priority}
                    </Badge>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {["高", "中", "低"].map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      <Badge variant="outline" className={getPriorityStyles(priority as keyof typeof priorityColors)}>
                        {priority}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">状态</Label>
              <Select
                value={editedTask.status}
                onValueChange={(value) => handleChange("status", value as Task["status"])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="进行中">进行中</SelectItem>
                  <SelectItem value="已完成">已完成</SelectItem>
                  <SelectItem value="待处理">待处理</SelectItem>
                  <SelectItem value="待办">待办</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="department">部门</Label>
            <div className="relative">
              <Input
                id="department"
                value={editedTask.department}
                onChange={(e) => handleChange("department", e.target.value)}
                className={cn("pl-2 pr-2 h-9 rounded-md border", getDepartmentStyles())}
              />
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

