'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { isValidEmail, isValidPhone } from '@/lib/validators'

/**
 * 找回密码页面
 */
export default function ResetPasswordPage() {
  const [accountType, setAccountType] = useState<'phone' | 'email'>('phone')
  const [step, setStep] = useState<'verify' | 'reset'>('verify')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const { toast } = useToast()

  // 表单数据
  const [formData, setFormData] = useState({
    target: '',
    code: '',
    newPassword: '',
    confirmPassword: '',
  })

  /**
   * 发送验证码
   */
  const handleSendCode = async () => {
    try {
      // 验证账号格式
      if (accountType === 'email' && !isValidEmail(formData.target)) {
        toast({ title: '错误', description: '邮箱格式不正确', variant: 'destructive' })
        return
      }
      if (accountType === 'phone' && !isValidPhone(formData.target)) {
        toast({ title: '错误', description: '手机号格式不正确', variant: 'destructive' })
        return
      }

      setLoading(true)
      const res = await fetch('/api/auth/reset/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: accountType,
          target: formData.target,
          action: 'reset'
        })
      })

      const data = await res.json()
      if (!data.success) {
        throw new Error(data.message)
      }

      toast({ title: '成功', description: '验证码已发送' })

      // 开始倒计时
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error: any) {
      toast({ title: '错误', description: error.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  /**
   * 验证验证码
   */
  const handleVerifyCode = async () => {
    try {
      if (!formData.code) {
        toast({ title: '错误', description: '请输入验证码', variant: 'destructive' })
        return
      }

      setLoading(true)
      const res = await fetch('/api/auth/reset/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: accountType,
          target: formData.target,
          code: formData.code
        })
      })

      const data = await res.json()
      if (!data.success) {
        throw new Error(data.message)
      }

      // 进入重置密码步骤
      setStep('reset')
    } catch (error: any) {
      toast({ title: '错误', description: error.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  /**
   * 重置密码
   */
  const handleResetPassword = async () => {
    try {
      // 验证密码
      if (!formData.newPassword) {
        toast({ title: '错误', description: '请输入新密码', variant: 'destructive' })
        return
      }
      if (formData.newPassword.length < 8) {
        toast({ title: '错误', description: '密码长度不能小于8位', variant: 'destructive' })
        return
      }
      if (formData.newPassword !== formData.confirmPassword) {
        toast({ title: '错误', description: '两次输入的密码不一致', variant: 'destructive' })
        return
      }

      setLoading(true)
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: accountType,
          target: formData.target,
          code: formData.code,
          newPassword: formData.newPassword
        })
      })

      const data = await res.json()
      if (!data.success) {
        throw new Error(data.message)
      }

      toast({ title: '成功', description: '密码重置成功' })

      // 跳转到登录页
      window.location.href = '/login'
    } catch (error: any) {
      toast({ title: '错误', description: error.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-md py-8">
      <Card>
        <CardHeader>
          <CardTitle>找回密码</CardTitle>
          <CardDescription>
            {step === 'verify' ? '请输入您的账号，我们将向您发送验证码' : '请设置新密码'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'verify' ? (
            <>
              <RadioGroup
                value={accountType}
                onValueChange={(value: 'phone' | 'email') => setAccountType(value)}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="phone" id="phone" className="peer sr-only" />
                  <Label
                    htmlFor="phone"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    手机号
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="email" id="email" className="peer sr-only" />
                  <Label
                    htmlFor="email"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    邮箱
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="target">
                  {accountType === 'phone' ? '手机号' : '邮箱'}
                </Label>
                <Input
                  id="target"
                  type={accountType === 'email' ? 'email' : 'tel'}
                  placeholder={`请输入${accountType === 'phone' ? '手机号' : '邮箱'}`}
                  value={formData.target}
                  onChange={e => setFormData(prev => ({ ...prev, target: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">验证码</Label>
                <div className="flex space-x-2">
                  <Input
                    id="code"
                    placeholder="请输入验证码"
                    value={formData.code}
                    onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  />
                  <Button
                    variant="outline"
                    onClick={handleSendCode}
                    disabled={loading || countdown > 0}
                  >
                    {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleVerifyCode}
                disabled={loading}
              >
                下一步
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="newPassword">新密码</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="请输入新密码"
                  value={formData.newPassword}
                  onChange={e => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认密码</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="请再次输入新密码"
                  value={formData.confirmPassword}
                  onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleResetPassword}
                disabled={loading}
              >
                重置密码
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 