"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, HelpCircle, Phone } from "lucide-react"

// 还原的微信图标
const WechatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.49.49 0 0 1 .177-.554C23.36 18.115 24.4 16.432 24.4 14.55c0-3.162-3.19-5.692-7.462-5.692zm-2.464 2.896c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.842 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
  </svg>
)

// 优化后的谷歌图标
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

// 保持优化后的苹果图标
const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 12.536c-.037-3.155 2.582-4.649 2.697-4.723-1.469-2.144-3.752-2.437-4.565-2.466-1.94-.197-3.79 1.146-4.774 1.146-.981 0-2.498-1.12-4.105-1.088-2.117.032-4.062 1.231-5.15 3.125-2.193 3.802-.561 9.435 1.575 12.514 1.045 1.512 2.29 3.21 3.926 3.15 1.575-.06 2.169-1.018 4.072-1.018 1.903 0 2.443 1.018 4.11.984 1.697-.03 2.773-1.54 3.814-3.056 1.201-1.756 1.695-3.457 1.724-3.544-.038-.018-3.307-1.268-3.337-5.024h-.013zM14.413 3.756c.868-1.053 1.454-2.513 1.293-3.968-1.25.05-2.765.834-3.659 1.887-.804.932-1.508 2.421-1.317 3.85 1.394.11 2.816-.716 3.683-1.769z" />
  </svg>
)

export function LoginDialog() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [phoneLoginMethod, setPhoneLoginMethod] = useState<"code" | "password">("code")
  const [emailLoginMethod, setEmailLoginMethod] = useState<"code" | "password">("code")

  const LoginContent = ({
    type,
    loginMethod,
    setLoginMethod,
  }: {
    type: "phone" | "email"
    loginMethod: "code" | "password"
    setLoginMethod: (method: "code" | "password") => void
  }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={type} className="text-sm font-medium">
          {type === "phone" ? "手机号" : "邮箱"}
        </Label>
        {type === "phone" ? (
          <div className="flex">
            <Select defaultValue="+86">
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="区号" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+86">+86 中国</SelectItem>
                <SelectItem value="+1">+1 美国</SelectItem>
                <SelectItem value="+44">+44 英国</SelectItem>
                <SelectItem value="+81">+81 日本</SelectItem>
                <SelectItem value="+82">+82 韩国</SelectItem>
                <SelectItem value="+61">+61 澳大利亚</SelectItem>
                <SelectItem value="+49">+49 德国</SelectItem>
                <SelectItem value="+33">+33 法国</SelectItem>
                <SelectItem value="+39">+39 意大利</SelectItem>
                <SelectItem value="+7">+7 俄罗斯</SelectItem>
              </SelectContent>
            </Select>
            <Input id="phone" placeholder="请输入手机号" className="flex-1 ml-2" />
          </div>
        ) : (
          <Input id="email" type="email" placeholder="请输入邮箱" />
        )}
      </div>
      {loginMethod === "code" ? (
        <div className="space-y-2">
          <Label htmlFor="code" className="text-sm font-medium">
            验证码
          </Label>
          <div className="flex space-x-2">
            <Input id="code" placeholder="请输入验证码" />
            <Button variant="outline" size="sm">
              获取验证码
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            密码
          </Label>
          <Input id="password" type="password" placeholder="请输入密码" />
        </div>
      )}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Checkbox id={`remember-${type}`} />
          <label htmlFor={`remember-${type}`} className="text-muted-foreground">
            记住密码
          </label>
        </div>
        <Button
          variant="link"
          className="p-0 h-auto text-sm"
          onClick={() => window.location.href = '/reset-password'}
        >
          忘记密码？
        </Button>
      </div>
      <Button className="w-full">登录</Button>
      <div className="flex justify-between items-center text-sm">
        <Button
          variant="link"
          className="p-0 h-auto"
          onClick={() => setLoginMethod(loginMethod === "code" ? "password" : "code")}
        >
          {loginMethod === "code" ? "使用密码登录" : "使用验证码登录"}
        </Button>
        <Button variant="link" className="p-0 h-auto flex items-center">
          <HelpCircle className="h-4 w-4 mr-1" />
          需要帮助？
        </Button>
      </div>
    </div>
  )

  return (
    <div className="bg-background rounded-lg border shadow-lg w-[400px] p-6">
      <h2 className="text-2xl font-semibold text-center mb-2">欢迎来到 Twinlife</h2>
      <p className="text-center text-sm text-muted-foreground mb-4">未创建账号，经验证后自动注册</p>
      <Tabs defaultValue="phone" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="phone" className="flex items-center justify-center">
            <Phone className="w-4 h-4 mr-2" />
            手机号登录
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center justify-center">
            <Mail className="w-4 h-4 mr-2" />
            邮箱登录
          </TabsTrigger>
        </TabsList>
        <TabsContent value="phone">
          <LoginContent type="phone" loginMethod={phoneLoginMethod} setLoginMethod={setPhoneLoginMethod} />
        </TabsContent>
        <TabsContent value="email">
          <LoginContent type="email" loginMethod={emailLoginMethod} setLoginMethod={setEmailLoginMethod} />
        </TabsContent>
      </Tabs>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">其他登录方式</span>
        </div>
      </div>
      <div className="flex justify-center space-x-6">
        <div className="flex flex-col items-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full mb-2 p-0 h-10 w-10 text-[#07C160] hover:text-white hover:bg-[#07C160]"
          >
            <WechatIcon />
          </Button>
          <span className="text-xs text-muted-foreground">微信</span>
        </div>
        <div className="flex flex-col items-center">
          <Button variant="outline" size="icon" className="rounded-full mb-2 p-0 h-10 w-10">
            <GoogleIcon />
          </Button>
          <span className="text-xs text-muted-foreground">谷歌账号</span>
        </div>
        <div className="flex flex-col items-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full mb-2 p-0 h-10 w-10 text-black dark:text-white hover:text-black hover:bg-black/10 dark:hover:text-white dark:hover:bg-white/10"
          >
            <AppleIcon />
          </Button>
          <span className="text-xs text-muted-foreground">苹果账号</span>
        </div>
      </div>
    </div>
  )
}

