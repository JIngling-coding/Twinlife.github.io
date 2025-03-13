"use client"
import { Checkbox } from "@/components/ui/checkbox"
import type { Task } from "@/types/task"

interface TaskCheckboxProps {
  task: Task
  onToggle: (taskId: string, checked: boolean) => void
}

export function TaskCheckbox({ task, onToggle }: TaskCheckboxProps) {
  const handleCheckedChange = (checked: boolean) => {
    // Prevent the default behavior if the task is already completed
    if (task.isCompleted && checked) {
      return
    }

    onToggle(task.id, checked)
  }

  return (
    <Checkbox checked={task.isCompleted} onCheckedChange={handleCheckedChange} aria-label={`完成任务: ${task.name}`} />
  )
}

