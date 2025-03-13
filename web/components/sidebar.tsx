"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  User,
  Coffee,
  Zap,
  PlayCircle,
  Brain,
  FileText,
  RotateCcw,
  Lightbulb,
  UserCog,
  Building2,
  Settings,
} from "lucide-react"
import { useSidebarStore } from "@/store/sidebar"

const menuItems = [
  { name: "首页", href: "/", icon: Home, iconColor: "text-[#4A9EFF]" },
  { name: "人生管理", href: "/life", icon: User, iconColor: "text-[#9F7AEA]" },
  { name: "生活管理", href: "/daily", icon: Coffee, iconColor: "text-[#F56565]" },
  { name: "能量管理", href: "/energy", icon: Zap, iconColor: "text-[#ECC94B]" },
  { name: "行动管理", href: "/action", icon: PlayCircle, iconColor: "text-[#48BB78]" },
  { name: "清空大脑", href: "/brain", icon: Brain, iconColor: "text-[#F56565]" },
  { name: "知识管理", href: "/knowledge", icon: FileText, iconColor: "text-[#ED8936]" },
  { name: "复盘管理", href: "/review", icon: RotateCcw, iconColor: "text-[#4A9EFF]" },
  { name: "创造管理", href: "/create", icon: Lightbulb, iconColor: "text-[#48BB78]" },
]

const bottomMenuItems = [
  { name: "个人设置", href: "/personal", icon: UserCog, iconColor: "text-[#6B7280]" },
  { name: "公司管理", href: "/company", icon: Building2, iconColor: "text-[#6B7280]" },
  { name: "系统设置", href: "/settings", icon: Settings, iconColor: "text-[#6B7280]" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isExpanded } = useSidebarStore()

  return (
    <aside
      className={`border-r bg-white transition-all duration-300 flex flex-col ${isExpanded ? "w-[133px]" : "w-[40px]"}`}
    >
      <nav className="flex flex-col py-2 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${isExpanded ? "px-3" : "justify-center"} py-3 text-sm transition-colors ${
                isActive ? "bg-[#E3F2FD] text-[#4A9EFF]" : "text-gray-700 hover:bg-[#E3F2FD] hover:text-[#4A9EFF]"
              }`}
              title={item.name}
            >
              <item.icon className={`${isExpanded ? "mr-2" : ""} h-5 w-5 ${item.iconColor}`} />
              {isExpanded && <span className="truncate">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* 分隔线 */}
      <div className="border-t border-gray-200 mx-2"></div>

      {/* 底部菜单项 */}
      <div className="mt-1 mb-2">
        {bottomMenuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${isExpanded ? "px-3" : "justify-center"} py-3 text-sm transition-colors ${
                isActive ? "bg-[#E3F2FD] text-[#4A9EFF]" : "text-gray-700 hover:bg-[#E3F2FD] hover:text-[#4A9EFF]"
              }`}
              title={item.name}
            >
              <item.icon className={`${isExpanded ? "mr-2" : ""} h-5 w-5 ${item.iconColor}`} />
              {isExpanded && <span className="truncate">{item.name}</span>}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

