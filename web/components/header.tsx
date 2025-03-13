"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, Settings, User, LogOut, UserCog } from "lucide-react"
import { useSidebarStore } from "@/store/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { isExpanded, toggle } = useSidebarStore()
  const router = useRouter()

  const handleLogin = () => {
    router.push("/login")
  }

  const handleAccountManagement = () => {
    router.push("/account-management")
  }

  return (
    <header className="flex h-14 items-center border-b bg-white px-4">
      <div className="flex items-center">
        <button onClick={toggle} className="rounded-full p-1 hover:bg-gray-100">
          <ChevronLeft
            className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${!isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        <h1 className="ml-3 font-semibold text-2xl tracking-wide text-black">双生世界: 人生管理系统</h1>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <Settings className="mr-1 h-5 w-5" />
          <span>普通模式</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
              <User className="mr-1 h-5 w-5" />
              <span>用户</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onSelect={handleLogin}>
              <User className="mr-2 h-4 w-4" />
              <span>登录账号</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleAccountManagement}>
              <UserCog className="mr-2 h-4 w-4" />
              <span>账号管理</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出账号</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

