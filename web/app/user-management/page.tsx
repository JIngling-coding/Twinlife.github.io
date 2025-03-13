"use client"
import { UserManagement } from "@/components/user-management"

export default function UserManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">用户管理</h1>
      <UserManagement />
    </div>
  )
}

