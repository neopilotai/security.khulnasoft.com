"use client"

// English: Responsive site header with brand, nav, and theme toggle.
import Link from "next/link"
import { Shield, Menu, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ModeToggle from "@/components/mode-toggle"

const nav = [
  { href: "/vulnerabilities", label: "Vulnerabilities" },
  { href: "/advisories", label: "Advisories" },
  { href: "/malware", label: "Malware" },
  { href: "/exploitdb", label: "Exploit" },
  { href: "/taxonomy-explorer", label: "Supply Chain" },
  { href: "/resources", label: "Threat Intel" },
  { href: "/labs", label: "Labs" },
  { href: "/api-docs", label: "API" },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#030712]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10">
            <Shield className="size-4 text-cyan-300" aria-hidden="true" />
          </div>
          <Link href="/" className="hidden font-semibold tracking-tight text-white sm:block">
            KhulnaSoft <span className="text-slate-500">Security OS</span>
          </Link>
        </div>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 overflow-hidden xl:flex">
          {nav.map((item) => (
            <Link key={`${item.href}-${item.label}`} href={item.href} className="whitespace-nowrap text-xs font-medium text-slate-500 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white" aria-label="Search"><Search className="size-4" /></Button>
          <Button variant="ghost" size="icon" className="hidden text-slate-500 hover:text-white sm:inline-flex" aria-label="Notifications"><Bell className="size-4" /></Button>
          <ModeToggle />
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-2 xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="mt-6 flex flex-col gap-4">
                {nav.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-foreground">
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
