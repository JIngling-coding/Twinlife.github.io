import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between">
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} 双生世界. 保留所有权利.
          </p>
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            隐私政策
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            使用条款
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            联系我们
          </Link>
        </div>
      </div>
    </footer>
  )
}

