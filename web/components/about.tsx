import Image from "next/image"

export default function About() {
  return (
    <section className="py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">关于我们</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                这里是关于网站或公司的详细介绍，可以包括创立背景、发展历程、团队情况等内容。后续可以根据具体需求进行修改和完善。
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                这里可以继续补充更多关于网站或公司的信息，以便用户更全面地了解网站或公司的情况。
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="关于我们"
              width={500}
              height={500}
              className="rounded-xl shadow-xl ring-1 ring-gray-400/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

