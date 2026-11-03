"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Bug,
  ChevronRight,
  Clock3,
  Code2,
  Database,
  ExternalLink,
  Flame,
  GitBranch,
  Globe2,
  Layers3,
  LockKeyhole,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  TrendingUp,
  Workflow,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const feeds = [
  { kind: "CVE", title: "CVE-2024-3094 · XZ Utils backdoor", detail: "Supply chain compromise", time: "2m ago", tone: "critical" },
  { kind: "EXPLOIT", title: "PoC added · GitLab CI runner escape", detail: "Public exploit intelligence", time: "8m ago", tone: "high" },
  { kind: "MALWARE", title: "npm package cluster detected", detail: "Credential stealer family", time: "14m ago", tone: "medium" },
  { kind: "ADVISORY", title: "OpenSSF scorecard update", detail: "Maintainer risk signal", time: "21m ago", tone: "info" },
]

const modules = [
  { title: "Vulnerabilities", description: "CVE intelligence, severity trends, and affected ecosystems.", icon: Bug, href: "/vulnerabilities", metric: "2,847 tracked" },
  { title: "Threat Intelligence", description: "IOCs, campaigns, actors, and observed techniques.", icon: Radar, href: "/resources", metric: "126 active signals" },
  { title: "Malware", description: "Families, packages, hashes, and behavioral fingerprints.", icon: Flame, href: "/malware", metric: "438 families" },
  { title: "Exploits", description: "Exploit maturity, PoCs, and offensive technique context.", icon: TerminalSquare, href: "/exploitdb", metric: "913 public PoCs" },
  { title: "Supply Chain", description: "Package risk, maintainer trust, and dependency exposure.", icon: GitBranch, href: "/taxonomy-explorer", metric: "18,392 packages" },
  { title: "Security Labs", description: "Hands-on learning paths for modern application security.", icon: BrainCircuit, href: "/taxonomy-explorer", metric: "24 learning tracks" },
]

const stats = [
  { label: "Vulnerabilities tracked", value: "2,847", change: "+12.4%", icon: Bug },
  { label: "High-risk packages", value: "126", change: "+8.1%", icon: AlertTriangle },
  { label: "Active malware families", value: "438", change: "+4.6%", icon: Flame },
  { label: "References indexed", value: "12.6k", change: "+18.2%", icon: Database },
]

const heatmap = [
  { name: "npm", score: 82, risk: "Elevated", packages: "4,821" },
  { name: "PyPI", score: 74, risk: "Elevated", packages: "3,406" },
  { name: "Maven", score: 58, risk: "Moderate", packages: "2,994" },
  { name: "RubyGems", score: 41, risk: "Moderate", packages: "1,144" },
  { name: " crates.io", score: 36, risk: "Monitored", packages: "816" },
]

function toneClass(tone: string) {
  return tone === "critical" ? "text-red-300 bg-red-400/10 border-red-400/20" : tone === "high" ? "text-orange-300 bg-orange-400/10 border-orange-400/20" : tone === "medium" ? "text-yellow-200 bg-yellow-400/10 border-yellow-400/20" : "text-sky-200 bg-sky-400/10 border-sky-400/20"
}

export default function IntelligenceHome() {
  const [query, setQuery] = useState("")
  const [activeFeed, setActiveFeed] = useState("All activity")
  const filteredFeeds = useMemo(() => feeds.filter((feed) => `${feed.kind} ${feed.title} ${feed.detail}`.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100">
      <div className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden border-x border-white/[0.06] px-4 pb-16 pt-10 sm:px-8 lg:px-12 lg:pt-16">
          <div className="pointer-events-none absolute inset-0 intelligence-grid opacity-50" />
          <div className="pointer-events-none absolute -left-24 top-0 size-[420px] rounded-full bg-blue-600/10 blur-[110px]" />
          <div className="pointer-events-none absolute right-0 top-12 size-[320px] rounded-full bg-cyan-400/10 blur-[100px]" />
          <div className="relative grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/80"><span className="size-2 animate-pulse rounded-full bg-cyan-300" /> Live security intelligence</div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">See the attack surface<br /><span className="text-slate-500">before it sees you.</span></h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">A living intelligence layer for vulnerabilities, malware, exploits, and open-source supply chain risk.</p>
              <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-xl border border-white/10 bg-slate-950/80 p-2 shadow-2xl shadow-blue-950/30 focus-within:border-cyan-300/40">
                <Search className="ml-3 size-5 text-slate-500" />
                <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search CVE, package, hash, IOC..." className="h-11 min-w-0 flex-1 border-0 bg-transparent text-slate-100 placeholder:text-slate-600 focus-visible:ring-0" />
                <kbd className="hidden rounded-md border border-white/10 px-2 py-1 text-[10px] text-slate-500 sm:block">⌘ K</kbd>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500"><span>Try:</span>{["CVE-2024-3094", "xz-utils", "npm malware", "SLSA"].map((item) => <button key={item} onClick={() => setQuery(item)} className="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-cyan-300/40 hover:text-cyan-200">{item}</button>)}</div>
            </div>
            <div className="relative hidden lg:block">
              <div className="rounded-2xl border border-cyan-300/15 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
                <div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-medium"><Activity className="size-4 text-cyan-300" /> Global signal monitor</div><Badge className="border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">Operational</Badge></div>
                <div className="flex h-36 items-end gap-2 border-b border-l border-white/10 px-3 pb-0 pt-4">{[28, 42, 36, 58, 49, 71, 64, 88, 76, 94, 82, 100, 91, 96].map((height, index) => <div key={index} className="group relative flex-1 rounded-t-sm bg-gradient-to-t from-blue-600/30 to-cyan-300/80 transition hover:from-blue-500/70" style={{ height: `${height}%` }} />)}</div>
                <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-slate-600"><span>00:00 UTC</span><span>Now</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, change, icon: Icon }) => <div key={label} className="bg-slate-950/90 p-5"><div className="flex items-center justify-between"><span className="text-xs text-slate-500">{label}</span><Icon className="size-4 text-slate-600" /></div><div className="mt-3 flex items-baseline gap-2"><span className="text-2xl font-semibold tracking-tight text-white">{value}</span><span className="text-xs text-emerald-300">{change}</span></div><div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-300" /></div></div>)}
        </section>

        <section className="mt-12"><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300/70">Intelligence modules</p><h2 className="mt-2 text-2xl font-semibold text-white">Know what matters now</h2></div><Link href="/resources" className="hidden items-center gap-1 text-sm text-slate-400 transition hover:text-white sm:flex">Explore all <ArrowUpRight className="size-4" /></Link></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{modules.map(({ title, description, icon: Icon, href, metric }) => <Link key={title} href={href} className="group"><Card className="h-full border-white/[0.08] bg-slate-950/70 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-slate-900"><CardHeader><div className="flex items-start justify-between"><div className="rounded-lg border border-cyan-300/10 bg-cyan-300/5 p-2.5 text-cyan-300"><Icon className="size-5" /></div><ChevronRight className="size-4 text-slate-700 transition group-hover:translate-x-1 group-hover:text-cyan-300" /></div><CardTitle className="mt-3 text-base text-white">{title}</CardTitle><CardDescription className="leading-6 text-slate-500">{description}</CardDescription></CardHeader><CardContent><div className="flex items-center gap-2 text-xs text-cyan-200/70"><span className="size-1.5 rounded-full bg-cyan-300" />{metric}</div></CardContent></Card></Link>)}</div></section>

        <section className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><Card className="border-white/[0.08] bg-slate-950/70"><CardHeader className="flex-row items-center justify-between"><div><CardTitle className="text-base text-white">Live intelligence feed</CardTitle><CardDescription className="text-slate-500">Signals are updated as new intelligence arrives.</CardDescription></div><Button variant="ghost" size="sm" className="text-slate-400 hover:text-white"><Clock3 className="mr-2 size-4" />Last 24h</Button></CardHeader><CardContent><div className="mb-4 flex gap-2 overflow-x-auto pb-1">{["All activity", "CVE", "Exploit", "Malware", "Advisory"].map((filter) => <button key={filter} onClick={() => setActiveFeed(filter)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition ${activeFeed === filter ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-200" : "border-white/10 text-slate-500 hover:text-slate-300"}`}>{filter}</button>)}</div><div className="flex flex-col">{filteredFeeds.filter((feed) => activeFeed === "All activity" || feed.kind.toLowerCase() === activeFeed.toLowerCase()).map((feed) => <div key={feed.title} className="flex items-start gap-3 border-t border-white/[0.06] py-4"><div className={`mt-0.5 rounded-md border px-2 py-1 text-[10px] font-semibold tracking-wider ${toneClass(feed.tone)}`}>{feed.kind}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-200">{feed.title}</p><p className="mt-1 text-xs text-slate-600">{feed.detail}</p></div><span className="whitespace-nowrap text-[11px] text-slate-600">{feed.time}</span></div>)}</div></CardContent></Card><Card className="border-white/[0.08] bg-slate-950/70"><CardHeader><CardTitle className="text-base text-white">Supply chain risk map</CardTitle><CardDescription className="text-slate-500">Package ecosystem exposure, normalized weekly.</CardDescription></CardHeader><CardContent><div className="flex flex-col gap-4">{heatmap.map((item) => <div key={item.name}><div className="mb-1.5 flex items-center justify-between text-xs"><span className="font-medium text-slate-300">{item.name}</span><span className="text-slate-600">{item.packages} packages</span></div><div className="flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5"><div className={`h-full rounded-full ${item.score > 75 ? "bg-red-400" : item.score > 50 ? "bg-orange-300" : "bg-cyan-300"}`} style={{ width: `${item.score}%` }} /></div><span className="w-16 text-right text-[11px] text-slate-500">{item.risk}</span></div></div>)}</div><Link href="/taxonomy-explorer" className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs text-cyan-200/80 hover:text-cyan-100">Open supply chain explorer <ArrowUpRight className="size-4" /></Link></CardContent></Card></section>

        <section className="mt-12 grid gap-4 md:grid-cols-3"><Card className="border-blue-300/15 bg-gradient-to-br from-blue-500/10 to-slate-950"><CardContent className="flex gap-4 p-6"><Sparkles className="size-6 shrink-0 text-cyan-300" /><div><h3 className="font-medium text-white">AI security analyst</h3><p className="mt-1 text-sm leading-6 text-slate-500">Ask for a CVE summary, attack path, or detection rule grounded in our intelligence graph.</p><Button asChild variant="link" className="mt-2 h-auto p-0 text-cyan-200"><Link href="/analyst">Open analyst <ArrowUpRight className="ml-1 size-3" /></Link></Button></div></CardContent></Card><Card className="border-white/[0.08] bg-slate-950/70"><CardContent className="flex gap-4 p-6"><ShieldCheck className="size-6 shrink-0 text-emerald-300" /><div><h3 className="font-medium text-white">Build better defenses</h3><p className="mt-1 text-sm leading-6 text-slate-500">Map safeguards to real attack vectors and prioritize the controls that close the biggest gaps.</p></div></CardContent></Card><Card className="border-white/[0.08] bg-slate-950/70"><CardContent className="flex gap-4 p-6"><LockKeyhole className="size-6 shrink-0 text-violet-300" /><div><h3 className="font-medium text-white">Train with context</h3><p className="mt-1 text-sm leading-6 text-slate-500">Turn incidents into hands-on learning paths for engineering and security teams.</p></div></CardContent></Card></section>
      </div>
    </div>
  )
}
