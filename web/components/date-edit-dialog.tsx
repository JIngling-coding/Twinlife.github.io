"use client"

import { useState, useEffect, type KeyboardEvent } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Task } from "@/types/task"

interface DateEditDialogProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (taskId: string, newDate: string, comment: string) => void
}

export function DateEditDialog({ task, open, onOpenChange, onSave }: DateEditDialogProps) {
  const [date, setDate] = useState<Date | undefined>(task ? new Date(task.dueDate) : undefined)
  const [comment, setComment] = useState("")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  useEffect(() => {
    if (task) {
      setDate(new Date(task.dueDate))
    }
  }, [task])

  const handleSave = () => {
    if (task && date) {
      onSave(task.id, format(date, "yyyy/MM/dd"), comment)
      onOpenChange(false)
      setComment("")
      setIsCalendarOpen(false)
    }
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setIsCalendarOpen(false) // Close the calendar when a date is selected
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSave()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle>修改截止日期</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">新截止日期</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  onClick={() => setIsCalendarOpen(true)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "yyyy/MM/dd") : <span>选择日期</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment">修改备注</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="请输入修改原因"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={!date || !comment}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

