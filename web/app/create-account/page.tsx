"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChromeIcon as Google, Mail, Phone, Apple } from "lucide-react"
import Link from "next/link"

export default function CreateAccountPage() {
  const [accountType, setAccountType] = useState<"phone" | "email">("phone")

  return (
    <div className="container mx-auto max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle>创建账号</CardTitle>
          <CardDescription>请选择创建账号的方式</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {accountType === "phone" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">手机号</Label>
                <Input id="phone" placeholder="请输入手机号" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">验证码</Label>
                <div className="flex space-x-2">
                  <Input id="code" placeholder="请输入验证码" />
                  <Button variant="outline">获取验证码</Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input id="email" type="email" placeholder="请输入邮箱" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input id="password" type="password" placeholder="请输入密码" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认密码</Label>
                <Input id="confirmPassword" type="password" placeholder="请再次输入密码" />
              </div>
            </>
          )}
          <Button className="w-full">创建账号</Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">或</span>
            </div>
          </div>
          {accountType === "phone" ? (
            <Button variant="outline" className="w-full" onClick={() => setAccountType("email")}>
              <Mail className="mr-2 h-4 w-4" /> 使用邮箱创建账号
            </Button>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setAccountType("phone")}>
              <Phone className="mr-2 h-4 w-4" /> 使用手机号创建账号
            </Button>
          )}
          <Button variant="outline" className="w-full">
            <Google className="mr-2 h-4 w-4" /> 使用Google账号创建
          </Button>
          <Button variant="outline" className="w-full">
            <Apple className="mr-2 h-4 w-4" /> 使用Apple账号创建
          </Button>
          <div className="text-center text-sm">
            已有账号？{" "}
            <Link href="/" className="text-primary">
              返回登录
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

