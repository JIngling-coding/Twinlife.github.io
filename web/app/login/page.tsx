"use client"

import { LoginDialog } from "@/components/login-dialog"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="h-full flex items-center justify-center">
      <LoginDialog
        open={true}
        onOpenChange={(open) => {
          if (!open) {
            router.push("/")
          }
        }}
      />
    </div>
  )
}

