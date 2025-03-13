"use client"

import { useState, type ReactNode } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface FieldEditPopoverProps {
  children: ReactNode
  field: string
  value: any
  options?: string[]
  onSave: (value: any) => void
}

export function FieldEditPopover({ children, field, value, options, onSave }: FieldEditPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [newTag, setNewTag] = useState("")

  const handleSave = () => {
    onSave(editValue)
    setIsOpen(false)
  }

  const handleAddTag = () => {
    if (newTag.trim() && !editValue.includes(newTag.trim())) {
      setEditValue([...editValue, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setEditValue(editValue.filter((t: string) => t !== tag))
  }

  const renderEditContent = () => {
    // 日期编辑
    if (field === "dueDate") {
      return (
        <div className="grid gap-2">
          <Label htmlFor="date-edit">截止日期</Label>
          <Input id="date-edit" type="date" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
        </div>
      )
    }

    // 标签编辑
    if (field === "tags") {
      return (
        <div className="grid gap-2">
          <Label>标签</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {editValue.map((tag: string) => (
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
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    }

    // 下拉选择编辑（优先级、状态）
    if (options) {
      return (
        <div className="grid gap-2">
          <Label htmlFor="select-edit">{field === "priority" ? "优先级" : field === "status" ? "状态" : field}</Label>
          <Select value={editValue} onValueChange={setEditValue}>
            <SelectTrigger>
              <SelectValue placeholder={`选择${field}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }

    // 默认文本编辑
    return (
      <div className="grid gap-2">
        <Label htmlFor="text-edit">{field === "project" ? "项目" : field === "department" ? "部门" : field}</Label>
        <Input id="text-edit" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
      </div>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        {renderEditContent()}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
            取消
          </Button>
          <Button size="sm" onClick={handleSave}>
            保存
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

