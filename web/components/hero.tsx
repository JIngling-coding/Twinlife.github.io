import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">双生世界</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            这里是网站的主要宣传语，描述网站的核心价值和服务内容。后续可以根据具体需求进行修改和完善。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/get-started">开始使用</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/learn-more">了解更多</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

