import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

type TagColorMapping = {
  [key: string]: {
    bg: string
    text: string
    border: string
  }
}

export const tagColors: TagColorMapping = {
  工作: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  文档: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  个人: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  健康: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
  },
  会议: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  财务: {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    border: "border-cyan-200",
  },
}

export const getTagColors = (tag: string) => {
  // 根据标签第一个字符匹配颜色
  const key = Object.keys(tagColors).find((k) => tag.startsWith(k))
  return key
    ? tagColors[key]
    : {
        bg: "bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-200",
      }
}

// 修改 priorityColors 对象，使其更接近部门样式
export const priorityColors = {
  高: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: "text-red-500",
  },
  中: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    icon: "text-yellow-500",
  },
  低: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    icon: "text-green-500",
  },
}

// 更新 getPriorityStyles 函数，使其返回与部门样式类似的格式
export const getPriorityStyles = (priority: keyof typeof priorityColors) => {
  const colors = priorityColors[priority]
  return `${colors.bg} ${colors.text} ${colors.border}`
}

export const getDepartmentStyles = () => {
  return "bg-blue-100 text-blue-700 border-blue-200"
}

export const departmentStyle = "bg-blue-50 text-blue-700 border-blue-200"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

