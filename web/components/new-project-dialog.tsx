"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Project } from "@/types/project" // You might need to create this type

interface NewProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (project: Project) => void
}

export function NewProjectDialog({ open, onOpenChange, onSave }: NewProjectDialogProps) {
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    category: "",
    description: "",
    status: "规划中",
  })

  const handleChange = (field: keyof Project, value: any) => {
    setNewProject({ ...newProject, [field]: value })
  }

  const handleSave = () => {
    if (newProject.name && newProject.category) {
      onSave({
        id: `project-${Date.now()}`,
        ...newProject,
        progress: 0,
        tasks: { total: 0, completed: 0 },
        members: 0,
        dueDate: new Date().toISOString().split("T")[0], // Set to current date as default
      } as Project)
      setNewProject({
        name: "",
        category: "",
        description: "",
        status: "规划中",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新建项目</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              项目名称
            </Label>
            <Input
              id="name"
              value={newProject.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              类别
            </Label>
            <Input
              id="category"
              value={newProject.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              状态
            </Label>
            <Select value={newProject.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="规划中">规划中</SelectItem>
                <SelectItem value="进行中">进行中</SelectItem>
                <SelectItem value="已完成">已完成</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              描述
            </Label>
            <Textarea
              id="description"
              value={newProject.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            创建
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

