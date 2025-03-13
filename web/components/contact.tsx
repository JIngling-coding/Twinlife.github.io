import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Contact() {
  return (
    <section className="py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">联系我们</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            如果您有任何问题或建议，请随时与我们联系。我们将尽快回复您。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>发送消息</CardTitle>
              <CardDescription>填写下面的表单，我们会尽快与您联系。</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6">
                      姓名
                    </label>
                    <div className="mt-2.5">
                      <Input type="text" name="first-name" id="first-name" autoComplete="given-name" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold leading-6">
                      电子邮箱
                    </label>
                    <div className="mt-2.5">
                      <Input type="email" name="email" id="email" autoComplete="email" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold leading-6">
                      消息
                    </label>
                    <div className="mt-2.5">
                      <Textarea name="message" id="message" rows={4} />
                    </div>
                  </div>
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    发送
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

