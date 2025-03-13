import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, Zap, Shield, Globe } from "lucide-react"

const features = [
  {
    name: "功能一",
    description: "这里描述功能一的详细信息，后续可以根据具体需求进行修改。",
    icon: Layers,
  },
  {
    name: "功能二",
    description: "这里描述功能二的详细信息，后续可以根据具体需求进行修改。",
    icon: Zap,
  },
  {
    name: "功能三",
    description: "这里描述功能三的详细信息，后续可以根据具体需求进行修改。",
    icon: Shield,
  },
  {
    name: "功能四",
    description: "这里描述功能四的详细信息，后续可以根据具体需求进行修改。",
    icon: Globe,
  },
]

export default function Features() {
  return (
    <section className="py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">核心功能</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            这里是对网站核心功能的简要介绍，后续可以根据具体需求进行修改和完善。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.name} className="h-full">
                <CardHeader>
                  <feature.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="mt-4">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

