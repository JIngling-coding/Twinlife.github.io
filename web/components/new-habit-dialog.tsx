"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sun, Moon, Star, Heart, Activity } from "lucide-react"

interface NewHabitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (habit: any) => void
}

export function NewHabitDialog({ open, onOpenChange, onSave }: NewHabitDialogProps) {
  const [newHabit, setNewHabit] = useState({
    name: "",
    icon: "Sun",
    bgColor: "bg-yellow-50",
    color: "bg-yellow-400",
  })

  const handleChange = (field: string, value: string) => {
    setNewHabit({ ...newHabit, [field]: value })
  }

  const handleSave = () => {
    onSave({
      id: `habit-${Date.now()}`,
      ...newHabit,
      count: 0,
      completedDays: [],
    })
    setNewHabit({
      name: "",
      icon: "Sun",
      bgColor: "bg-yellow-50",
      color: "bg-yellow-400",
    })
  }

  const iconComponents = {
    Sun: Sun,
    Moon: Moon,
    Star: Star,
    Heart: Heart,
    Activity: Activity,
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新建习惯</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              习惯名称
            </Label>
            <Input
              id="name"
              value={newHabit.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right">
              图标
            </Label>
            <Select value={newHabit.icon} onValueChange={(value) => handleChange("icon", value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择图标" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(iconComponents).map(([name, Icon]) => (
                  <SelectItem key={name} value={name}>
                    <div className="flex items-center">
                      <Icon className="mr-2 h-4 w-4" />
                      {name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              颜色
            </Label>
            <Select
              value={newHabit.color}
              onValueChange={(value) => {
                handleChange("color", value)
                handleChange("bgColor", value.replace("400", "50"))
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择颜色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bg-yellow-400">黄色</SelectItem>
                <SelectItem value="bg-blue-400">蓝色</SelectItem>
                <SelectItem value="bg-green-400">绿色</SelectItem>
                <SelectItem value="bg-red-400">红色</SelectItem>
                <SelectItem value="bg-purple-400">紫色</SelectItem>
              </SelectContent>
            </Select>
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

